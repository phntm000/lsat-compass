import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('LSAT Compass smoke', () => {
  test('app boots and primary tabs render', async ({ page }) => {
    await page.goto('/today');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    for (const label of ['Today', 'Learn', 'Practice', 'Progress']) {
      await expect(page.getByRole('navigation', { name: 'Primary' }).getByText(label, { exact: false })).toBeVisible();
    }
  });

  test('no critical accessibility violations on Today', async ({ page }) => {
    await page.goto('/today');
    await page.getByRole('navigation', { name: 'Primary' }).waitFor();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const critical = results.violations.filter((v) => v.impact === 'critical');
    expect(critical, JSON.stringify(critical.map((v) => v.id))).toHaveLength(0);
  });

  test('learn screen lists curriculum', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('offline: app shell still renders with cached assets', async ({ page, context }) => {
    await page.goto('/today');
    await page.getByRole('navigation', { name: 'Primary' }).waitFor();
    await context.setOffline(true);
    await page.reload();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible({ timeout: 15000 });
    await context.setOffline(false);
  });
});
