import {test} from '@playwright/test';
import { json } from 'stream/consumers';
const jsondata = require('../pomdata.json');
const LoginPage = require("../pages/login.js");
const Homepage = require("../pages/homepage.js");
const baseUrl = 'https://freelance-learn-automation.vercel.app';

test('login', async ({page}) => {
    //Calling instance of loginData and Homepage
    const loginPage = new LoginPage(page);
    const homepage = new Homepage(page);

    // Navigate to the login page
    await page.goto(baseUrl+'/login');

    // Perform login
    // await loginPage.login();

    // Perform login with username and password
    await loginPage.login(jsondata.username, jsondata.password);

    // Validate successful login by checking the URL
    await page.waitForLoadState('networkidle');

    // Validate that the user is redirected to the homepage
    await loginPage.verifyLogin();

    // Validate the presence of the 'Manage' text
    await homepage.Validation();

    // Perform logout
    await homepage.logout();

    // Validate that the user is redirected to the login page
    await homepage.LogoutValidation();

});
