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
    await Login.login('adrian+1004930927@nexudus.com','i0i1lgVD8OK8')
    await expect(page).toHaveTitle('Kalkio Space - East Side')
});

test('Add and delete a product from the products list', async ({page}) => {
    const Login = new LoginPage(page)
    const AddProduct = new AddProductPage(page)
    
    // navigate to billing product page
    await Login.goToBillingPage()
    
    //enter valid username and password
    await Login.login('adrian+1004930927@nexudus.com','i0i1lgVD8OK8')
    
    //add product button
    await AddProduct.addProduct('1st Product', 'adding 1st AddProduct', '100')

    //verify newly adding item is 1st in the list
    await expect(page.getByRole('link', { name: '1st Product Kalkio Space - East Side' })).toHaveCount(1);

    //clcik on delete 1 record
    await AddProduct.deleteProduct()

    //verify product removed
    await expect(page.getByRole('link', { name: '1st Product Kalkio Space - East Side' })).toHaveCount(0);


});
