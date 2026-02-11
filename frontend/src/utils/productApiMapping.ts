import { ProductFormData } from '@/context/ProductFormContext';
import { StockItem } from '@/types';

export function mapFormDataToStockItem(formData: ProductFormData): Omit<StockItem, 'stock_item_id' | 'belongs_to' | 'created_at' | 'updated_at' | 'deleted_at' | 'is_deleted'> {
  return {
    sku: formData.basicInfo.sku,
    title: formData.basicInfo.title,
    short_description: formData.description.shortDescription || undefined,
    description: formData.description.mainDescription || undefined,
    barcode: formData.basicInfo.productIdentifierValue || undefined,
    stock_type: formData.variants.hasVariation ? 'parent' : 'basic',
    item_type: 'physical', // Default to physical, can be made configurable
    condition: formData.basicInfo.condition as StockItem['condition'] || 'new',
    parent_item_id: undefined, // Will be set for variants
    brand_id: undefined, // Will need brand lookup/conversion
    manufacturer_name: formData.basicInfo.manufacturer || undefined,
    manufacturer_country_code: formData.basicInfo.manufacturedCountry || undefined,
    manufacturer_state: formData.basicInfo.manufacturedState || undefined,
    manufacturer_postal_code: formData.basicInfo.manufacturedPostalCode || undefined,
    status: 'draft' // Default to draft status
  };
}

export function mapFormDataToPricing(formData: ProductFormData) {
  return {
    cost_price: formData.pricing.costPrice ? parseFloat(formData.pricing.costPrice) : undefined,
    selling_price: formData.pricing.sellingPrice ? parseFloat(formData.pricing.sellingPrice) : undefined,
    msrp: formData.basicInfo.msrp ? parseFloat(formData.basicInfo.msrp) : undefined,
    retail_price: formData.basicInfo.retailPrice ? parseFloat(formData.basicInfo.retailPrice) : undefined,
    map_price: formData.basicInfo.map ? parseFloat(formData.basicInfo.map) : undefined,
    discount_type: formData.pricing.discountType as 'percentage' | 'fixed' | 'none' || 'none',
    discount_value: formData.pricing.discountValue ? parseFloat(formData.pricing.discountValue) : 0,
    tax_class: formData.pricing.taxClass || 'standard'
  };
}

export function mapFormDataToDimensions(formData: ProductFormData) {
  return {
    length: formData.basicInfo.dimensionLength ? parseFloat(formData.basicInfo.dimensionLength) : undefined,
    width: formData.basicInfo.dimensionWidth ? parseFloat(formData.basicInfo.dimensionWidth) : undefined,
    height: formData.basicInfo.dimensionHeight ? parseFloat(formData.basicInfo.dimensionHeight) : undefined,
    weight: formData.basicInfo.weightValue ? parseFloat(formData.basicInfo.weightValue) : undefined,
    weight_unit: formData.basicInfo.weightUnit || 'kg',
    dimension_unit: formData.basicInfo.dimensionUnit || 'inch',
    manufactured_city: formData.basicInfo.manufacturedCity || undefined,
    manufactured_state: formData.basicInfo.manufacturedState || undefined,
    manufactured_country_code: formData.basicInfo.manufacturedCountry || undefined,
    manufactured_postal_code: formData.basicInfo.manufacturedPostalCode || undefined
  };
}

export function mapVariantFormData(variant: ProductFormData['variants']['variantItems'][0], parentId: string): Omit<StockItem, 'stock_item_id' | 'belongs_to' | 'created_at' | 'updated_at' | 'deleted_at' | 'is_deleted'> {
  return {
    sku: variant.sku,
    title: variant.title,
    short_description: undefined,
    description: undefined,
    barcode: variant.barcode || undefined,
    stock_type: 'variant',
    item_type: 'physical',
    condition: 'new',
    parent_item_id: parentId,
    brand_id: undefined,
    manufacturer_name: undefined,
    manufacturer_country_code: undefined,
    manufacturer_state: undefined,
    manufacturer_postal_code: undefined,
    status: 'draft'
  };
}

export function mapFormAttributesToVariantAttributes(formData: ProductFormData, stockItemId: string): Array<{
  attribute_name: string;
  attribute_value: string;
  display_order: number;
}> {
  const attributes: Array<{ attribute_name: string; attribute_value: string; display_order: number }> = [];
  
  // Add variant themes as attributes
  formData.variants.themes.forEach((theme, themeIndex) => {
    formData.variants.variantItems.forEach((variant, variantIndex) => {
      const attributeName = theme.name;
      const attributeValue = variant.combination[theme.name] || '';
      attributes.push({
        attribute_name: attributeName,
        attribute_value: attributeValue,
        display_order: themeIndex * 100 + variantIndex
      });
    });
  });

  // Add custom attributes
  formData.attributes.forEach((attr, index) => {
    attributes.push({
      attribute_name: attr.name,
      attribute_value: attr.value,
      display_order: 1000 + index
    });
  });

  return attributes;
}

export function mapFormDataToStockLevels(formData: ProductFormData, stockItemId: string): Array<{
  stock_item_id: string;
  warehouse_id: string;
  available_quantity: number;
  minimum_level: number;
}> {
  return formData.inventory.stocks.map(stock => ({
    stock_item_id: stockItemId,
    warehouse_id: stock.warehouse, // Will need warehouse lookup/conversion
    available_quantity: stock.available,
    minimum_level: 0 // Default, can be made configurable
  }));
}

export function mapFormDataToImages(formData: ProductFormData, stockItemId: string): Array<{
  stock_item_id?: string;
  filename: string;
  mime_type: string;
  alt_text: string;
  width?: number;
  height?: number;
  file_size_bytes: number;
  image_url: string;
  position: number;
  is_main: boolean;
  is_active: boolean;
}> {
  return formData.media.images.map((image, index) => ({
    stock_item_id: stockItemId,
    filename: image.url.split('/').pop() || `image_${index}`,
    mime_type: 'image/jpeg', // Default, should be detected
    alt_text: `${formData.basicInfo.title} - Image ${index + 1}`,
    width: undefined, // Will be determined during upload
    height: undefined, // Will be determined during upload
    file_size_bytes: 0, // Will be determined during upload
    image_url: image.url,
    position: image.order,
    is_main: index === 0, // First image is main
    is_active: true
  }));
}