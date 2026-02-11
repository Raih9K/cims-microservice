# CIMS Microservices - Quick Reference

## 🚀 Quick Start Commands

```bash
# Start everything
docker-compose up -d --build

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart user-service
```

## 📊 Service Ports

| Service      | Port | URL                   |
| ------------ | ---- | --------------------- |
| **Gateway**  | 3000 | http://localhost:3000 |
| User         | 3001 | http://localhost:3001 |
| Product      | 3002 | http://localhost:3002 |
| Inventory    | 3003 | http://localhost:3003 |
| Shopify      | 3004 | http://localhost:3004 |
| Marketplace  | 3005 | http://localhost:3005 |
| Audit        | 3006 | http://localhost:3006 |
| Order        | 3007 | http://localhost:3007 |
| Notification | 3008 | http://localhost:3008 |
| **MySQL**    | 3306 | -                     |
| **Redis**    | 6379 | -                     |

## 🗄️ Database Commands

```bash
# Access MySQL
docker exec -it cims-microservicea-mysql-1 mysql -u root

# Show databases
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"

# Access specific database
docker exec -it cims-microservicea-mysql-1 mysql -u root cims_users

# Run Prisma migrations
docker-compose exec user-service npx prisma db push
docker-compose exec product-service npx prisma db push
docker-compose exec inventory-service npx prisma db push
```

## 🔄 Migration Commands

```bash
# Initialize databases
docker exec -i cims-microservicea-mysql-1 mysql -u root < init-db.sql

# Run data migration
cd scripts/migration
node main.js
```

## 📝 Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Remove all stopped containers
docker container prune

# View images
docker images

# Remove unused images
docker image prune

# View volumes
docker volume ls

# Remove all volumes (⚠️ deletes data)
docker volume prune
```

## 🐛 Troubleshooting

```bash
# Service won't start - check logs
docker-compose logs [service-name]

# Database connection issues
docker exec cims-microservicea-mysql-1 mysql -u root -e "SHOW DATABASES;"

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build

# Check service health
docker-compose ps
```

## 🔍 API Testing

```bash
# Test gateway
curl http://localhost:3000

# Test user service (via gateway)
curl http://localhost:3000/api/users

# Test product service (via gateway)
curl http://localhost:3000/api/products

# Test direct service access
curl http://localhost:3001
```

## 📦 Development Workflow

1. **Make code changes** in `services/[service-name]/src/`
2. **Service auto-restarts** (hot-reload enabled)
3. **Check logs**: `docker-compose logs -f [service-name]`
4. **Test changes**: Use curl or Postman

## 🔐 Environment Variables

Edit `docker-compose.yml` to change:

- Service ports
- Database URLs
- Environment settings

## 📚 Documentation

- **Full Setup**: See `DOCKER_SETUP.md`
- **Migration**: See `MIGRATION_GUIDE.md`
- **API Docs**: See `API_DOCUMENTATION.md`

## ⚡ Pro Tips

- Use `docker-compose up -d` to run in background
- Use `docker-compose logs -f --tail=100 [service]` to see last 100 lines
- Use `docker-compose exec [service] sh` to access container shell
- Services communicate via Docker network (use service names, not localhost)
- Frontend should point to gateway (port 3000) not individual services
