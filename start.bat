@echo off
cls
echo ?? Starting CIMS SaaS locally (non-Docker)
echo ==========================================

echo.
echo ?? Step 0: Checking and clearing ports 3000-3008 and 3100...
for %%p in (3000 3001 3002 3003 3004 3005 3006 3007 3008 3100) do (
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%%p ^| findstr LISTENING') do (
        echo   - Killing process on port %%p with PID %%a
        taskkill /f /pid %%a >nul 2>&1
    )
)
echo ? Ports cleared.

echo.
echo ?? Step 1: Installing dependencies...
if not exist node_modules (
    echo   - Running npm install...
    call npm install >nul
    echo ? Dependencies installed.
) else (
    echo   - node_modules folder exists, skipping npm install.
)

echo.
echo ?? Step 2: Generating Prisma Clients...
echo   - Generating User Service client...
pushd services\user-service
call npx prisma generate >nul
popd

echo   - Generating Product Service client...
pushd services\product-service
call npx prisma generate >nul
popd

echo   - Generating Inventory Service client...
pushd services\inventory-service
call npx prisma generate >nul
popd

echo   - Generating Shopify Service client...
pushd services\shopify-service
call npx prisma generate >nul
popd

echo   - Generating Marketplace Service client...
pushd services\marketplace-service
call npx prisma generate >nul
popd

echo   - Generating Audit Service client...
pushd services\audit-service
call npx prisma generate >nul
popd

echo   - Generating Order Service client...
pushd services\order-service
call npx prisma generate >nul
popd

echo   - Generating Notification Service client...
pushd services\notification-service
call npx prisma generate >nul
popd
echo ? Prisma Clients generated.

echo.
echo ??? Step 3: Pushing Database Schemas to Local MySQL...
echo   - Pushing user-service database...
pushd services\user-service
call npx prisma db push >nul
popd

echo   - Pushing product-service database...
pushd services\product-service
call npx prisma db push >nul
popd

echo   - Pushing inventory-service database...
pushd services\inventory-service
call npx prisma db push >nul
popd

echo   - Pushing shopify-service database...
pushd services\shopify-service
call npx prisma db push >nul
popd

echo   - Pushing marketplace-service database...
pushd services\marketplace-service
call npx prisma db push >nul
popd

echo   - Pushing audit-service database...
pushd services\audit-service
call npx prisma db push >nul
popd

echo   - Pushing order-service database...
pushd services\order-service
call npx prisma db push >nul
popd

echo   - Pushing notification-service database...
pushd services\notification-service
call npx prisma db push >nul
popd
echo ? MySQL databases updated.

echo.
echo ?? Step 4: Seeding default SaaS Packages to cims_users...
pushd services\user-service
call npx prisma db seed >nul
popd
echo ? Database seeded.

echo.
echo ? Full Stack Application Initialized!
echo.
echo ?? Access URLs:
echo   ??????????????????????????????????????????
echo   ?? Frontend:            http://localhost:3100
echo   ?? API Gateway:         http://localhost:3000
echo   ??????????????????????????????????????????
echo.
echo   Backend Microservices:
echo   ?? User Service:        http://localhost:3001
echo   ?? Product Service:     http://localhost:3002
echo   ?? Inventory Service:   http://localhost:3003
echo   ?? Shopify Service:     http://localhost:3004
echo   ?? Marketplace Service: http://localhost:3005
echo   ?? Audit Service:       http://localhost:3006
echo   ?? Order Service:       http://localhost:3007
echo   ?? Notification Service:http://localhost:3008
echo.
echo ?? Step 5: Starting all microservices and gateway...
call npm run dev:all
pause
