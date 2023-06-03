import { test, expect } from '@playwright/test';
import { LoginPage} from '../../pages/login'
import { AddProductPage } from '../../pages/addProduct';


test('invalid login to NEXUDUS', async ({ page }) => {

    const Login = new LoginPage(page)

    // navigate to Nexudus dashboard
    await Login.goToLoginPage()
    //landing on login page and verify title
    await expect(page).toHaveTitle('Sign in to Nexudus Platform')

    //login with invalid credentials
    await Login.login('bad@example.com','badpassword')
    await page.getByText('The email or password is incorrect.').click();


});

test('Valid login to NEXUDUS dashboard', async ({page}) => {
    const Login = new LoginPage(page)
    // navigate to Nexudus dashboard
    await Login.goToLoginPage()

    //landing on login page and verify title
    await expect(page).toHaveTitle('Sign in to Nexudus Platform')

    //enter valid username and password
    await Login.login('adrian+1004930927@nexudus.com', 'i0i1lgVD8OK8')
    await expect(page).toHaveTitle('Kalkio Space - East Side')
});


test('Add and delete a product from the products list', async ({ page }) => {
    const Login = new LoginPage(page)
    const AddProduct = new AddProductPage(page)


    // navigate to Nexudus dashboard
    await Login.goToLoginPage()

    //enter valid username and password
    await Login.login('adrian+1004930927@nexudus.com', 'i0i1lgVD8OK8')
    await expect(page).toHaveTitle('Kalkio Space - East Side')
    await page.locator("//span[contains(text(),'Inventory')]").click()
    await page.locator("//strong[normalize-space()='Products']").click()

    await expect(page).toHaveTitle('Products list - Kalkio Space - East Side')

    const elementVisible = await page.locator("//strong[normalize-space()='@2nd Product']").count() > 0;

    if (elementVisible) {
      console.log("element visible");
      await AddProduct.deleteProduct();
      await expect(page.getByRole('link', { name: '@2nd Product Kalkio Space - East Side' })).toHaveCount(0);
      await AddProduct.addProduct('@2nd Product', 'adding 1st AddProduct', '100');
      await expect(page.getByRole('link', { name: '@2nd Product Kalkio Space - East Side' })).toHaveCount(1);
      await AddProduct.deleteProduct();
      await expect(page.getByRole('link', { name: '@2nd Product Kalkio Space - East Side' })).toHaveCount(0);
    }

    // Add the product
    await AddProduct.addProduct('@2nd Product', 'adding 1st AddProduct', '100');
    // Verify newly added item is first in the list
    //await expect(page).toHaveTitle('Products list - Kalkio Space - East Side')
    await expect(page.getByRole('link', { name: '@2nd Product Kalkio Space - East Side' })).toHaveCount(1);
    
    // Delete the product again
    await AddProduct.deleteProduct();
    // Verify product removal again
    await expect(page.getByRole('link', { name: '@2nd Product Kalkio Space - East Side' })).toHaveCount(0);
    
});
