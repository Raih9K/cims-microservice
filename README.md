# CIMS - Complete Inventory Management System

## 🏗️ Architecture Overview

This is a **microservices-based** inventory management system with:

- **Frontend**: Next.js (React) - Port 3100
- **API Gateway**: NestJS - Port 3000
- **8 Microservices**: User, Product, Inventory, Shopify, Marketplace, Audit, Order, Notification
- **Databases**:
  - **Real DB**: MySQL (per service) - Port 3306
  - **Mock DB**: JSON Static File (`db.json`) - Port 4000
- **Migration**: From Laravel monolith to microservices

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Start everything (backend + frontend)
bash start.sh

# Stop everything
bash stop.sh
```

### Option 2: Manual Setup

#### Backend (Microservices)

```bash
# Build and start all microservices
docker-compose up -d --build

# Run database migrations
docker-compose exec user-service npx prisma db push
docker-compose exec product-service npx prisma db push
docker-compose exec inventory-service npx prisma db push
docker-compose exec shopify-service npx prisma db push
docker-compose exec marketplace-service npx prisma db push
docker-compose exec audit-service npx prisma db push
docker-compose exec order-service npx prisma db push
docker-compose exec notification-service npx prisma db push
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📊 Service Ports

| Service              | Port | Description               |
| -------------------- | ---- | ------------------------- |
| **Frontend**         | 3100 | Next.js Application       |
| **Gateway**          | 3000 | API Gateway (Entry Point) |
| User Service         | 3001 | Authentication & Users    |
| Product Service      | 3002 | Products & Variants       |
| Inventory Service    | 3003 | Stock & Warehouses        |
| Shopify Service      | 3004 | Shopify Integration       |
| Marketplace Service  | 3005 | Channels & Listings       |
| Audit Service        | 3006 | Audit Logs                |
| Order Service        | 3007 | Order Management          |
| Notification Service | 3008 | Notifications             |
| MySQL                | 3306 | Database                  |
| Redis                | 6379 | Cache                     |

## 🌐 Access URLs

- **Frontend**: http://localhost:3100
- **API Gateway**: http://localhost:3000
- **API Docs**: http://localhost:3000/api

## 🗄️ Database Structure

Each microservice has its own database:

- `cims_users` - User, Company, Membership, Roles, Permissions
- `cims_products` - Product, Variant, Category, Brand
- `cims_inventory` - StockLevel, Warehouse
- `cims_shopify` - Shopify integration data
- `cims_marketplace` - Channel, Listing
- `cims_audit` - Audit logs
- `cims_orders` - Orders
- `cims_notifications` - Notifications

## 🛠️ Dual Database Mode

You can now switch between a real MySQL database and a static JSON mock database.

### 1. Real Database (Default)

The system uses individual MySQL databases for each microservice.

- **Access**: Port 3306
- **Config**: `USE_MOCK_DB=false` in `docker-compose.yml`

### 2. JSON Mock Database

Useful for rapid UI development or demoing without backend logic.

- **File**: `db.json` (root)
- **Service**: `mock-db` (json-server)
- **Access**: http://localhost:4000
- **To Enable**:
  1. Open `docker-compose.yml`
  2. Set `USE_MOCK_DB=true` for the `gateway` service
  3. Run `docker-compose up -d gateway`

## 🔄 Data Migration

To migrate data from Laravel monolith:

```bash
cd scripts/migration

# Configure database credentials
cp .env.example .env
# Edit .env with your database details

# Run migration
node main.js
```

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions.

## 🛠️ Development

### Hot Reloading

Both frontend and backend support hot-reloading:

- **Frontend**: Changes auto-refresh
- **Backend**: Services auto-restart on code changes

### Making Changes

1. Edit code in `services/[service-name]/src/` or `frontend/src/`
2. Changes are automatically detected
3. Service/app restarts automatically
4. Check logs for errors

### View Logs

```bash
# All backend services
docker-compose logs -f

# Specific service
docker-compose logs -f user-service

# Frontend
tail -f frontend.log
```

## 🧪 Testing

### API Testing

```bash
# Test gateway
curl http://localhost:3000

# Test user service (via gateway)
curl http://localhost:3000/api/users

# Test product service (via gateway)
curl http://localhost:3000/api/products
```

### Frontend Testing

```bash
cd frontend
npm run test
```

## 📚 Documentation

- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Complete Docker setup guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Data migration guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick command reference
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API endpoints

## 🔧 Common Tasks

### Restart a Service

```bash
docker-compose restart user-service
```

### Rebuild a Service

```bash
docker-compose up -d --build user-service
```

### Access Database

```bash
# MySQL
docker exec -it cims-microservicea-mysql-1 mysql -u root

# Specific database
docker exec -it cims-microservicea-mysql-1 mysql -u root cims_users
```

### Access Service Shell

```bash
docker-compose exec user-service sh
```

### Clean Restart

```bash
# Stop and remove everything
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

## 🐛 Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check Docker is running
docker ps
```

### Port conflicts

Edit `docker-compose.yml` and change port mappings:

```yaml
ports:
  - "3100:3000" # External:Internal
```

### Database connection issues

```bash
# Verify databases exist
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"

# Recreate databases
docker exec -i cims-microservicea-mysql-1 mysql -u root < init-db.sql
```

### Frontend not connecting to backend

1. Check `.env` file: `NEXT_PUBLIC_API_URL=http://localhost:3000`
2. Verify gateway is running: `curl http://localhost:3000`
3. Check CORS settings in gateway

## 🔐 Environment Variables

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### Backend (docker-compose.yml)

Each service has:

- `PORT` - Service port
- `DATABASE_URL` - Database connection string
- `NODE_ENV` - Environment (development/production)

## 📦 Project Structure

```
cims-microservicea/
├── frontend/                 # Next.js frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── services/                 # Microservices
│   ├── gateway/             # API Gateway
│   ├── user-service/        # User management
│   ├── product-service/     # Product management
│   ├── inventory-service/   # Inventory management
│   ├── shopify-service/     # Shopify integration
│   ├── marketplace-service/ # Marketplace management
│   ├── audit-service/       # Audit logging
│   ├── order-service/       # Order management
│   └── notification-service/# Notifications
├── scripts/
│   └── migration/           # Data migration scripts
├── docker-compose.yml       # Docker configuration
├── init-db.sql             # Database initialization
├── start.sh                # Start script
├── stop.sh                 # Stop script
└── README.md               # This file
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions:

1. Check documentation in `/docs`
2. Review troubleshooting section
3. Check service logs
4. Contact development team

## 🎯 Roadmap

- [ ] Complete API documentation
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Implement CI/CD pipeline
- [ ] Add monitoring (Prometheus/Grafana)
- [ ] Add logging (ELK Stack)
- [ ] Implement service mesh (Istio)
- [ ] Add API versioning
- [ ] Implement rate limiting
- [ ] Add authentication middleware

## ⚡ Performance Tips

1. Use Redis for caching
2. Implement database indexing
3. Use connection pooling
4. Enable gzip compression
5. Optimize Docker images
6. Use production builds for deployment

## 🔒 Security

1. Never commit `.env` files
2. Use environment variables for secrets
3. Implement JWT authentication
4. Enable HTTPS in production
5. Regular security audits
6. Keep dependencies updated

---

**Built with ❤️ by weMonks Team**
