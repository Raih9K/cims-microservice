# CIMS System API & Body Documentation

This document outlines the available API endpoints and their expected request bodies for the CIMS system.

## Base URL

`http://127.0.0.1:8000/api`

## 1. Authentication

### **Signup**

**POST** `/signup`
Registers a new company and admin user.

```json
{
  "full_name": "John Doe",
  "email": "admin@company.com",
  "password": "password123",
  "password_confirmation": "password123",
  "company_name": "Acme Corp",
  "business_type": "Retail",
  "management_type": "team" // or "single"
}
```

### **Login**

**POST** `/login`
Returns an authentication token.

```json
{
  "email": "admin@company.com",
  "password": "password123"
}
```

### **Verify OTP**

**POST** `/verify-otp`
Verifies user email after signup.

```json
{
  "email": "admin@company.com",
  "otp": "123456"
}
```

### **Get Current User**

**GET** `/me`
headers: `Authorization: Bearer <token>`
_No Body Required_

---

## 2. Team Management

### **Send Invitation**

**POST** `/team/invite`
Invites a new member to the current company.

```json
{
  "email": "member@company.com",
  "role": "Team Member" // Options: "Team Manager", "Team Member", "Viewer"
}
```

### **Switch Company**

**POST** `/team/switch-company`
Switches the active company context for the user.

```json
{
  "company_id": 2
}
```

### **Accept Invitation**

**POST** `/team/accept-invitation`
Public endpoint for a user to join a team via token.

```json
{
  "token": "invitation_token_string",
  "password": "newpassword123", // Optional if user already exists
  "name": "Jane Doe" // Optional
}
```

### **Update Team Member**

**PUT** `/team/{user_id}`
Updates role or status of a team member.

```json
{
  "name": "Jane Doe Updated", // Optional
  "role": "Team Manager", // Optional
  "status": "active" // Optional: "active" or "inactive"
}
```

---

## 3. Product Management

### **Create Product**

**POST** `/products`
Creates a new product. Supports Simple and Variant products.

**Complete Body Example:**

```json
{
  "basicInfo": {
    "title": "Premium Wireless Mouse",
    "sku": "MOUSE-MX-001",
    "category": "Electronics",
    "brand": "Logitech",
    "productIdentifierType": "UPC",
    "productIdentifierValue": "123456789012",
    "dimensionLength": 10,
    "dimensionWidth": 5,
    "dimensionHeight": 2,
    "weightValue": 0.5,
    "weightUnit": "kg",
    "dimensionUnit": "inch"
  },
  "description": {
    "mainDescription": "High precision wireless mouse.",
    "features": ["Ergonomic Design", "Long Battery Life"]
  },
  "pricing": {
    "sellingPrice": 99.99,
    "costPrice": 60.0,
    "discountType": "percentage",
    "discountValue": 10,
    "taxClass": "standard"
  },
  "inventory": {
    "stocks": [
      {
        "warehouse": "Default",
        "available": 150,
        "binLocations": ["A1-05"],
        "isDefault": true
      }
    ]
  },
  "media": {
    "images": [
      "https://example.com/image1.png",
      "https://example.com/image2.png"
    ]
  },
  "variants": {
    "hasVariation": true,
    "variantItems": [
      {
        "title": "Mouse - Red",
        "sku": "MOUSE-MX-RED",
        "price": 99.99,
        "quantity": 50,
        "combination": { "Color": "Red" }
      },
      {
        "title": "Mouse - Blue",
        "sku": "MOUSE-MX-BLU",
        "price": 99.99,
        "quantity": 50,
        "combination": { "Color": "Blue" }
      }
    ]
  },
  "listingStatus": {
    "status": "Active" // or "Draft"
  }
}
```

### **Update Product**

**PUT** `/products/{id}`
Updates an existing product. Uses the same body structure as Create. Allows partial updates.

### **Update Variant**

**PUT** `/products/{id}/variants/{variant_id}`
Updates a specific variant.

```json
{
  "basicInfo": {
    "title": "Mouse - Red V2",
    "sku": "MOUSE-MX-RED-V2"
  },
  "pricing": {
    "sellingPrice": 105.0
  },
  "inventory": {
    "stocks": [
      {
        "available": 60
      }
    ]
  }
}
```

---

## 4. Resource Management (Standard CRUD)

These endpoints follow standard REST patterns. Example for **Brands**.

- **Endpoints**:
  - `GET /api/brands`
  - `POST /api/brands`
  - `PUT /api/brands/{id}`
  - `DELETE /api/brands/{id}`

- **Typical Body:**

```json
{
  "name": "Nike",
  "description": "Sportswear brand",
  "website": "https://nike.com"
}
```

**Available Resources:**

- `warehouses`
- `categories`
- `suppliers`
- `attributes`
- `stock-levels`
