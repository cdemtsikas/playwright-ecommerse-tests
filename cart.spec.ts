import { expect, test } from './fixtures/base.fixture';

const addToCartButton = '[data-test-id="add-to-cart-button"]';
const cartButton = '[data-test-id="cart-button"]';
const cartCount = '[data-test-id="cart-count"]';

test.describe('Add to cart', () => {
    test('adds one product to the cart', async ({ authenticatedPage }) => {
        // nth(0) = locator selects the first "add to cart" button
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await expect(authenticatedPage.locator(cartButton)).toBeVisible();
        // toHaveText = checks that the cart count is 1
        await expect(authenticatedPage.locator(cartCount)).toHaveText('1');
    });

    test('updates the cart count after adding multiple products', async ({ authenticatedPage }) => {
        await authenticatedPage.locator(addToCartButton).first().click();
        await authenticatedPage.locator(addToCartButton).nth(1).click();

        await expect(authenticatedPage.locator(cartCount)).toHaveText('2');
    });
});
test.describe('Remove from cart', () => {
    test('removes one product from the cart', async ({authenticatedPage}) => {
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await expect(authenticatedPage.locator(cartCount)).toHaveText('1');
        await authenticatedPage.locator(cartButton).click();
        //todo remove-item-3 locator is generic and might no work, we need a 'Remove" button to be found (getByRole)
        await authenticatedPage.getByRole('button', { name: 'Remove' }).click();
        await expect(authenticatedPage.locator(cartCount)).toBeHidden();
    })
})
