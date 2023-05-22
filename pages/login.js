 exports.LoginPage = class LoginPage {
    //create contructor and add locators
    constructor(page) {
        this.page = page
        this.username_textbox = page.getByLabel('Email')
        this.password_textbox = page.getByLabel('Password')
        this.login_button = page.getByRole('button', { name: 'Sign in' })
    }
    async goToLoginPage(){
        await this.page.goto('https://dashboard.nexudus.com/');
    }
    async goToBillingPage(){
            await this.page.goto('https://dashboard.nexudus.com/qa/billing/products');
        
    }
    //create login function

    async login(username, password){
        
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }

}