# CIMS Microservices - Docker Setup Guide

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git Bash or WSL (for Windows)

### Setup Steps

1. **Initialize and start all services:**
   ```bash
   bash setup.sh
   ```

   Or manually:
   ```bash
   # Build images
   docker-compose build

   # Start services
   docker-compose up -d
   ```

2. **Run database migrations:**
   ```bash
   # For each service, run:
   docker-compose exec user-service npx prisma db push
   docker-compose exec product-service npx prisma db push
   docker-compose exec inventory-service npx prisma db push
   docker-compose exec shopify-service npx prisma db push
   docker-compose exec marketplace-service npx prisma db push
   docker-compose exec audit-service npx prisma db push
   docker-compose exec order-service npx prisma db push
   docker-compose exec notification-service npx prisma db push
   ```

3. **Run data migration (from Laravel monolith):**
   ```bash
   cd scripts/migration
   node main.js
   ```

## 📊 Service Architecture

| Service | Port | Database | Purpose |
|---------|------|----------|---------|
| Gateway | 3000 | - | API Gateway & Routing |
| User Service | 3001 | cims_users | Authentication & User Management |
| Product Service | 3002 | cims_products | Product & Variant Management |
| Inventory Service | 3003 | cims_inventory | Stock & Warehouse Management |
| Shopify Service | 3004 | cims_shopify | Shopify Integration |
| Marketplace Service | 3005 | cims_marketplace | Channel & Listing Management |
| Audit Service | 3006 | cims_audit | Audit Logging |
| Order Service | 3007 | cims_orders | Order Management |
| Notification Service | 3008 | cims_notifications | Notifications & Alerts |

## 🔧 Common Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-service
docker-compose logs -f gateway
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart user-service
```

### Stop Services
```bash
docker-compose down
```

### Rebuild After Code Changes
```bash
# Rebuild specific service
docker-compose up -d --build user-service

# Rebuild all services
docker-compose up -d --build
```

### Access Service Shell
```bash
docker-compose exec user-service sh
```

### Database Access
```bash
# MySQL
docker exec -it cims-microservicea-mysql-1 mysql -u root

# Redis
docker exec -it cims-microservicea-redis-1 redis-cli
```

## 🗄️ Database Management

### View Databases
```bash
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"
```

### Access Specific Database
```bash
docker exec -it cims-microservicea-mysql-1 mysql -u root cims_users
```

### Run Prisma Studio
```bash
docker-compose exec user-service npx prisma studio
```

## 🔄 Development Workflow

The services are configured with **hot-reloading** enabled:
- Changes to source code will automatically restart the service
- No need to rebuild containers for code changes
- `node_modules` are cached in Docker volumes for faster builds

### Making Changes
1. Edit code in `services/[service-name]/src/`
2. Service will automatically restart
3. Check logs: `docker-compose logs -f [service-name]`

## 🧪 Testing API Endpoints

### Gateway (Port 3000)
```bash
curl http://localhost:3000
```

### User Service (via Gateway)
```bash
# Health check
curl http://localhost:3000/api/users

# Direct access
curl http://localhost:3001
```

### Product Service (via Gateway)
```bash
curl http://localhost:3000/api/products
```

## 🐛 Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Remove containers and volumes, start fresh
docker-compose down -v
docker-compose up -d --build
```

### Database connection issues
```bash
# Verify MySQL is running
docker ps | grep mysql

# Check database exists
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"

# Recreate databases
docker exec -i cims-microservicea-mysql-1 mysql -u root < init-db.sql
```

### Port already in use
```bash
# Find what's using the port
netstat -ano | findstr :3000

# Change port in docker-compose.yml
# Example: "3100:3000" instead of "3000:3000"
```

### Prisma issues
```bash
# Regenerate Prisma client
docker-compose exec user-service npx prisma generate

# Reset database
docker-compose exec user-service npx prisma migrate reset
```

## 📦 Volume Management

### List volumes
```bash
docker volume ls
```

### Remove all volumes (⚠️ deletes all data)
```bash
docker-compose down -v
```

### Backup MySQL data
```bash
docker exec cims-microservicea-mysql-1 mysqldump -u root --all-databases > backup.sql
```

## 🔐 Environment Variables

Each service uses environment variables defined in `docker-compose.yml`:
- `PORT` - Service port
- `DATABASE_URL` - Database connection string
- `NODE_ENV` - Environment (development/production)

To add custom variables, edit `docker-compose.yml` under the service's `environment` section.

## 🌐 Frontend Integration

Update frontend `.env` to point to the gateway:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

All API requests should go through the gateway which routes to appropriate microservices.

## 📝 Notes

- **Development Mode**: Services run with `npm run start:dev` for hot-reloading
- **Production Mode**: Change `target: production` in docker-compose.yml
- **Database Persistence**: MySQL data persists in `mysql_data` volume
- **Network**: All services communicate via Docker's internal network
