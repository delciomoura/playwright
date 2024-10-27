const { test } = require('@playwright/test');
const {
    login, accessLoginScreen, createNewContact,
    clickCloseContactRegistrationModal, deleteRegisteredContact,
    checkIfNoContactsHaveBeenRegistered
} = require('../support/commands');
const { contact, namelessContact, numberlessContact, descriptionlessContact } = require('../fixtures/data-new-contact');
const { validateCreatedContact, validateIfTheTextIsVisibleOnTheScreen } = require('../support/commands-validations');
const { delcioLogin } = require('../fixtures/data-login');
const { hasTextDangerSelector } = require('../support/commands-selectors');
const { textsUtils } = require('../fixtures/texts-validations');

test.beforeEach(async ({ page }) => {
    await accessLoginScreen(page);
    await login(page, delcioLogin);
});

test.describe('Contact registration flow', () => {
    test('Validate registration of a new contact', async ({ page }) => {
        await createNewContact(page, contact);
        await validateCreatedContact(page, contact);
        await clickCloseContactRegistrationModal(page);
    });

    test('Registration new contact without providing the name', async ({ page }) => {
        await createNewContact(page, namelessContact);
        await validateIfTheTextIsVisibleOnTheScreen(page, hasTextDangerSelector, textsUtils.textNameRequired);
        await checkIfNoContactsHaveBeenRegistered(page);
    });

    test('Registration new contact without providing the number', async ({ page }) => {
        await createNewContact(page, numberlessContact);
        await validateIfTheTextIsVisibleOnTheScreen(page, hasTextDangerSelector, textsUtils.textNumberRequired);
        await checkIfNoContactsHaveBeenRegistered(page);
    });

    test('Registration new contact without providing the description', async ({ page }) => {
        await createNewContact(page, descriptionlessContact);
        await validateIfTheTextIsVisibleOnTheScreen(page, hasTextDangerSelector, textsUtils.textDescriptionRequired);
        await checkIfNoContactsHaveBeenRegistered(page);
    });
});

test.afterEach(async ({ page }) => {
    await deleteRegisteredContact(page);
});
