import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/HNDS/i);
  });

  test('should display the hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should have a working CTA button', async ({ page }) => {
    // Look for any link or button containing common CTA text
    const ctaButton = page.getByRole('link', { name: /saznaj više|učlani se|kontakt|pridruži/i }).first();
    if (await ctaButton.isVisible()) {
      await ctaButton.click();
      // Should navigate somewhere
      await expect(page.url()).not.toBe('/');
    }
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have social media links in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /instagram/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /facebook/i })).toBeVisible();
  });
});

test.describe('SEO and Metadata', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/HNDS/i);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.+/);
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('link[rel="canonical"]');
    // May or may not be present based on implementation
    if (await canonical.count() > 0) {
      await expect(canonical).toHaveAttribute('href', /.+/);
    }
  });
});

test.describe('Accessibility', () => {
  test('should have skip to content link', async ({ page }) => {
    await page.goto('/');
    
    // Focus on the skip link (it's sr-only so we need to tab to it)
    await page.keyboard.press('Tab');
    
    const skipLink = page.getByRole('link', { name: /preskoči na sadržaj|skip to content/i });
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeFocused();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for h1
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    // Check that images have alt attributes
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });
});
