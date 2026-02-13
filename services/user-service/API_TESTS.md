# Test User Service API

## 1. Create User

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "secret123",
    "companyId": 1
  }'
```

## 2. Get All Users

```bash
curl http://localhost:3001/api/users
```

## 3. Get User by ID

```bash
curl http://localhost:3001/api/users/USER_ID_HERE
```

## 4. Update User

```bash
curl -X PUT http://localhost:3001/api/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "status": "inactive"
  }'
```

## 5. Delete User

```bash
curl -X DELETE http://localhost:3001/api/users/USER_ID_HERE
```

## 6. Health Check

```bash
curl http://localhost:3001/health
```
