import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    _url = '/checkout';

    // Selectors
    readonly addToCartButton = this.getLocator('[data-test-id="add-to-cart-button"]');
    readonly placeOrderButton = this.getLocator('[data-test-id="place-order-button"]');
    readonly cartButton = this.getLocator('[data-test-id="cart-button"]');
    readonly cartCount = this.getLocator('[data-test-id="cart-count"]');
    readonly checkoutButton = this.getLocator('[data-test-id="checkout-button"]');
    readonly cancelOrderButton = this.getLocator('[data-test-id="cancel-checkout-button"]');
    readonly nameInput = this.getLocator('[data-test-id="name-input"]');
    readonly addressInput = this.getLocator('[data-test-id="address-input"]');
    readonly zipInput = this.getLocator('[data-test-id="zip-input"]');
    readonly cityInput = this.getLocator('[data-test-id="city-input"]');
    readonly phoneInput = this.getLocator('[data-test-id="phone-input"]');
    readonly confirmOrderModalButton = this.getLocator('[data-test-id="modal-confirm-button"]');
    readonly cancelOrderModalButton = this.getLocator('[data-test-id="modal-confirm-cancel-button"]');
    readonly keepShoppingModalButton = this.getLocator('[data-test-id="modal-keep-shopping-button"]');

    async fillShippingDetails(details: { name: string, address: string, zip: string, city: string, phone: string }) {
        await this.clearAndType(this.nameInput, details.name);
        await this.clearAndType(this.addressInput, details.address);
        await this.clearAndType(this.zipInput, details.zip);
        await this.clearAndType(this.cityInput, details.city);
        await this.clearAndType(this.phoneInput, details.phone);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.confirmOrderModalButton.click();
    }
}
