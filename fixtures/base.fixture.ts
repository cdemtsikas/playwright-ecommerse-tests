import { test as base, type Page } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

export const test = base.extend<{ authenticatedPage: Page; checkoutPage: CheckoutPage }>({
    // This runs before every test automatically
    authenticatedPage: async ({ page }, use) => {
        // Navigate to login
        await page.goto('https://aatp.vercel.app/');

        // Log in with valid credentials
        await page.locator('[data-test-id="email-input"]').fill('test@test.com');
        await page.locator('[data-test-id="password-input"]').fill('test');
        await page.locator('[data-test-id="login-button"]').click();

        // Wait for dashboard to load
        await page.waitForURL('**/dashboard');

        // Now pass the authenticated page to your test
        await use(page);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
});

export { expect } from '@playwright/test';
