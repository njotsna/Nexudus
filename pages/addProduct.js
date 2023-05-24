exports.AddProductPage = class AddProductPage {
    //create contructor and add locators
    constructor(page) {
        this.page = page
        this.addProduct_button= page.getByRole('button', { name: 'Add product' })
        this.manualEntry_button = page.getByRole('button', { name: 'Manual entry'})
        this.productName_field  = page.getByLabel('Product name')
        this.productDescription_field = page.getByLabel('Product description')
        this.productPrice_field = page.getByLabel('Unit price')
        this.productPosition_field = page.getByLabel('th', { exact: true })
        this.save_Button = page.getByRole('button', { name: 'Save changes' })
        this.delete_Button = page.getByRole('button', { name: 'Delete' })
        this.confirmation_popup = page.getByRole('button', { name: 'Yes, do it' })
        this.firstIteminList_link = page.getByRole('link', { name: '1st product Kalkio Space - East Side' })

    }

    //create login function

    async addProduct(name, description, price){

        await this.addProduct_button.click()
        await this.manualEntry_button.click()
        await this.productName_field.fill(name)
        await this.productDescription_field.click()
        await this.productDescription_field.fill(description)
        await this.productPrice_field.click()
        await this.productPrice_field.fill(price)
        await this.productPosition_field.fill('1')
        await this.productDescription_field.click()
        await this.save_Button.click()
    }

    async deleteProduct(){
        await this.firstIteminList_link.click()
        await this.delete_Button.click()
        await this.confirmation_popup.click()
  
    }

}