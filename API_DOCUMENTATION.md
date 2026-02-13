# 📚 Complete API Documentation - User & Inventory Services

## 🔧 Services Overview

| Service               | Port | Base URL                  |
| --------------------- | ---- | ------------------------- |
| **User Service**      | 3001 | http://localhost:3001/api |
| **Inventory Service** | 3002 | http://localhost:3002/api |

---

# 👤 USER SERVICE APIs

## Base URL: `http://localhost:3001/api`

### 1. Create User

**POST** `/users`

**Request Body:**

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "secret123",
  "companyId": 1
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "status": "active",
    "companyId": 1,
    "createdAt": "2026-02-12T08:30:00.000Z",
    "updatedAt": "2026-02-12T08:30:00.000Z"
  }
}
```

---

### 2. Get All Users

**GET** `/users`

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "status": "active",
      "companyId": 1
    }
  ]
}
```

---

### 3. Get User by ID

**GET** `/users/:id`

**Response (200 OK):**

```json
{
  "success": true,
  "data": { "id": "...", "name": "...", "email": "..." }
}
```

---

### 4. Update User

**PUT** `/users/:id`

**Request Body:**

```json
{
  "name": "Alice Smith",
  "status": "inactive"
}
```

---

### 5. Delete User

**DELETE** `/users/:id`

---

# 📦 INVENTORY SERVICE APIs

## Base URL: `http://localhost:3002/api`

### 1. Create Product

**POST** `/products`

**Request Body:**

```json
{
  "name": "iPhone 15 Pro",
  "sku": "APP-IP15P-256",
  "brand": "Apple",
  "category": "Electronics",
  "sellingPrice": 999.99,
  "costPrice": 750.0,
  "stock": 50,
  "minStock": 10,
  "companyId": 1
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "750e8400-e29b-41d4-a716-446655440000",
    "sku": "APP-IP15P-256",
    "stock": 50,
    "status": "active"
  }
}
```

---

### 2. Get All Products

**GET** `/products`

---

### 3. Get Product by ID

**GET** `/products/:id`

---

### 4. Update Product

**PUT** `/products/:id`

**Request Body:**

```json
{
  "sellingPrice": 1099.99,
  "stock": 75
}
```

---

### 5. Adjust Stock

**POST** `/products/:id/stock`

**Request Body:**

```json
{
  "quantity": 20
}
```

_(Positive to add, negative to subtract)_

---

### 6. Delete Product

**DELETE** `/products/:id`

---

## 🚀 Testing with Curl

```bash
# Create User
curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" -d "{\"name\":\"John\",\"email\":\"john@test.com\"}"

# Create Product
curl -X POST http://localhost:3002/api/products -H "Content-Type: application/json" -d "{\"name\":\"Laptop\",\"sku\":\"LAP-001\",\"sellingPrice\":500,\"stock\":10}"
```
