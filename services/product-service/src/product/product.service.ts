import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const {
      basicInfo,
      description,
      variants,
      pricing,
      media,
      attributes,
      suppliers,
      companyId: providedCompanyId,
    } = createProductDto;

    const companyId = providedCompanyId || 1;
    const sku = basicInfo.sku;

    if (sku) {
      const existing = await this.prisma.product.findUnique({
        where: { sku },
      });
      if (existing) {
        throw new ConflictException(`Product SKU ${sku} already exists`);
      }
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Find or create Category
      let categoryId = undefined;
      if (basicInfo.category) {
        let category = await tx.category.findFirst({
          where: { name: basicInfo.category, companyId },
        });
        if (!category) {
          category = await tx.category.create({
            data: { name: basicInfo.category, companyId },
          });
        }
        categoryId = category.id;
      }

      // 2. Find or create Brand
      let brandId = undefined;
      if (basicInfo.brand) {
        let brand = await tx.brand.findFirst({
          where: { name: basicInfo.brand, companyId },
        });
        if (!brand) {
          brand = await tx.brand.create({
            data: { name: basicInfo.brand, companyId },
          });
        }
        brandId = brand.id;
      }

      // 3. Create Product
      const product = await tx.product.create({
        data: {
          companyId,
          name: basicInfo.title,
          sku: basicInfo.sku,
          productIdentifierType: basicInfo.productIdentifierType,
          productIdentifierValue: basicInfo.productIdentifierValue,
          condition: basicInfo.condition || 'new',
          manufacturer: basicInfo.manufacturer,
          msrp: basicInfo.msrp ? Number(basicInfo.msrp) : undefined,
          purchasePrice: basicInfo.purchasePrice
            ? Number(basicInfo.purchasePrice)
            : pricing?.costPrice
              ? Number(pricing.costPrice)
              : undefined,
          retailPrice: basicInfo.retailPrice
            ? Number(basicInfo.retailPrice)
            : pricing?.sellingPrice
              ? Number(pricing.sellingPrice)
              : undefined,
          map: basicInfo.map ? Number(basicInfo.map) : undefined,
          dimensionLength: basicInfo.dimensionLength
            ? Number(basicInfo.dimensionLength)
            : undefined,
          dimensionWidth: basicInfo.dimensionWidth
            ? Number(basicInfo.dimensionWidth)
            : undefined,
          dimensionHeight: basicInfo.dimensionHeight
            ? Number(basicInfo.dimensionHeight)
            : undefined,
          dimensionUnit: basicInfo.dimensionUnit || 'inch',
          weightValue: basicInfo.weightValue
            ? Number(basicInfo.weightValue)
            : undefined,
          weightUnit: basicInfo.weightUnit || 'kg',
          manufacturedCountry: basicInfo.manufacturedCountry,
          manufacturedState: basicInfo.manufacturedState,
          manufacturedCity: basicInfo.manufacturedCity,
          manufacturedPostalCode: basicInfo.manufacturedPostalCode,
          shortDescription: description?.shortDescription,
          mainDescription: description?.mainDescription,
          features: description?.features as Prisma.InputJsonValue,
          categoryId,
          brandId,
          type:
            variants?.variantItems && variants.variantItems.length > 0
              ? 'VARIANT'
              : 'SIMPLE',
          images:
            media?.images && media.images.length > 0
              ? {
                  create: media.images.map((img) => ({
                    url: img.url,
                    order: img.order || 0,
                    isMain: img.order === 0,
                  })),
                }
              : undefined,
          variants:
            variants?.variantItems && variants.variantItems.length > 0
              ? {
                  create: variants.variantItems.map((v) => ({
                    sku: v.sku,
                    name: v.title,
                    costPrice: v.price ? Number(v.price) : 0,
                    sellingPrice: v.price ? Number(v.price) : 0,
                    attributes: {
                      create: v.attributes?.map((a) => ({
                        name: a.name,
                        value: a.value,
                      })),
                    },
                  })),
                }
              : undefined,
          attributes:
            attributes && attributes.length > 0
              ? {
                  create: attributes.map((attr) => ({
                    name: attr.name,
                    value: attr.value,
                  })),
                }
              : undefined,
        },
        include: {
          variants: {
            include: {
              attributes: true,
            },
          },
          images: true,
          category: true,
          brand: true,
          attributes: true,
          suppliers: {
            include: {
              supplier: true,
            },
          },
        },
      });

      // 4. Handle Suppliers
      if (suppliers && suppliers.length > 0) {
        for (const s of suppliers) {
          let supplier = await tx.supplier.findFirst({
            where: { name: s.name, companyId },
          });
          if (!supplier) {
            supplier = await tx.supplier.create({
              data: {
                name: s.name,
                code: s.code,
                companyId,
              },
            });
          }
          await tx.productSupplier.create({
            data: {
              productId: product.id,
              supplierId: supplier.id,
              purchasePrice: s.purchasePrice
                ? Number(s.purchasePrice)
                : undefined,
            },
          });
        }
      }

      return product;
    });
  }

  async findAll(companyId: number) {
    return this.prisma.product.findMany({
      where: { companyId: Number(companyId) },
      include: {
        variants: {
          include: {
            attributes: true,
          },
        },
        category: true,
        brand: true,
        images: true,
        attributes: true,
        suppliers: {
          include: {
            supplier: true,
          },
        },
      },
    });
  }

  async findOne(id: number, companyId: number) {
    const product = await this.prisma.product.findFirst({
      where: { id: Number(id), companyId: Number(companyId) },
      include: {
        variants: {
          include: {
            attributes: true,
          },
        },
        category: true,
        brand: true,
        images: true,
        attributes: true,
        suppliers: {
          include: {
            supplier: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async update(id: number, data: any) {
    const updateData = data as {
      basicInfo?: { title?: string; sku?: string };
      description?: { shortDescription?: string; mainDescription?: string };
    };
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: updateData.basicInfo?.title,
        sku: updateData.basicInfo?.sku,
        shortDescription: updateData.description?.shortDescription,
        mainDescription: updateData.description?.mainDescription,
      },
    });
  }

  async delete(id: number, companyId: number) {
    const product = await this.findOne(id, companyId);
    return this.prisma.product.delete({ where: { id: product.id } });
  }

  // Categories
  async createCategory(data: any) {
    const categoryData = data as {
      category_name?: string;
      name?: string;
      companyId?: number;
      status?: string;
    };
    return this.prisma.category.create({
      data: {
        name: categoryData.category_name || categoryData.name || '',
        companyId: categoryData.companyId || 1,
        status: categoryData.status || 'active',
      },
    });
  }

  async findAllCategories(companyId: number) {
    return this.prisma.category.findMany({
      where: { companyId: Number(companyId) },
    });
  }

  async findOneCategory(id: number) {
    return this.prisma.category.findUnique({ where: { id: Number(id) } });
  }

  async updateCategory(id: number, data: any) {
    return this.prisma.category.update({
      where: { id: Number(id) },
      data: data as Record<string, unknown>,
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id: Number(id) } });
  }

  // Brands
  async createBrand(data: any) {
    const brandData = data as {
      brand_name?: string;
      name?: string;
      companyId?: number;
      isActive?: boolean;
    };
    return this.prisma.brand.create({
      data: {
        name: brandData.brand_name || brandData.name || '',
        companyId: brandData.companyId || 1,
        isActive: brandData.isActive !== undefined ? brandData.isActive : true,
      },
    });
  }

  async findAllBrands(companyId: number) {
    return this.prisma.brand.findMany({
      where: { companyId: Number(companyId) },
    });
  }

  async findOneBrand(id: number) {
    return this.prisma.brand.findUnique({ where: { id: Number(id) } });
  }

  async updateBrand(id: number, data: any) {
    return this.prisma.brand.update({
      where: { id: Number(id) },
      data: data as Record<string, unknown>,
    });
  }

  async deleteBrand(id: number) {
    return this.prisma.brand.delete({ where: { id: Number(id) } });
  }

  // Suppliers
  async findAllSuppliers(companyId: number) {
    return this.prisma.supplier.findMany({
      where: { companyId: Number(companyId) },
    });
  }

  async createSupplier(data: any) {
    const supplierData = data as { companyId?: number } & Record<string, any>;
    return this.prisma.supplier.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        ...supplierData,
        companyId: supplierData.companyId || 1,
      } as any,
    });
  }

  // Attributes
  async findAllAttributes(companyId: number) {
    return this.prisma.globalAttribute.findMany({
      where: { companyId: Number(companyId) },
    });
  }

  async createAttribute(data: any) {
    const attributeData = data as { companyId?: number } & Record<string, any>;
    return this.prisma.globalAttribute.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        ...attributeData,
        companyId: attributeData.companyId || 1,
      } as any,
    });
  }
}
