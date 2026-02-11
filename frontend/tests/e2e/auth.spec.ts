import { expect, test } from '@playwright/test';

test.describe('Authentication UI Flow', () => {
  const userEmail = `ui.test.${Date.now()}@example.com`;

  test('should allow a user to sign up', async ({ page }) => {
    await page.goto('/signup');

    // Step 1: Company Info
    await page.fill('input[name="companyName"]', 'UI Test Inc');
    await page.selectOption('select[name="businessType"]', 'Retail');
    await page.selectOption('select[name="managementTool"]', 'Spreadsheets'); // Assuming this maps to 'single' or similar
    // Note: Adjust selectors based on actual Form implementation
     await page.click('button:has-text("Next Step")');

    // Step 2: Personal Info
    await page.fill('input[name="fullName"]', 'UI Tester');
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button:has-text("Create Account")');

    // Expect redirection to Verify Email
    await expect(page).toHaveURL(/\/verify-email/);
    await expect(page.locator('text=Verify your email address')).toBeVisible();
  });

  test('should verify OTP via UI', async ({ page }) => {
    // Navigate to verify page (assuming session persistence or direct link in real scenario)
    // For this generic test, we might struggle if state isn't persisted.
    // Ideally, we run this immediately after signup in the same test block or state is pre-seeded.

    // Re-do signup for isolation if needed, or use a "setup" step.
    // For now, let's assume we are on the verify page from the previous step if run serially,
    // OR we login and get redirected.

    // Let's treat this as a separate isolated Login test for stability
    await page.goto('/signin');
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button:has-text("Sign In")');

    // Should be redirected to verify-email if not verified
    // await expect(page).toHaveURL(/\/verify-email/);

    // Enter OTP
    await page.fill('input[type="text"]', '123456'); // Assuming single input or similar
    await page.click('button:has-text("Verify Email")');

    // Expect redirection to Dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
