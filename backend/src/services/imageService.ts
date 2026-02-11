import { Database } from '@/database/connection';
import { Image } from '@/types';
import { config } from '@/config';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export class ImageService {
  private db = Database.getInstance();

  async getAllImages(userId: number, filters: any, params: any) {
    const { page = 1, limit = 20, sortBy = 'position', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE i.owner_id = $1 AND i.deleted_at = CURRENT_TIMESTAMP';
    let queryParams: any[] = [userId];
    let paramIndex = 2;

    if (filters.stock_item_id) {
      whereClause += ` AND i.stock_item_id = $${paramIndex++}`;
      queryParams.push(filters.stock_item_id);
    }

    if (filters.listing_id) {
      whereClause += ` AND i.listing_id = $${paramIndex++}`;
      queryParams.push(filters.listing_id);
    }

    if (filters.kit_id) {
      whereClause += ` AND i.kit_id = $${paramIndex++}`;
      queryParams.push(filters.kit_id);
    }

    if (filters.is_active !== undefined) {
      whereClause += ` AND i.is_active = $${paramIndex++}`;
      queryParams.push(filters.is_active);
    }

    const countQuery = `
      SELECT COUNT(*) as total
      FROM images i
      ${whereClause}
    `;
    const countResult = await this.db.query(countQuery, queryParams);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT i.*
      FROM images i
      ${whereClause}
      ORDER BY i.${this.escapeIdentifier(sortBy)} ${sortOrder.toUpperCase()}
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    
    queryParams.push(limit, offset);
    const images = await this.db.query(query, queryParams);

    return {
      data: images,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async getImageById(imageId: number, userId: number): Promise<Image | null> {
    const query = `
      SELECT *
      FROM images
      WHERE image_id = $1 AND owner_id = $2 AND deleted_at = CURRENT_TIMESTAMP
    `;
    
    const result = await this.db.query(query, [imageId, userId]);
    return result.length > 0 ? result[0] : null;
  }

  async createImage(file: any, imageData: Partial<Image>, userId: number): Promise<Image> {
    const {
      alt_text = '',
      position = 1,
      is_main = false,
      stock_item_id,
      listing_id,
      kit_id
    } = imageData;

    const uploadDir = path.join(process.cwd(), config.upload.directory, 'images', userId.toString());
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);

    await fs.copyFile(file.path, filePath);
    await fs.unlink(file.path);

    const imageInfo = await sharp(filePath).metadata();
    const fileSize = (await fs.stat(filePath)).size;
    const fileBuffer = await fs.readFile(filePath);
    const sha256 = crypto.createHash('sha256').update(fileBuffer).digest();

    if (is_main) {
      const updateMainQuery = `
        UPDATE images 
        SET is_main = false 
        WHERE owner_id = $1 AND stock_item_id = $2
      `;
      if (stock_item_id) {
        await this.db.query(updateMainQuery, [userId, stock_item_id]);
      }
    }

    const imageId = await this.getNextImageId();

    const query = `
      INSERT INTO images (
        image_id, owner_id, filename, mime_type, alt_text, width, height, 
        file_size_bytes, sha256, image_url, position, stock_item_id, 
        listing_id, kit_id, is_active, is_main, created_at, updated_at, deleted_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      imageId,
      userId,
      fileName,
      file.mimetype,
      alt_text,
      imageInfo?.width || null,
      imageInfo?.height || null,
      fileSize,
      sha256,
      `/uploads/${relativePath.replace(/\\/g, '/')}`,
      position,
      stock_item_id || null,
      listing_id || null,
      kit_id || null,
      true,
      is_main
    ]);

    await this.updateUserStorageUsage(userId);

    return result[0];
  }

  async updateImage(imageId: number, imageData: Partial<Image>, userId: number): Promise<Image | null> {
    const existingImage = await this.getImageById(imageId, userId);
    if (!existingImage) {
      return null;
    }

    const { alt_text, position, is_main } = imageData;

    if (is_main !== undefined && is_main !== existingImage.is_main) {
      if (is_main && existingImage.stock_item_id) {
        const updateMainQuery = `
          UPDATE images 
          SET is_main = false 
          WHERE owner_id = $1 AND stock_item_id = $2 AND image_id != $3
        `;
        await this.db.query(updateMainQuery, [userId, existingImage.stock_item_id, imageId]);
      }
    }

    const query = `
      UPDATE images
      SET 
        alt_text = COALESCE($1, alt_text),
        position = COALESCE($2, position),
        is_main = COALESCE($3, is_main),
        updated_at = CURRENT_TIMESTAMP
      WHERE image_id = $4 AND owner_id = $5 AND deleted_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    
    const result = await this.db.query(query, [
      alt_text,
      position,
      is_main,
      imageId,
      userId
    ]);
    
    return result.length > 0 ? result[0] : null;
  }

  async deleteImage(imageId: number, userId: number): Promise<boolean> {
    const image = await this.getImageById(imageId, userId);
    if (!image) {
      return false;
    }

    try {
      const imagePath = path.join(process.cwd(), 'public', image.image_url);
      await fs.unlink(imagePath);
    } catch (error) {
      console.error('Failed to delete image file:', error);
    }

    const query = `
      UPDATE images 
      SET deleted_at = CURRENT_TIMESTAMP, is_active = false 
      WHERE image_id = $1 AND owner_id = $2
    `;
    const result = await this.db.query(query, [imageId, userId]);
    
    if (result.rowCount > 0) {
      await this.updateUserStorageUsage(userId);
    }
    
    return result.rowCount > 0;
  }

  async setMainImage(imageId: number, userId: number): Promise<Image | null> {
    const image = await this.getImageById(imageId, userId);
    if (!image) {
      return null;
    }

    await this.db.transaction(async (conn: any) => {
      if (image.stock_item_id) {
        await conn.query(
          'UPDATE images SET is_main = false WHERE owner_id = $1 AND stock_item_id = $2',
          [userId, image.stock_item_id]
        );
      }

      const updateQuery = `
        UPDATE images 
        SET is_main = true, updated_at = CURRENT_TIMESTAMP 
        WHERE image_id = $1 AND owner_id = $2
        RETURNING *
      `;
      
      return await conn.query(updateQuery, [imageId, userId]);
    });

    return await this.getImageById(imageId, userId);
  }

  async reorderImages(imageOrders: any[], userId: number): Promise<Image[]> {
    await this.db.transaction(async (conn: any) => {
      for (const item of imageOrders) {
        await conn.query(
          'UPDATE images SET position = $1 WHERE image_id = $2 AND owner_id = $3',
          [item.position, item.image_id, userId]
        );
      }
    });

    const imageIds = imageOrders.map(item => item.image_id);
    const placeholders = imageIds.map((_, index) => `$${index + 2}`).join(',');
    const query = `
      SELECT *
      FROM images
      WHERE image_id IN (${placeholders}) AND owner_id = $1
      ORDER BY position ASC
    `;
    
    return await this.db.query(query, [userId, ...imageIds]);
  }

  async getUserStorageUsage(userId: number): Promise<any> {
    const query = `
      SELECT 
        COUNT(*) as total_images,
        COALESCE(SUM(file_size_bytes), 0) as used_bytes
      FROM images
      WHERE owner_id = $1 AND is_active = true AND deleted_at = CURRENT_TIMESTAMP
    `;
    
    const result = await this.db.query(query, [userId]);
    
    const usedBytes = parseInt(result[0].used_bytes);
    const totalImages = parseInt(result[0].total_images);

    const planQuery = `
      SELECT ip.max_storage_mb, ip.max_images
      FROM img_users_plan iup
      JOIN img_plans ip ON iup.plan_id = ip.id
      WHERE iup.user_id = $1
    `;
    
    const planResult = await this.db.query(planQuery, [userId]);
    const plan = planResult[0] || { max_storage_mb: 100, max_images: 100 };

    return {
      used_bytes: usedBytes,
      used_mb: Math.round(usedBytes / (1024 * 1024) * 100) / 100,
      total_images: totalImages,
      max_storage_mb: plan.max_storage_mb,
      max_images: plan.max_images,
      storage_percentage: Math.round((usedBytes / (plan.max_storage_mb * 1024 * 1024)) * 100),
      images_percentage: Math.round((totalImages / plan.max_images) * 100),
    };
  }

  private async updateUserStorageUsage(userId: number): Promise<void> {
    const query = `
      SELECT COALESCE(SUM(file_size_bytes), 0) as used_bytes
      FROM images
      WHERE owner_id = $1 AND is_active = true AND deleted_at = CURRENT_TIMESTAMP
    `;
    
    const result = await this.db.query(query, [userId]);
    const usedBytes = parseInt(result[0].used_bytes);

    const updateQuery = `
      INSERT INTO user_storage_usage (user_id, used_bytes, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id)
      DO UPDATE SET used_bytes = $2, updated_at = CURRENT_TIMESTAMP
    `;
    
    await this.db.query(updateQuery, [userId, usedBytes]);
  }

  private async getNextImageId(): Promise<number> {
    const query = `
      SELECT COALESCE(MAX(image_id), 0) + 1 as next_id
      FROM images
    `;
    
    const result = await this.db.query(query);
    return parseInt(result[0].next_id);
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_]/g, '');
  }
}