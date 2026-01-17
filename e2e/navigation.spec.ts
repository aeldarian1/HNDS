import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show the navigation bar', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have all navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /naslovnica|home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /o nama|about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /aktivnosti|activities/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /vijesti|news/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /galerija|gallery/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /kontakt|contact/i })).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /o nama|about/i }).first().click();
    await expect(page).toHaveURL('/o-nama');
  });

  test('should navigate to Activities page', async ({ page }) => {
    await page.getByRole('link', { name: /aktivnosti|activities/i }).first().click();
    await expect(page).toHaveURL('/aktivnosti');
  });

  test('should navigate to News page', async ({ page }) => {
    await page.getByRole('link', { name: /vijesti|news/i }).first().click();
    await expect(page).toHaveURL('/vijesti');
  });

  test('should navigate to Gallery page', async ({ page }) => {
    await page.getByRole('link', { name: /galerija|gallery/i }).first().click();
    await expect(page).toHaveURL('/galerija');
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /kontakt|contact/i }).first().click();
    await expect(page).toHaveURL('/kontakt');
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu button', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /otvori izbornik|open menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open menu
    const menuButton = page.getByRole('button', { name: /otvori izbornik|open menu/i });
    await menuButton.click();
    
    // Check menu is visible - look for a link that's only in the mobile menu
    await expect(page.getByRole('link', { name: /naslovnica|home/i }).first()).toBeVisible();
    
    // Close menu
    const closeButton = page.getByRole('button', { name: /zatvori|close/i }).first();
    await closeButton.click();
  });
});
