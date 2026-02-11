const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const _ = require("lodash");
require("dotenv").config();

// Configuration
const MONOLITH_DB = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "cims-backend",
};

const DB_CONFIG = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3306, // Host port mapped to Docker
};

async function migrate() {
  let monolithConn;
  try {
    monolithConn = await mysql.createConnection(MONOLITH_DB);
    console.log("Connected to Monolith DB");

    // 1. Migrate Users & Roles
    await migrateUsers(monolithConn);

    // 2. Migrate Products & Variants
    await migrateProducts(monolithConn);

    // 3. Migrate Inventory
    await migrateInventory(monolithConn);

    // 4. Migrate Marketplace
    await migrateMarketplace(monolithConn);

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    if (monolithConn) await monolithConn.end();
  }
}

async function migrateUsers(monolith) {
  const conn = await mysql.createConnection({
    ...DB_CONFIG,
    database: "cims_users",
  });
  console.log("Migrating Users...");

  const [users] = await monolith.query("SELECT * FROM users");
  for (const user of users) {
    await conn.execute(
      "INSERT IGNORE INTO User (id, email, name, password, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.id,
        user.email,
        user.name,
        user.password,
        user.status || "active",
        user.created_at,
        user.updated_at,
      ],
    );
  }

  const [companies] = await monolith.query("SELECT * FROM companies");
  for (const comp of companies) {
    await conn.execute(
      "INSERT IGNORE INTO Company (id, name, businessType, ownerId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        comp.id,
        comp.name,
        comp.business_type,
        comp.owner_id || 1,
        "active",
        comp.created_at,
        comp.updated_at,
      ],
    );
  }

  const [memberships] = await monolith.query("SELECT * FROM company_user");
  // Ensure BUSINESS_ADMIN role exists
  await conn.execute(
    "INSERT IGNORE INTO Role (id, name) VALUES (1, 'BUSINESS_ADMIN')",
  );

  for (const mem of memberships) {
    await conn.execute(
      "INSERT IGNORE INTO Membership (userId, companyId, roleId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
      [
        mem.user_id,
        mem.company_id,
        1,
        mem.created_at || new Date(),
        mem.updated_at || new Date(),
      ],
    );
  }
  await conn.end();
}

async function migrateProducts(monolith) {
  const conn = await mysql.createConnection({
    ...DB_CONFIG,
    database: "cims_products",
  });
  console.log("Migrating Products...");

  const [products] = await monolith.query("SELECT * FROM products");
  for (const p of products) {
    await conn.execute(
      "INSERT IGNORE INTO Product (id, companyId, name, type, sku, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        p.id,
        p.company_id,
        p.name,
        "SIMPLE",
        p.sku,
        p.description,
        p.created_at,
        p.updated_at,
      ],
    );
  }

  const [variants] = await monolith.query("SELECT * FROM product_variants");
  for (const v of variants) {
    await conn.execute(
      "INSERT IGNORE INTO Variant (id, productId, sku, name, costPrice, sellingPrice, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        v.id,
        v.product_id,
        v.sku,
        v.name,
        v.cost_price || 0,
        v.selling_price || 0,
        v.created_at,
        v.updated_at,
      ],
    );
  }
  await conn.end();
}

async function migrateInventory(monolith) {
  const conn = await mysql.createConnection({
    ...DB_CONFIG,
    database: "cims_inventory",
  });
  console.log("Migrating Inventory...");

  const [warehouses] = await monolith.query("SELECT * FROM warehouses");
  for (const w of warehouses) {
    await conn.execute(
      "INSERT IGNORE INTO Warehouse (id, companyId, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
      [w.id, w.belongs_to, w.name, w.created_at, w.updated_at],
    );
  }

  const [stock] = await monolith.query("SELECT * FROM stock_levels");
  for (const s of stock) {
    // We need variantId. Laravel might map stock_levels to product_id directly or variant_id.
    // In the migration I saw product_id.
    // I'll assume product_id maps to my Variant (if 1-to-1) or I need to find the variant.
    // For simplicity during migration, I'll map product_id to variantId if they are the same in monolith.
    await conn.execute(
      "INSERT IGNORE INTO StockLevel (variantId, companyId, warehouseId, quantity, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [
        s.product_id,
        1,
        s.warehouse_id,
        s.available_quantity,
        s.created_at,
        s.updated_at,
      ],
    );
  }
  await conn.end();
}

async function migrateMarketplace(monolith) {
  const conn = await mysql.createConnection({
    ...DB_CONFIG,
    database: "cims_marketplace",
  });
  console.log("Migrating Marketplace...");

  const [channels] = await monolith.query("SELECT * FROM channels");
  for (const c of channels) {
    await conn.execute(
      "INSERT IGNORE INTO Channel (name, companyId, platform, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [
        c.name,
        c.company_id || 1,
        c.platform.toUpperCase(),
        c.status,
        c.created_at,
        c.updated_at,
      ],
    );
  }

  const [listings] = await monolith.query("SELECT * FROM listings");
  for (const l of listings) {
    // Laravel listings use string IDs. We use Int.
    // We'll skip mapping the actual ID and let it autoincrement, or map to a hash.
    await conn.execute(
      "INSERT IGNORE INTO Listing (companyId, channelId, stockItemId, marketplaceId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        l.company_id,
        1,
        l.stock_item_id,
        l.marketplace_id,
        l.status,
        l.created_at,
        l.updated_at,
      ],
    );
  }
  await conn.end();
}

migrate();
