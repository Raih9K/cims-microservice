import { expect, test } from '@playwright/test';

const API_URL = 'http://localhost:8000/api';

test.describe('Auth API', () => {
  test.describe.configure({ mode: 'serial' });

  let userEmail = `test.auto.${Date.now()}@example.com`;

  test('should register a new company and user', async ({ request }) => {
    const response = await request.post(`${API_URL}/signup`, {
      data: {
        full_name: 'Test Admin',
        email: userEmail,
        password: 'password123',
        password_confirmation: 'password123',
        company_name: 'Auto Test Corp',
        business_type: 'Retail',
        management_type: 'single'
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('email', userEmail);
    expect(body).toHaveProperty('message');
  });

  test('should verify OTP', async ({ request }) => {
    // Note: OTP is static 123456 in dev/test environment
    const response = await request.post(`${API_URL}/verify-otp`, {
        data: {
            email: userEmail,
            otp: '123456'
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    expect(body.user.status).toBe('active');
  });

  test('should login successfully', async ({ request }) => {
    const response = await request.post(`${API_URL}/login`, {
        data: {
            email: userEmail,
            password: 'password123'
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('access_token');
  });

  test('should fail login with wrong password', async ({ request }) => {
    const response = await request.post(`${API_URL}/login`, {
        data: {
            email: userEmail,
            password: 'wrongpassword'
        }
    });

    expect(response.status()).toBe(422); // Validation error
  });
});
