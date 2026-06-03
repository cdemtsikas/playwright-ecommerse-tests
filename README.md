Playwright Test Suite

Automated End-to-End (E2E) tests for the [aatp.vercel.app]() demo page. This project uses Playwright with the Page Object Model (POM).

**Features**:

• **Page Object Model**: Clean separation between test logic and UI selectors.

• **Automated CI/CD**: Integrated with GitHub Actions to run tests on every push.

• **Custom Fixtures**: Simplified test setup with pre-authenticated sessions.


**Prerequisites**

• Node.js (LTS version)

• npm (comes with Node.js)

**Installations**:

1.Clone the repository:

`git clone https://github.com/cdemtsikas/playwright-ecommerse-tests.git`

2.Install dependencies:

`npm install`

Install Plawright browsers:

`npx playwright install --with-deps`

Project Structure:

• **tests/e2e/**: Contains all the test scripts.

• **pages/**: Contains Page Object classes (BasePage, CheckoutPage).

• **fixtures/**: Custom Playwright fixtures for authenticated browser contexts.

• **github/workflows/**: Configuration for GitHub Actions (CI history).