#!/bin/bash

# CIMS Full Stack Stop Script
# Stops both backend microservices and frontend

echo "🛑 Stopping CIMS Full Stack Application"
echo "========================================"

# Stop frontend
if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    echo "  - Stopping frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID 2>/dev/null || echo "    Frontend already stopped"
    rm .frontend.pid
fi

# Stop backend
echo "  - Stopping backend microservices..."
docker-compose down

echo ""
echo "✅ Application stopped successfully!"
