// ============================================
// 🎯 MOCK DATA - Complete System Coverage
// ============================================
// Toggle: Set NEXT_PUBLIC_USE_MOCK_DATA=true in .env to use mock data
// This allows frontend development without backend dependency

// ============================================
// 📦 PRODUCTS
// ============================================
export const MOCK_PRODUCTS = [
  {
    stock_item_id: '1',
    title: 'Modern Ergonomic Office Chair',
    sku: 'FUR-CH-001',
    short_description: 'Premium ergonomic chair with lumbar support',
    stock_type: 'basic',
    condition: 'new',
    category: 'Furniture',
    total_quantity: 45,
    warehouse: 'Dhaka Central Warehouse',
    bin: 'A-12-03',
    selling_price: 12500,
    cost_price: 8000,
    status: 'active',
    created_at: '2024-01-15T08:30:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=200',
  },
  {
    stock_item_id: '2',
    title: 'Wireless Mechanical Keyboard RGB',
    sku: 'ACC-KB-202',
    short_description: 'Cherry MX switches with customizable RGB',
    stock_type: 'basic',
    condition: 'new',
    category: 'Accessories',
    total_quantity: 12,
    warehouse: 'Chittagong Port Hub',
    bin: 'B-08-15',
    selling_price: 8500,
    cost_price: 5200,
    status: 'active',
    created_at: '2024-02-10T10:15:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200',
  },
  {
    stock_item_id: '3',
    title: 'UltraWide Curved Gaming Monitor 34"',
    sku: 'ELEC-MON-05',
    short_description: '3440x1440 144Hz curved display',
    stock_type: 'basic',
    condition: 'new',
    category: 'Electronics',
    total_quantity: 0,
    warehouse: 'Dhaka Central Warehouse',
    bin: 'C-05-22',
    selling_price: 45000,
    cost_price: 32000,
    status: 'out_of_stock',
    created_at: '2024-01-20T14:45:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200',
  },
  {
    stock_item_id: '4',
    title: 'Studio Condenser Microphone Pro',
    sku: 'AUD-MIC-10',
    short_description: 'Professional USB condenser microphone',
    stock_type: 'basic',
    condition: 'new',
    category: 'Audio',
    total_quantity: 8,
    warehouse: 'Sylhet Regional Store',
    bin: 'D-03-08',
    selling_price: 15000,
    cost_price: 10500,
    status: 'draft',
    created_at: '2024-03-05T09:20:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
  },
  {
    stock_item_id: '5',
    title: 'Smart LED Desk Lamp with Wireless Charging',
    sku: 'LIT-LP-02',
    short_description: 'Adjustable brightness with phone charging pad',
    stock_type: 'basic',
    condition: 'new',
    category: 'Lighting',
    total_quantity: 100,
    warehouse: 'Dhaka Central Warehouse',
    bin: 'A-15-10',
    selling_price: 3200,
    cost_price: 1800,
    status: 'active',
    created_at: '2024-02-28T11:30:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=200',
  },
  {
    stock_item_id: '6',
    title: 'Noise Cancelling Headphones Premium',
    sku: 'AUD-HP-15',
    short_description: 'Active noise cancellation with 40hr battery',
    stock_type: 'basic',
    condition: 'new',
    category: 'Audio',
    total_quantity: 28,
    warehouse: 'Dhaka Central Warehouse',
    bin: 'B-20-05',
    selling_price: 22000,
    cost_price: 15000,
    status: 'active',
    created_at: '2024-01-12T16:00:00Z',
    updated_at: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200',
  },
];

// ============================================
// 👤 AUTHENTICATION & USER
// ============================================
export const MOCK_USER = {
  id: 1,
  name: 'Raihan Khan',
  email: 'raihan@cims.com',
  company_id: 1,
  status: 'active' as const,
  roles: ['owner'],
  permissions: ['all'],
  company: {
    id: 1,
    name: 'CIMS Demo Company',
    business_type: 'E-commerce',
    management_type: 'Inventory Management',
    subscription_status: 'active' as const,
    package_id: 2,
    package: {
      id: 2,
      name: 'Professional Plan',
      price: '99.00',
    },
    max_seats: 10,
  },
};

export const MOCK_AUTH_RESPONSE = {
  user: MOCK_USER,
  access_token: 'mock_token_' + Date.now(),
  token_type: 'Bearer',
};

// ============================================
// 🏭 WAREHOUSES
// ============================================
export const MOCK_WAREHOUSES = [
  {
    id: 1,
    warehouse_id: 'WH-001',
    name: 'Dhaka Central Warehouse',
    code: 'DHK-01',
    location: 'Uttara, Dhaka-1230',
    address: 'House #12, Road #5, Sector 7, Uttara',
    contact_person: 'Karim Ahmed',
    phone: '+8801712345678',
    email: 'dhaka@warehouse.com',
    capacity: 5000,
    current_stock: 3200,
    status: 'active',
    created_at: '2023-06-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    warehouse_id: 'WH-002',
    name: 'Chittagong Port Hub',
    code: 'CTG-02',
    location: 'Agrabad, Chittagong-4100',
    address: 'Plot 45, Port Access Road, Agrabad',
    contact_person: 'Rahim Hossain',
    phone: '+8801823456789',
    email: 'ctg@warehouse.com',
    capacity: 8000,
    current_stock: 4500,
    status: 'active',
    created_at: '2023-07-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    warehouse_id: 'WH-003',
    name: 'Sylhet Regional Store',
    code: 'SYL-03',
    location: 'Zindabazar, Sylhet-3100',
    address: 'Building 8, Zindabazar Main Road',
    contact_person: 'Fatima Khan',
    phone: '+8801934567890',
    email: 'sylhet@warehouse.com',
    capacity: 2000,
    current_stock: 800,
    status: 'active',
    created_at: '2023-09-20T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 🤝 SUPPLIERS
// ============================================
export const MOCK_SUPPLIERS = [
  {
    id: 1,
    supplier_id: 'SUP-001',
    name: 'TechWorld Distribution Ltd.',
    contact_person: 'John Doe',
    email: 'john@techworld.com',
    phone: '+8801700000000',
    address: 'Plot 12, Tejgaon I/A, Dhaka',
    company_registration: 'REG-TWD-2020-1234',
    payment_terms: 'Net 30',
    currency: 'BDT',
    status: 'active',
    product_categories: ['Electronics', 'Accessories'],
    created_at: '2023-05-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    supplier_id: 'SUP-002',
    name: 'Global Furniture Co.',
    contact_person: 'Jane Smith',
    email: 'jane@globalfurn.com',
    phone: '+8801800000000',
    address: '25 Mirpur Road, Dhaka-1216',
    company_registration: 'REG-GFC-2019-5678',
    payment_terms: 'Net 45',
    currency: 'BDT',
    status: 'active',
    product_categories: ['Furniture'],
    created_at: '2023-04-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    supplier_id: 'SUP-003',
    name: 'Smart Home Solutions',
    contact_person: 'Ahmed Rahman',
    email: 'ahmed@smarthome.com',
    phone: '+8801911111111',
    address: 'House 88, Banani DOHS, Dhaka',
    company_registration: 'REG-SHS-2021-9012',
    payment_terms: 'Net 15',
    currency: 'BDT',
    status: 'active',
    product_categories: ['Lighting', 'Electronics'],
    created_at: '2023-08-22T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 📁 CATEGORIES
// ============================================
export const MOCK_CATEGORIES = [
  {
    id: 1,
    category_id: 'CAT-001',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    parent_id: null,
    product_count: 156,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    category_id: 'CAT-002',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Office and home furniture',
    parent_id: null,
    product_count: 42,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    category_id: 'CAT-003',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Computer and tech accessories',
    parent_id: null,
    product_count: 89,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    category_id: 'CAT-004',
    name: 'Audio',
    slug: 'audio',
    description: 'Audio equipment and devices',
    parent_id: null,
    product_count: 24,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    category_id: 'CAT-005',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Lighting solutions and fixtures',
    parent_id: null,
    product_count: 18,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 🏷️ BRANDS
// ============================================
export const MOCK_BRANDS = [
  {
    id: 1,
    brand_id: 'BRN-001',
    name: 'TechPro',
    slug: 'techpro',
    description: 'Premium technology brand',
    logo_url: 'https://via.placeholder.com/150x50/4F46E5/FFFFFF?text=TechPro',
    website: 'https://techpro.example.com',
    product_count: 45,
    status: 'active',
    created_at: '2023-01-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    brand_id: 'BRN-002',
    name: 'ErgoMax',
    slug: 'ergomax',
    description: 'Ergonomic furniture solutions',
    logo_url: 'https://via.placeholder.com/150x50/10B981/FFFFFF?text=ErgoMax',
    website: 'https://ergomax.example.com',
    product_count: 28,
    status: 'active',
    created_at: '2023-02-20T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    brand_id: 'BRN-003',
    name: 'SoundWave',
    slug: 'soundwave',
    description: 'Professional audio equipment',
    logo_url: 'https://via.placeholder.com/150x50/EF4444/FFFFFF?text=SoundWave',
    website: 'https://soundwave.example.com',
    product_count: 19,
    status: 'active',
    created_at: '2023-03-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// ⚙️ ATTRIBUTES
// ============================================
export const MOCK_ATTRIBUTES = [
  {
    id: 1,
    attribute_id: 'ATTR-001',
    name: 'Color',
    slug: 'color',
    type: 'select',
    values: ['Black', 'White', 'Red', 'Blue', 'Gray', 'Silver'],
    is_variant: true,
    is_filterable: true,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    attribute_id: 'ATTR-002',
    name: 'Size',
    slug: 'size',
    type: 'select',
    values: ['Small', 'Medium', 'Large', 'XL'],
    is_variant: true,
    is_filterable: true,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    attribute_id: 'ATTR-003',
    name: 'Material',
    slug: 'material',
    type: 'select',
    values: ['Plastic', 'Metal', 'Wood', 'Fabric', 'Glass'],
    is_variant: false,
    is_filterable: true,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    attribute_id: 'ATTR-004',
    name: 'Warranty',
    slug: 'warranty',
    type: 'text',
    values: [],
    is_variant: false,
    is_filterable: false,
    status: 'active',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 👥 TEAM MEMBERS
// ============================================
export const MOCK_TEAM_MEMBERS = [
  {
    id: 1,
    user_id: 'USR-001',
    name: 'Raihan Khan',
    email: 'raihan@cims.com',
    role: 'owner',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'active',
    last_active: new Date().toISOString(),
    permissions: ['all'],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 'USR-002',
    name: 'Sarah Ahmed',
    email: 'sarah@cims.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=25',
    status: 'active',
    last_active: '2024-03-20T15:30:00Z',
    permissions: ['inventory', 'orders', 'suppliers'],
    created_at: '2023-02-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 'USR-003',
    name: 'John Doe',
    email: 'john@cims.com',
    role: 'editor',
    avatar: 'https://i.pravatar.cc/150?img=33',
    status: 'active',
    last_active: '2024-03-21T09:15:00Z',
    permissions: ['inventory', 'products'],
    created_at: '2023-03-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 'USR-004',
    name: 'Fatima Hassan',
    email: 'fatima@cims.com',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/150?img=45',
    status: 'pending',
    last_active: null,
    permissions: ['view'],
    created_at: '2024-03-18T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 🔔 NOTIFICATIONS
// ============================================
export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    notification_id: 'NOTIF-001',
    title: 'Low Stock Alert',
    message: 'UltraWide Curved Monitor is out of stock',
    type: 'warning',
    read: false,
    action_url: '/inventory',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 2,
    notification_id: 'NOTIF-002',
    title: 'New Order Received',
    message: 'Order #12345 has been placed',
    type: 'info',
    read: false,
    action_url: '/orders/12345',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: 3,
    notification_id: 'NOTIF-003',
    title: 'Team Member Added',
    message: 'Fatima Hassan has been invited to your team',
    type: 'success',
    read: true,
    action_url: '/account/team',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 4,
    notification_id: 'NOTIF-004',
    title: 'Shopify Sync Complete',
    message: '45 products synced successfully',
    type: 'success',
    read: true,
    action_url: '/marketplace',
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];

// ============================================
// 🛒 MARKETPLACE LISTINGS
// ============================================
export const MOCK_LISTINGS = [
  {
    id: 1,
    listing_id: 'LST-001',
    stock_item_id: '1',
    channel: 'shopify',
    channel_product_id: 'shopify_123456',
    title: 'Modern Ergonomic Office Chair',
    sku: 'FUR-CH-001',
    price: 12500,
    status: 'active',
    sync_status: 'synced',
    last_synced: new Date().toISOString(),
    created_at: '2024-01-20T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    listing_id: 'LST-002',
    stock_item_id: '2',
    channel: 'shopify',
    channel_product_id: 'shopify_789012',
    title: 'Wireless Mechanical Keyboard RGB',
    sku: 'ACC-KB-202',
    price: 8500,
    status: 'active',
    sync_status: 'synced',
    last_synced: new Date().toISOString(),
    created_at: '2024-02-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    listing_id: 'LST-003',
    stock_item_id: '6',
    channel: 'ebay',
    channel_product_id: 'ebay_345678',
    title: 'Noise Cancelling Headphones Premium',
    sku: 'AUD-HP-15',
    price: 22000,
    status: 'draft',
    sync_status: 'pending',
    last_synced: null,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 🔌 INTEGRATIONS
// ============================================
export const MOCK_INTEGRATIONS = [
  {
    id: 1,
    integration_id: 'INT-001',
    name: 'Shopify',
    type: 'ecommerce',
    status: 'connected',
    api_key: 'sk_test_••••••••••••1234',
    store_url: 'https://mystore.myshopify.com',
    last_sync: new Date().toISOString(),
    sync_frequency: 'hourly',
    products_synced: 45,
    created_at: '2023-08-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    integration_id: 'INT-002',
    name: 'eBay',
    type: 'marketplace',
    status: 'disconnected',
    api_key: null,
    store_url: null,
    last_sync: null,
    sync_frequency: null,
    products_synced: 0,
    created_at: null,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    integration_id: 'INT-003',
    name: 'Amazon',
    type: 'marketplace',
    status: 'pending',
    api_key: 'amz_••••••••••••5678',
    store_url: 'https://seller.amazon.com',
    last_sync: null,
    sync_frequency: 'daily',
    products_synced: 0,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 📄 TEMPLATES
// ============================================
export const MOCK_TEMPLATES = [
  {
    id: 1,
    template_id: 'TPL-001',
    name: 'Electronics Template',
    type: 'product',
    channel: 'shopify',
    fields: {
      title_format: '{{brand}} {{name}} - {{color}}',
      description_template: 'Premium {{category}} with {{features}}',
      tags: ['electronics', 'gadgets', 'tech'],
    },
    usage_count: 25,
    status: 'active',
    created_at: '2023-10-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    template_id: 'TPL-002',
    name: 'Furniture Template',
    type: 'product',
    channel: 'shopify',
    fields: {
      title_format: '{{name}} - {{material}}',
      description_template: 'High-quality {{category}} made from {{material}}',
      tags: ['furniture', 'home', 'office'],
    },
    usage_count: 12,
    status: 'active',
    created_at: '2023-11-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 📊 EXPORT HISTORY
// ============================================
export const MOCK_EXPORT_HISTORY = [
  {
    id: 1,
    export_id: 'EXP-001',
    type: 'products',
    format: 'csv',
    status: 'completed',
    file_url: '/downloads/products_export_2024_03_20.csv',
    records_count: 156,
    file_size: '2.4 MB',
    created_by: 'Raihan Khan',
    created_at: '2024-03-20T10:30:00Z',
    completed_at: '2024-03-20T10:31:15Z',
  },
  {
    id: 2,
    export_id: 'EXP-002',
    type: 'inventory',
    format: 'xlsx',
    status: 'completed',
    file_url: '/downloads/inventory_export_2024_03_15.xlsx',
    records_count: 234,
    file_size: '3.8 MB',
    created_by: 'Sarah Ahmed',
    created_at: '2024-03-15T14:20:00Z',
    completed_at: '2024-03-15T14:22:30Z',
  },
  {
    id: 3,
    export_id: 'EXP-003',
    type: 'orders',
    format: 'csv',
    status: 'failed',
    file_url: null,
    records_count: 0,
    file_size: null,
    created_by: 'John Doe',
    created_at: '2024-03-18T09:00:00Z',
    completed_at: null,
    error: 'Database connection timeout',
  },
];

// ============================================
// 📦 CHANNELS
// ============================================
export const MOCK_CHANNELS = [
  {
    id: 1,
    channel_id: 'CHN-001',
    name: 'Shopify Store',
    type: 'shopify',
    status: 'active',
    total_products: 45,
    total_orders: 128,
    sync_enabled: true,
    created_at: '2023-08-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    channel_id: 'CHN-002',
    name: 'eBay Listings',
    type: 'ebay',
    status: 'inactive',
    total_products: 0,
    total_orders: 0,
    sync_enabled: false,
    created_at: null,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    channel_id: 'CHN-003',
    name: 'Amazon FBA',
    type: 'amazon',
    status: 'pending',
    total_products: 0,
    total_orders: 0,
    sync_enabled: false,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// 🛠️ HELPER FUNCTIONS
// ============================================

/**
 * Simulates API delay for realistic testing
 */
export const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Filters array based on search query
 */
export const filterBySearch = <T extends Record<string, any>>(
  items: T[],
  searchQuery: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchQuery) return items;

  const query = searchQuery.toLowerCase();
  return items.filter((item) =>
    searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(query)
    )
  );
};

/**
 * Paginate array
 */
export const paginate = <T>(items: T[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
      hasNext: endIndex < items.length,
      hasPrev: page > 1,
    },
  };
};
