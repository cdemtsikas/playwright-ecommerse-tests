import { expect, test, Page } from '@playwright/test';

// reusable values stored in constants, less writing
const dashboardUrl = 'https://aatp.vercel.app/dashboard';
const emailInput = '[data-test-id="email-input"]';
const passwordInput = '[data-test-id="password-input"]';
const loginButton = '[data-test-id="login-button"]';

// helper, it's like "whenever I want to log in, do these 3 actions"
// todo (STUDY THIS)
async function login(page: Page, email: string, password: string) {
    await page.locator(emailInput).fill(email);
    await page.locator(passwordInput).fill(password);
    await page.locator(loginButton).click();
}

test.describe('User login', () => {

    // No saved cookies, no saved local storage, don't remember logged-in users
    test.use({ storageState: { cookies: [], origins: [] } });

    // Every test starts from vercel.app, so I get rid of "await page.got('https://aatp.vercel.app/');"
    test.beforeEach(async ({ page }) => {
        await test.step('GIVEN: I open the application', async () => {
            await page.goto('https://aatp.vercel.app/');
        });
    });

    test('should land on dashboard after logging in', async ({ page }) => {
        await test.step('WHEN: I attempt to login with valid credentials', async () => {
            await login(page, 'test@test.com', 'test');
        });

        await test.step('THEN: I am redirected to the dashboard', async () => {
            await expect(page).toHaveURL(dashboardUrl);
        });
    });

    test('should not login with invalid credentials', async ({ page }) => {
        await test.step('WHEN: I attempt to login with invalid credentials', async () => {
            await login(page, 'wrong@email.com', 'wrongpassword');
        });

        await test.step('THEN: I remain on the login page', async () => {
            await expect(page).not.toHaveURL(dashboardUrl);
        });
    });

    test('should not login without credentials', async ({ page }) => {
        await test.step('WHEN: I attempt to login without email or password', async () => {
            await page.locator(loginButton).click();
        });

        await test.step('THEN: I remain on the login page', async () => {
            await expect(page).not.toHaveURL(dashboardUrl);
        });
    });

    test('should not login without email', async ({ page }) => {
        await test.step('WHEN: I attempt to login without email', async () => {
            await page.locator(passwordInput).fill('test');
            await page.locator(loginButton).click();
        });

        await test.step('THEN: I remain on the login page', async () => {
            await expect(page).not.toHaveURL(dashboardUrl);
        });
    });

    test('should not login without password', async ({ page }) => {
        await test.step('WHEN: I attempt to login without password', async () => {
            await page.locator(emailInput).fill('test@test.com');
            await page.locator(loginButton).click();
        });

        await test.step('THEN: I remain on the login page', async () => {
            await expect(page).not.toHaveURL(dashboardUrl);
        });
    });
});
