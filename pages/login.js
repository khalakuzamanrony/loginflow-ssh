import {expect} from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('//input[@type="email"]');
        this.password = page.locator('//input[@type="password"]');
        this.signInButton = page.getByRole('button', {name: 'Sign in'});
        this.courseName = page.locator('#root');
           
    }

    async login() {
        await this.email.fill("admin@email.com");
        await this.password.fill('admin@123');
        await this.signInButton.click();
        // await this.page.pause();
    }
    async login(username,password) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        // await this.page.pause();
    }

    async verifyLogin(){
        // Validate successful login by checking the URL
        await expect(this.courseName).toContainText('Fruits');
    }
}

module.exports = LoginPage;  // For CommonJS
// or: export default LoginPage;  // For ES modules