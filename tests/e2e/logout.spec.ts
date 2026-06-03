import { test, expect } from '../../fixtures/base.fixture';

const dashboardUrl = 'https://aatp.vercel.app/dashboard';
const loginButton = '[data-test-id="login-button"]';
const logoutButton = '[data-test-id="logout-button"]';

test('user logs out succesfully', async ({ authenticatedPage }) => {
    await authenticatedPage.locator(logoutButton).click();
    await expect(authenticatedPage).not.toHaveURL(dashboardUrl);
    await expect(authenticatedPage.locator(loginButton)).toBeVisible();
});
