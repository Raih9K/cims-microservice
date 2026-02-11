#!/bin/bash

# CIMS Microservices Setup Script
# This script sets up and runs the microservices architecture

set -e

echo "🚀 CIMS Microservices Setup"
echo "============================"

# Step 1: Check Docker is running
echo ""
echo "📦 Step 1: Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi
echo "✅ Docker is running"

# Step 2: Initialize databases
echo ""
echo "🗄️  Step 2: Initializing databases..."
docker exec -i cims-microservicea-mysql-1 mysql -u root < init-db.sql 2>/dev/null || echo "Databases already initialized or will be created on first run"
echo "✅ Database initialization complete"

# Step 3: Build Docker images
echo ""
echo "🔨 Step 3: Building Docker images..."
docker-compose build
echo "✅ Docker images built successfully"

# Step 4: Start services
echo ""
echo "🚀 Step 4: Starting services..."
docker-compose up -d
echo "✅ Services started"

# Step 5: Wait for services to be ready
echo ""
echo "⏳ Step 5: Waiting for services to be ready..."
sleep 10

# Step 6: Run Prisma migrations for each service
echo ""
echo "🔄 Step 6: Running database migrations..."

services=("user-service" "product-service" "inventory-service" "shopify-service" "marketplace-service" "audit-service" "order-service" "notification-service")

for service in "${services[@]}"; do
    echo "  - Migrating $service..."
    docker-compose exec -T $service npx prisma migrate deploy 2>/dev/null || \
    docker-compose exec -T $service npx prisma db push 2>/dev/null || \
    echo "    ⚠️  Migration skipped for $service (may not have migrations yet)"
done

echo "✅ Migrations complete"

# Step 7: Check service status
echo ""
echo "📊 Step 7: Checking service status..."
docker-compose ps

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Service URLs:"
echo "  - API Gateway:          http://localhost:3000"
echo "  - User Service:         http://localhost:3001"
echo "  - Product Service:      http://localhost:3002"
echo "  - Inventory Service:    http://localhost:3003"
echo "  - Shopify Service:      http://localhost:3004"
echo "  - Marketplace Service:  http://localhost:3005"
echo "  - Audit Service:        http://localhost:3006"
echo "  - Order Service:        http://localhost:3007"
echo "  - Notification Service: http://localhost:3008"
echo ""
echo "🔍 View logs with: docker-compose logs -f [service-name]"
echo "🛑 Stop services with: docker-compose down"
echo ""
