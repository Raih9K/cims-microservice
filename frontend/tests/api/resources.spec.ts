import { expect, test } from '@playwright/test';

const API_URL = 'http://localhost:8000/api';

test.describe('Resources API', () => {
    test.describe.configure({ mode: 'serial' });

    let authToken = '';

    test.beforeAll(async ({ request }) => {
        const response = await request.post(`${API_URL}/login`, {
            data: { email: 'admin@demo.com', password: 'password' }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        authToken = body.access_token;
    });

    test('should manage Categories', async ({ request }) => {
        // Create
        const createRes = await request.post(`${API_URL}/categories`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { category_name: `Test Cat ${Date.now()}` }
        });
        expect(createRes.status()).toBe(201);
        const catId = (await createRes.json()).data.id;

        // List
        const listRes = await request.get(`${API_URL}/categories`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(listRes.status()).toBe(200);

        // Delete
        const deleteRes = await request.delete(`${API_URL}/categories/${catId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(deleteRes.status()).toBe(200);
    });

    test('should manage Brands', async ({ request }) => {
        // Create
        const createRes = await request.post(`${API_URL}/brands`, {
            headers: { Authorization: `Bearer ${authToken}` },
            data: { brand_name: `Test Brand ${Date.now()}` }
        });
        expect(createRes.status()).toBe(201);
        const brandId = (await createRes.json()).data.brand_id;

        // List
        const listRes = await request.get(`${API_URL}/brands`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(listRes.status()).toBe(200);

        // Delete
        const deleteRes = await request.delete(`${API_URL}/brands/${brandId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(deleteRes.status()).toBe(200);
    });
});
