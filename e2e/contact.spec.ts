import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kontakt');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    await expect(page.getByLabel(/ime|name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/poruka|message/i)).toBeVisible();
  });

  test('should show validation errors for empty submission', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /pošalji|send|submit/i });
    await submitButton.click();
    
    // Check for validation - either HTML5 validation or custom error messages
    const nameInput = page.getByLabel(/ime|name/i);
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('should accept valid input', async ({ page }) => {
    await page.getByLabel(/ime|name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/poruka|message/i).fill('This is a test message');
    
    // Verify inputs are filled
    await expect(page.getByLabel(/ime|name/i)).toHaveValue('Test User');
    await expect(page.getByLabel(/email/i)).toHaveValue('test@example.com');
    await expect(page.getByLabel(/poruka|message/i)).toHaveValue('This is a test message');
  });
});

test.describe('Contact Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kontakt');
  });

  test('should display contact information', async ({ page }) => {
    // Check for email or phone info
    const contactSection = page.locator('main');
    await expect(contactSection.getByText(/split|hrvatska/i).first()).toBeVisible();
  });
});
