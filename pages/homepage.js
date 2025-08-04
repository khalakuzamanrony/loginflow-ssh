import { expect } from '@playwright/test';

class HomePage{
constructor(page){
        // Initialize the page and locators
        this.page = page;
        this.menuIcon = page.getByAltText('menu');
        this.signOutButton = page.getByRole('button', {name: 'Sign out'});
        this.manageText = page.locator('//*[@id="root"]/div/nav/div/div[2]/div[1]/span');
        this.SignInText = page.locator('//h2[@class="header"]');
        
    
    }

    async logout() {
        // Click on the menu icon to open the menu
        await this.menuIcon.click();

        // Click on the sign out button
        await this.signOutButton.click();

        // Optionally, you can wait for the page to load or for a specific element to appear
        await this.page.pause(); // Pause to observe the logout action

    }

    async Validation(){
        // Validate the presence of the 'Manage' text
        await expect (this.manageText).toHaveText('Manage');
    }
    async LogoutValidation(){
        // Validate that the user is redirected to the login page
        await expect (this.SignInText).toHaveText('Sign In');
    }

}
module.exports = HomePage;