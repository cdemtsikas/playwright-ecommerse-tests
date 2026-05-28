import { expect, test } from './fixtures/base.fixture';

const addToCartButton = '[data-test-id="add-to-cart-button"]';
const placeOrderButton = '[data-test-id="place-order-button"]';
const cartButton = '[data-test-id="cart-button"]';
const cartCount = '[data-test-id="cart-count"]';
const checkoutButton = '[data-test-id="checkout-button"]';
const cancelorderbutton = '[data-test-id="cancel-checkout-button"]';
const nameInput = '[data-test-id="name-input"]';
const addressInput = '[data-test-id="address-input"]';
//todo why Zip code has text values?
const zipInput = '[data-test-id="zip-input"]';
const cityInput = '[data-test-id="city-input"]';
//todo what is the max value?
const phoneInput = '[data-test-id="phone-input"]';
const confirmOrderButtonMODAL = '[data-test-id="modal-confirm-button"]';
const cancelOrderButtonMODAL = '[data-test-id="modal-confirm-cancel-button"]';
const keepShoppingButtonButtonMODAL = '[data-test-id="modal-keep-shopping-button"]';

test.describe('Checkout', () => {
    test('adds one product to the cart', async ({authenticatedPage}) => {
        // nth(0) = locator selects the first "add to cart" button
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await expect(authenticatedPage.locator(cartButton)).toBeVisible();
        // toHaveText = checks that the cart count is 1
        await expect(authenticatedPage.locator(cartCount)).toHaveText('1');
        // Navigate to the cart
        await authenticatedPage.locator(cartButton).click();
        // Step 3: Click the "checkout" button
        await authenticatedPage.locator(checkoutButton).click();

        await authenticatedPage.locator(nameInput).fill('christos test');
        await authenticatedPage.locator(addressInput).fill('123 christos test');
        await authenticatedPage.locator(zipInput).fill('12345');
        await authenticatedPage.locator(cityInput).fill('athens');
        await authenticatedPage.locator(phoneInput).fill('6955555555');

        await authenticatedPage.locator(placeOrderButton).click();
        await authenticatedPage.locator(confirmOrderButtonMODAL).click();

        //todo why i need these?
        await expect(authenticatedPage.getByText('Thank You For Your Order!')).toBeVisible();
        await expect(authenticatedPage.getByText(/Order ID: #/)).toBeVisible();
    });

    test('checkout with empty cart', async ({authenticatedPage}) => {
        await expect(authenticatedPage.locator(cartButton)).toBeVisible();
        await authenticatedPage.locator(cartButton).click();
        await expect(authenticatedPage.locator(checkoutButton)).toBeDisabled();
    })

    test('checkout with invalid/empty shipping details', async ({authenticatedPage}) => {
        await expect(authenticatedPage.locator(cartButton)).toBeVisible();
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await expect(authenticatedPage.locator(cartCount)).toHaveText('1');
        await authenticatedPage.locator(cartButton).click();
        await authenticatedPage.locator(checkoutButton).click();

        await authenticatedPage.locator(nameInput).fill('christos test');
        await authenticatedPage.locator(addressInput).fill('123 christos test');
        await authenticatedPage.locator(zipInput).fill('12345');
        await authenticatedPage.locator(cityInput).fill('athens');

        await authenticatedPage.locator(placeOrderButton).click();

        await expect(authenticatedPage.locator(placeOrderButton)).toBeVisible();
        await expect(authenticatedPage.getByText('Please enter a valid phone number')).toBeVisible();
    })

    test('cancel order and return to dashboard', async ({authenticatedPage}) => {
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await expect(authenticatedPage.locator(cartCount)).toHaveText('1');
        await authenticatedPage.locator(cartButton).click();
        await authenticatedPage.locator(checkoutButton).click();
       // await expect(authenticatedPage.locator((cancelorderbutton))).toBeVisible();
        await authenticatedPage.locator(cancelorderbutton).click();
        await expect(authenticatedPage.locator(cancelOrderButtonMODAL)).toBeVisible();
        await authenticatedPage.locator(cancelOrderButtonMODAL).click();
        await expect(authenticatedPage).toHaveURL(/.*dashboard/);

    })

    test('"keep shopping" button on the cancel order page', async ({authenticatedPage}) => {
        await authenticatedPage.locator(addToCartButton).nth(0).click();
        await authenticatedPage.locator(cartButton).click();
        await authenticatedPage.locator(checkoutButton).click();
        await authenticatedPage.locator(cancelorderbutton).click();
        await authenticatedPage.locator(keepShoppingButtonButtonMODAL).click();
        await expect(authenticatedPage).toHaveURL(/.*checkout/);
    });

});