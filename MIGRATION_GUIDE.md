# Data Migration Guide

## Overview

This guide explains how to migrate data from the Laravel monolith to the microservices architecture.

## Prerequisites

1. **Monolith Database** (Laravel) must be accessible
2. **Microservices** must be running with databases initialized
3. **Migration script dependencies** installed

## Migration Process

### Step 1: Ensure Microservices are Running

```bash
# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# Check databases exist
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"
```

You should see these databases:

- cims_users
- cims_products
- cims_inventory
- cims_shopify
- cims_marketplace
- cims_audit
- cims_orders
- cims_notifications

### Step 2: Run Prisma Migrations

Before migrating data, ensure all database schemas are created:

```bash
# User Service
docker-compose exec user-service npx prisma db push

# Product Service
docker-compose exec product-service npx prisma db push

# Inventory Service
docker-compose exec inventory-service npx prisma db push

# Shopify Service
docker-compose exec shopify-service npx prisma db push

# Marketplace Service
docker-compose exec marketplace-service npx prisma db push

# Audit Service
docker-compose exec audit-service npx prisma db push

# Order Service
docker-compose exec order-service npx prisma db push

# Notification Service
docker-compose exec notification-service npx prisma db push
```

### Step 3: Configure Migration Script

```bash
cd scripts/migration

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# Update MONOLITH_DATABASE with your Laravel database name
```

### Step 4: Run Migration

```bash
# From scripts/migration directory
node main.js
```

## Migration Mapping

### Users & Authentication

**Monolith → Microservice**

- `users` table → `User` model (cims_users)
- `companies` table → `Company` model (cims_users)
- `company_user` table → `Membership` model (cims_users)

### Products

**Monolith → Microservice**

- `products` table → `Product` model (cims_products)
- `product_variants` table → `Variant` model (cims_products)

### Inventory

**Monolith → Microservice**

- `warehouses` table → `Warehouse` model (cims_inventory)
- `stock_levels` table → `StockLevel` model (cims_inventory)

### Marketplace

**Monolith → Microservice**

- `channels` table → `Channel` model (cims_marketplace)
- `listings` table → `Listing` model (cims_marketplace)

## Verification

After migration, verify the data:

```bash
# Check user count
docker exec cims-microservicea-mysql-1 mysql -u root cims_users -e "SELECT COUNT(*) FROM User;"

# Check product count
docker exec cims-microservicea-mysql-1 mysql -u root cims_products -e "SELECT COUNT(*) FROM Product;"

# Check inventory count
docker exec cims-microservicea-mysql-1 mysql -u root cims_inventory -e "SELECT COUNT(*) FROM StockLevel;"

# Check marketplace count
docker exec cims-microservicea-mysql-1 mysql -u root cims_marketplace -e "SELECT COUNT(*) FROM Channel;"
```

## Troubleshooting

### Migration fails with connection error

- Verify monolith database is accessible
- Check credentials in `.env` file
- Ensure MySQL port 3306 is accessible

### Duplicate entry errors

The migration script uses `INSERT IGNORE` to skip duplicates. This is safe for re-running the migration.

### Foreign key constraint errors

Ensure:

1. Parent records exist before child records
2. Referenced IDs are valid
3. Migration runs in correct order (users → products → inventory → marketplace)

### Data type mismatches

The migration script handles common type conversions:

- Laravel timestamps → Prisma DateTime
- Laravel snake_case → Prisma camelCase
- Laravel nullable fields → Prisma optional fields

## Rollback

To rollback migration:

```bash
# Stop services
docker-compose down

# Remove volumes (⚠️ deletes all data)
docker-compose down -v

# Restart fresh
docker-compose up -d

# Re-run Prisma migrations
# (see Step 2 above)
```

## Incremental Migration

For production, consider incremental migration:

1. **Phase 1**: Migrate read-only data (users, products)
2. **Phase 2**: Migrate transactional data (orders, inventory)
3. **Phase 3**: Enable dual-write (write to both systems)
4. **Phase 4**: Switch reads to microservices
5. **Phase 5**: Decommission monolith

## Data Sync Strategy

For ongoing sync during transition:

1. **Dual Write**: Write to both monolith and microservices
2. **Event Sourcing**: Use events to sync changes
3. **CDC (Change Data Capture)**: Use tools like Debezium
4. **Scheduled Sync**: Run migration script periodically

## Notes

- Migration is **idempotent** - safe to run multiple times
- Uses `INSERT IGNORE` to prevent duplicates
- Maintains original IDs where possible
- Logs all operations for audit trail
- Handles missing/null values gracefully

## Support

For issues or questions:

1. Check logs in `scripts/migration/`
2. Verify database schemas match Prisma models
3. Review migration script logic in `main.js`
4. Test with small dataset first
