#!/bin/bash

# Downgrade Prisma to version 5.x for compatibility

echo "🔄 Downgrading Prisma to version 5.x..."

services=("user-service" "product-service" "inventory-service" "shopify-service" "marketplace-service" "audit-service" "order-service" "notification-service")

for service in "${services[@]}"; do
    echo "  - Updating $service..."
    cd "services/$service"

    # Update package.json
    sed -i 's/"@prisma\/client": "\^7\.3\.0"/"@prisma\/client": "^5.22.0"/g' package.json
    sed -i 's/"prisma": "\^7\.3\.0"/"prisma": "^5.22.0"/g' package.json

    cd ../..
done

echo "✅ Prisma downgrade complete!"
echo ""
echo "Next steps:"
echo "1. Rebuild Docker images: docker-compose build"
echo "2. Start services: docker-compose up -d"
