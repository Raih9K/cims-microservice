import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { variants, ...productData } = createProductDto;

    // Check SKU uniqueness for product (if simple)
    if (productData.sku) {
      const existing = await this.prisma.product.findUnique({
        where: { sku: productData.sku },
      });
      if (existing)
        throw new ConflictException(
          `Product SKU ${productData.sku} already exists`,
        );
    }

    // Check SKU uniqueness for variants
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const existing = await this.prisma.variant.findUnique({
          where: { sku: variant.sku },
        });
        if (existing)
          throw new ConflictException(
            `Variant SKU ${variant.sku} already exists`,
          );
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          ...productData,
          variants: variants
            ? {
                create: variants.map((v) => ({
                  sku: v.sku,
                  name: v.name,
                  costPrice: v.costPrice,
                  sellingPrice: v.sellingPrice,
                  attributes: {
                    create: v.attributes?.map((a) => ({
                      name: a.name,
                      value: a.value,
                    })),
                  },
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
        },
      });

      return product;
    });
  }

  async findAll(companyId: number) {
    return this.prisma.product.findMany({
      where: { companyId },
      include: {
        variants: true,
        category: true,
        brand: true,
      },
    });
  }

  async findOne(id: number, companyId: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, companyId },
      include: {
        variants: {
          include: {
            attributes: true,
          },
        },
        category: true,
        brand: true,
      },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async delete(id: number, companyId: number) {
    const product = await this.findOne(id, companyId);
    return this.prisma.product.delete({ where: { id: product.id } });
  }
}
