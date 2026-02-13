import { IInventoryRepository } from '../interfaces/IProductRepository';

export class ProductService {
  constructor(private repository: IInventoryRepository) {}

  // Products
  async createProduct(data: any) {
    const product = await this.repository.createProduct(data);
    return { success: true, status: 'success', data: this.mapProduct(product) };
  }
  private mapProduct(p: any) {
    const basicInfo = p.basicInfo || {};
    const inventory = p.inventory || {};
    const pricing = p.pricing || {};
    const meta = p.meta || {};
    const description = p.description || {};
    const media = p.media || {};
    const variants = p.variants || {};

    // Calculate stock levels for mapping
    const stockLevels =
      inventory.stocks?.map((s: any) => ({
        id: s.id || Math.random().toString(),
        warehouse: {
          name: s.warehouse || 'Default',
          is_default: s.isDefault || false,
        },
        available_quantity: s.available || 0,
        reserved_quantity: s.reserved || 0,
        sku: s.sku || p.sku || basicInfo.sku,
        bin_locations: s.binLocations || [],
        priority_order: s.priorityOrder || 0,
      })) ||
      p.stock_levels ||
      [];

    const totalQuantity = stockLevels.reduce(
      (sum: number, s: any) => sum + (s.available_quantity || 0),
      0,
    );

    // Prepare a clean description object for the form
    const descriptionObj =
      typeof p.description === 'string'
        ? {
            mainDescription: p.description,
            shortDescription: p.short_description || '',
            features: [],
          }
        : {
            mainDescription:
              p.description?.mainDescription || p.description?.content || '',
            shortDescription:
              p.description?.shortDescription || p.short_description || '',
            features: Array.isArray(p.description?.features)
              ? p.description.features
              : Array.isArray(p.features)
                ? p.features
                : [],
          };

    return {
      ...p,
      id: p.id || p.stock_item_id,
      stock_item_id: p.id || p.stock_item_id,
      company_id: meta.company_id || p.company_id || '',
      created_by: meta.created_by || p.created_by || '',
      updated_by: meta.updated_by || p.updated_by || '',
      created_by_name: meta.created_by_name || p.created_by_name || '',
      updated_by_name: meta.updated_by_name || p.updated_by_name || '',
      created_at: p.createdAt || p.created_at || meta.created_at || '',
      updated_at: p.updatedAt || p.updated_at || meta.updated_at || '',
      version: meta.version || p.version || 1,
      status: p.status || meta.status || 'active',
      is_published: meta.is_published || p.is_published || false,

      // Nested structures preserved/normalized for the form
      meta: { ...meta, status: p.status || meta.status || 'active' },
      basicInfo: {
        ...basicInfo,
        sku: basicInfo.sku || p.sku || '',
        title: basicInfo.title || p.title || p.name || '',
      },
      description: descriptionObj,
      inventory: {
        ...inventory,
        stocks:
          inventory.stocks ||
          stockLevels.map((sl: any) => ({
            id: sl.id,
            warehouse: sl.warehouse.name,
            sku: sl.sku,
            available: sl.available_quantity,
            reserved: sl.reserved_quantity,
            binLocations: sl.bin_locations,
            priorityOrder: sl.priority_order,
            isDefault: sl.warehouse.is_default,
          })),
      },
      pricing: {
        ...pricing,
        costPrice:
          pricing.costPrice || basicInfo.purchasePrice || p.cost_price || '',
        sellingPrice:
          pricing.sellingPrice ||
          basicInfo.retailPrice ||
          p.selling_price ||
          p.price ||
          '',
      },
      variants: {
        ...variants,
        variantItems:
          variants.variantItems ||
          (Array.isArray(p.variants) ? p.variants : []),
      },

      // Flat fields for Table/Compatibility
      sku: basicInfo.sku || p.sku || '',
      name: basicInfo.title || p.title || p.name || '',
      title: basicInfo.title || p.title || p.name || '',
      category: basicInfo.category || p.category || '',
      condition: basicInfo.condition || p.condition || 'new',
      brand: basicInfo.brand || p.brand || '',
      manufacturer_name: basicInfo.manufacturer || p.manufacturer_name || '',
      cost_price:
        pricing.costPrice || basicInfo.purchasePrice || p.cost_price || '',
      selling_price:
        pricing.sellingPrice ||
        basicInfo.retailPrice ||
        p.selling_price ||
        p.price ||
        '',
      msrp: basicInfo.msrp || p.msrp || '',
      map: basicInfo.map || p.map || '',
      total_quantity: totalQuantity,

      dimensions: {
        length: basicInfo.dimensionLength || p.dimensions?.length || '',
        width: basicInfo.dimensionWidth || p.dimensions?.width || '',
        height: basicInfo.dimensionHeight || p.dimensions?.height || '',
        dimension_unit:
          basicInfo.dimensionUnit || p.dimensions?.dimension_unit || 'inch',
        weight_unit: basicInfo.weightUnit || p.dimensions?.weight_unit || 'kg',
      },

      variant_list: Array.isArray(p.variants)
        ? p.variants
        : p.variants?.variantItems || [],
      stock_levels: stockLevels,
      images: Array.isArray(p.images)
        ? p.images
        : media.images?.map((img: any) =>
            typeof img === 'string' ? img : img.url,
          ) || [],
      thumbnail:
        p.media?.images?.[0]?.url ||
        p.media?.images?.[0] ||
        p.thumbnail ||
        (Array.isArray(p.images) ? p.images[0] : ''),
      video_url: media.videos?.[0]?.url || p.video_url || '',

      // Misc
      attributes: Array.isArray(p.attributes) ? p.attributes : [],
      marketplace: p.marketplace || { channels: [] },
      listingStatus: p.listingStatus || {
        active: [],
        drafts: [],
        notListed: [],
      },
      suppliers: Array.isArray(p.suppliers) ? p.suppliers : [],
    };
  }

  async getProducts(params?: any) {
    const rawProducts = await this.repository.getProducts(params);
    const mappedProducts = rawProducts.map((p: any) => this.mapProduct(p));
    return { success: true, status: 'success', data: mappedProducts };
  }
  async getProductById(id: string) {
    const product = await this.repository.getProductById(id);
    if (!product) return null;
    return { success: true, status: 'success', data: this.mapProduct(product) };
  }
  async updateProduct(id: string, data: any) {
    const product = await this.repository.updateProduct(id, data);
    if (!product) return null;
    return { success: true, status: 'success', data: this.mapProduct(product) };
  }
  async deleteProduct(id: string) {
    return await this.repository.deleteProduct(id);
  }

  // Warehouses
  async getWarehouses(companyId?: number) {
    const data = await this.repository.getWarehouses(companyId);
    return { success: true, status: 'success', data };
  }
  async createWarehouse(data: any) {
    return await this.repository.createWarehouse(data);
  }
  async updateWarehouse(id: string, data: any) {
    return await this.repository.updateWarehouse(id, data);
  }
  async deleteWarehouse(id: string) {
    return await this.repository.deleteWarehouse(id);
  }

  // Others
  async getCategories() {
    const data = await this.repository.getCategories();
    return { success: true, status: 'success', data };
  }
  async getBrands() {
    const data = await this.repository.getBrands();
    return { success: true, status: 'success', data };
  }
  async getSuppliers() {
    const data = await this.repository.getSuppliers();
    return { success: true, status: 'success', data };
  }
}
