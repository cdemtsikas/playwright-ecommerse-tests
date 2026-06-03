import { expect, test } from '../../fixtures/base.fixture';

test.describe('Checkout', () => {
    test('adds one product to the cart', async ({authenticatedPage, checkoutPage}) => {
        await checkoutPage.addToCartButton.nth(0).click();
        await expect(checkoutPage.cartButton).toBeVisible();
        await expect(checkoutPage.cartCount).toHaveText('1');
        
        await checkoutPage.cartButton.click();
        await checkoutPage.checkoutButton.click();

        await checkoutPage.fillShippingDetails({
            name: 'christos test',
            address: '123 christos test',
            zip: '12345',
            city: 'athens',
            phone: '6955555555'
        });

        await checkoutPage.placeOrder();

        await expect(authenticatedPage.getByText('Thank You For Your Order!')).toBeVisible();
        await expect(authenticatedPage.getByText(/Order ID: #/)).toBeVisible();
    });

    test('checkout with empty cart', async ({checkoutPage}) => {
        await expect(checkoutPage.cartButton).toBeVisible();
        await checkoutPage.cartButton.click();
        await expect(checkoutPage.checkoutButton).toBeDisabled();
    })

    test('checkout with invalid/empty shipping details', async ({checkoutPage}) => {
        await checkoutPage.addToCartButton.nth(0).click();
        await expect(checkoutPage.cartCount).toHaveText('1');
        await checkoutPage.cartButton.click();
        await checkoutPage.checkoutButton.click();

        await checkoutPage.fillShippingDetails({
            name: 'christos test',
            address: '123 christos test',
            zip: '12345',
            city: 'athens',
            phone: '' // Empty phone
        });

        await checkoutPage.placeOrderButton.click();

        await expect(checkoutPage.placeOrderButton).toBeVisible();
        await expect(checkoutPage.page.getByText('Please enter a valid phone number')).toBeVisible();
    })

    test('cancel order and return to dashboard', async ({checkoutPage}) => {
        await checkoutPage.addToCartButton.nth(0).click();
        await expect(checkoutPage.cartCount).toHaveText('1');
        await checkoutPage.cartButton.click();
        await checkoutPage.checkoutButton.click();
        
        await checkoutPage.cancelOrderButton.click();
        await expect(checkoutPage.cancelOrderModalButton).toBeVisible();
        await checkoutPage.cancelOrderModalButton.click();
        await expect(checkoutPage.page).toHaveURL(/.*dashboard/);
    })

    test('"keep shopping" button on the cancel order page', async ({checkoutPage}) => {
        await checkoutPage.addToCartButton.nth(0).click();
        await checkoutPage.cartButton.click();
        await checkoutPage.checkoutButton.click();
        await checkoutPage.cancelOrderButton.click();
        await checkoutPage.keepShoppingModalButton.click();
        await expect(checkoutPage.page).toHaveURL(/.*checkout/);
    });
});
