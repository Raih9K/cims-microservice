## 🎉 Clean Architecture User Service - Setup Complete!

আপনার জন্য একটি **production-ready** মাইক্রোসার্ভিস তৈরি করা হয়েছে যা নিচের সব রিকোয়ারমেন্ট পূরণ করে:

## ✅ Features Implemented

### 1. Clean Architecture

```
src/
├── config/          → Configuration layer
├── interfaces/      → Contracts/Abstractions
├── repositories/    → Data access layer
├── services/        → Business logic layer
├── controllers/     → Presentation layer
└── routes/          → API routing
```

### 2. Repository Pattern

- **IUserRepository** - Interface definition
- **JsonUserRepository** - Mock mode implementation (JSON file)
- **SqlUserRepository** - SQL mode implementation (Prisma + PostgreSQL)

### 3. Environment-Based Mode Switching

```env
DATA_MODE=mock   # No database needed
DATA_MODE=sql    # PostgreSQL required
```

### 4. Factory Pattern

```typescript
RepositoryFactory.createUserRepository();
// Returns JsonUserRepository or SqlUserRepository based on DATA_MODE
```

### 5. Dependency Injection

```typescript
const repository = RepositoryFactory.createUserRepository();
const service = new UserService(repository);
const controller = new UserController(service);
```

## 🚀 How to Run

### Mock Mode (Immediate Testing - No Database)

```bash
cd services/user-service

# Set environment
echo DATA_MODE=mock > .env

# Install & run
npm install
npm run dev
```

### SQL Mode (PostgreSQL)

```bash
cd services/user-service

# Set environment
echo DATA_MODE=sql > .env
echo DATABASE_URL=postgresql://user:pass@localhost:5432/db >> .env

# Setup Prisma
npm run prisma:generate
npm run prisma:migrate

# Run service
npm run dev
```

## 📡 API Examples

### 1. Create User

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "secret123"
  }'
```

### 2. Get All Users

```bash
curl http://localhost:3001/api/users
```

### 3. Get User by ID

```bash
curl http://localhost:3001/api/users/{userId}
```

### 4. Update User

```bash
curl -X PUT http://localhost:3001/api/users/{userId} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### 5. Delete User

```bash
curl -X DELETE http://localhost:3001/api/users/{userId}
```

### 6. Health Check

```bash
curl http://localhost:3001/health
```

## 🎨 Design Patterns Used

1. **Clean Architecture** - Proper layering and separation
2. **Repository Pattern** - Abstract data access
3. **Factory Pattern** - Runtime implementation selection
4. **Dependency Injection** - Loose coupling
5. **Interface Segregation** - Clear contracts

## 🔄 How Data Mode Switching Works

```typescript
// Configuration reads DATA_MODE from .env
export const config = {
  dataMode: process.env.DATA_MODE || 'mock',
};

// Factory creates appropriate implementation
export class RepositoryFactory {
  static createUserRepository(): IUserRepository {
    if (config.dataMode === 'mock') {
      return new JsonUserRepository(); // Uses JSON file
    } else {
      return new SqlUserRepository(); // Uses PostgreSQL
    }
  }
}

// Controllers don't know which implementation is used
const repo = RepositoryFactory.createUserRepository();
const service = new UserService(repo);
```

## 📦 Scalability

এই structure দিয়ে আপনি সহজেই নতুন entities যোগ করতে পারবেন:

```bash
# Add Product Service
src/interfaces/IProductRepository.ts
src/repositories/JsonProductRepository.ts
src/repositories/SqlProductRepository.ts
src/services/ProductService.ts
src/controllers/ProductController.ts
src/routes/productRoutes.ts
```

## 🔒 Benefits

- ✅ **No vendor lock-in** - Switch database anytime
- ✅ **Easy testing** - Mock mode needs zero setup
- ✅ **Clean code** - Each layer has single responsibility
- ✅ **Production ready** - Proper error handling & async/await
- ✅ **Type safe** - Full TypeScript support
- ✅ **Scalable** - Add new services easily

## 📁 Data Storage Locations

**Mock Mode:**

```
services/user-service/data/users.json
```

**SQL Mode:**

```
PostgreSQL database specified in DATABASE_URL
```

Service এখন সম্পূর্ণ প্রস্তুত! আপনি `npm run dev` দিয়ে চালাতে পারেন।
