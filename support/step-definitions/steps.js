const { Given, When, Then, } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { login, createNewContact, deleteRegisteredContact, checkIfNoContactsHaveBeenRegistered } = require('../commands');
const { delcioLogin } = require('../../fixtures/data-login');
const { contact, namelessContact, numberlessContact, descriptionlessContact } = require('../../fixtures/data-new-contact');
const { validateCreatedContact, validateQuantityOfItemsonTheSecreen, validateIfTheTextIsVisibleOnTheScreen } = require('../commands-validations');
const { selectors } = require('../commands-selectors');
const { textsUtils } = require('../../fixtures/texts-validations');

const contactTypes = {
    namelessContact,
    numberlessContact,
    descriptionlessContact,
}

let browser;
let page;

Given('the user is logged into the application', { timeout: 30000 },  async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await login(page, delcioLogin);
});

When('access the contacts section and register a new contact, filling in the requested information', async () => {
    await createNewContact(page, contact);
});

When('access the contacts section and register a new contact, without filling in the {string}', async (contactType) => {
    await createNewContact(page, contactTypes[contactType]);
});

Then('the contact should be successfully registered', async () => {
    await validateCreatedContact(page, contact);
});

Then('message should be displayed {string}', async (message) => {
    await validateIfTheTextIsVisibleOnTheScreen(page, '.has-text-danger', message);
});

Then('the contact must not be successfully registered', async () => {
    await checkIfNoContactsHaveBeenRegistered(page);
});

Then('should not appear in the user contact list', async () => {
    await validateQuantityOfItemsonTheSecreen(page, selectors.cardContentSelector, textsUtils.noContactsRegistered);
    await page.close();
    await browser.close();
});

Then('it should appear in the user contact list', async () => {
    await validateQuantityOfItemsonTheSecreen(page, selectors.cardContentSelector, textsUtils.onlyOneRegisteredContatct);
    await deleteRegisteredContact(page);
    await page.close();
    await browser.close();
});