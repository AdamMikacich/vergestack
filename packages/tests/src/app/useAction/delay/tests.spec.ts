import { expect, test } from '@playwright/test';

test('useAction delay', async ({ page }) => {
  await page.goto('/useAction/delay');

  // Wait for the greeting to appear
  await page.waitForSelector('p:has-text("Hello, world!")');

  // Check if the greeting text is present
  const greetingText = await page.textContent('p#data');
  expect(greetingText).toBe('Hello, world!');
});