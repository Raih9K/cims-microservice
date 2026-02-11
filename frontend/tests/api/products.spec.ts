import { expect, test } from '@playwright/test';

const API_URL = 'http://localhost:8000/api';

test.describe('Product API', () => {
    test.describe.configure({ mode: 'serial' });

    let authToken = '';
    let createdProductId = '';

    test.beforeAll(async ({ request }) => {
        // Login as Super Admin or Business Admin
        const response = await request.post(`${API_URL}/login`, {
            data: {
                email: 'admin@demo.com',
                password: 'password'
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        authToken = body.access_token;
    });

    test('should list products', async ({ request }) => {
        const response = await request.get(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test('should create a new simple product', async ({ request }) => {
        const productData = {
            name: `Test Product ${Date.now()}`,
            type: 'Simple',
            sku: `TEST-SKU-${Date.now()}`,
            category: 'Electronics', // Helper: assumes category exists from seeder
            brand: 'Samsung', // Helper: assumes brand exists
            description: 'A test product created via API',
            uom: 'pcs',
            track_inventory: true,
            initial_quantity: 50,
            cost_price: 10,
            selling_price: 20,
            status: 'Active',
            visibility: 'Public'
        };

        const response = await request.post(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: productData
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        createdProductId = body.data.id;
        expect(body.data).toMatchObject({
            name: productData.name,
            sku: productData.sku
        });
    });

    test('should update the product', async ({ request }) => {
        const response = await request.put(`${API_URL}/products/${createdProductId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: {
                name: 'Updated Product Name',
                selling_price: 25
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.name).toBe('Updated Product Name');
        expect(body.data.selling_price).toBe(25);
    });

    test('should delete the product', async ({ request }) => {
        const response = await request.delete(`${API_URL}/products/${createdProductId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(response.status()).toBe(200);
    });
});
