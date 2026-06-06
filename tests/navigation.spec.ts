import { test, expect } from '@playwright/test';

test.describe('Navigation Link Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all division links in header', async ({ page }) => {
    const navLinks = page.locator('.nav-tab');
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/HOME/i);
    await expect(navLinks.nth(1)).toHaveText(/BRAND/i);
    await expect(navLinks.nth(2)).toHaveText(/PLATFORM/i);
    await expect(navLinks.nth(3)).toHaveText(/CONSULTING/i);
    await expect(navLinks.nth(4)).toHaveText(/WORK/i);
  });

  test('should navigate to sections on index page', async ({ page }) => {
    const sections = ['media', 'systems', 'advisory', 'archive'];
    for (const s of sections) {
      await page.click(`.nav-tab[href="#${s}"]`);
      await expect(page).toHaveURL(new RegExp(`#${s}`));
    }
  });

  test('domains section should map active nav state to work', async ({ page }) => {
    await page.goto('/#domains');
    await page.waitForFunction(() => document.querySelector('.nav-tab.active')?.getAttribute('href') === '#archive');
    await expect(page.locator('.nav-tab.active')).toHaveAttribute('href', '#archive');
  });

  test('access section should clear active nav state', async ({ page }) => {
    await page.goto('/#access');
    await page.waitForFunction(() => document.querySelectorAll('.nav-tab.active').length === 0);
    await expect(page.locator('.nav-tab.active')).toHaveCount(0);
  });
});
