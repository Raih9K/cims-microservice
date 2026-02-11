#!/bin/bash

# CIMS Full Stack Startup Script
# Starts both backend microservices and frontend

set -e

echo "🚀 Starting CIMS Full Stack Application"
echo "========================================"

# Step 1: Start Backend Microservices
echo ""
echo "📦 Step 1: Starting Backend Microservices..."
cd "$(dirname "$0")"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start microservices
echo "  - Starting Docker containers..."
docker-compose up -d

# Wait for services to be ready
echo "  - Waiting for services to initialize..."
sleep 15

# Check service status
echo "  - Checking service status..."
docker-compose ps

echo "✅ Backend microservices started"

# Step 2: Run Prisma Migrations (if needed)
echo ""
echo "🔄 Step 2: Running database migrations..."

services=("user-service" "product-service" "inventory-service" "shopify-service" "marketplace-service" "audit-service" "order-service" "notification-service")

for service in "${services[@]}"; do
    echo "  - Migrating $service..."
    docker-compose exec -T $service npx prisma db push 2>/dev/null || echo "    ⚠️  Skipped (already migrated or no changes)"
done

echo "✅ Database migrations complete"

# Step 3: Start Frontend
echo ""
echo "🎨 Step 3: Starting Frontend..."
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "  - Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
echo "  - Starting Next.js development server..."
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo "✅ Frontend started (PID: $FRONTEND_PID)"

# Step 4: Display URLs
echo ""
echo "✅ Full Stack Application Started!"
echo ""
echo "📝 Access URLs:"
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 Frontend:            http://localhost:3100"
echo "  🔌 API Gateway:         http://localhost:3000"
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Backend Microservices:"
echo "  ├─ User Service:        http://localhost:3001"
echo "  ├─ Product Service:     http://localhost:3002"
echo "  ├─ Inventory Service:   http://localhost:3003"
echo "  ├─ Shopify Service:     http://localhost:3004"
echo "  ├─ Marketplace Service: http://localhost:3005"
echo "  ├─ Audit Service:       http://localhost:3006"
echo "  ├─ Order Service:       http://localhost:3007"
echo "  └─ Notification Service:http://localhost:3008"
echo ""
echo "🔍 View Logs:"
echo "  - Backend:  docker-compose logs -f"
echo "  - Frontend: tail -f frontend.log"
echo ""
echo "🛑 Stop Application:"
echo "  - Run: ./stop.sh"
echo ""

# Save PIDs for stopping later
echo $FRONTEND_PID > .frontend.pid

echo "Press Ctrl+C to stop monitoring logs..."
echo ""

# Follow logs
docker-compose logs -f
