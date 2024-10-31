const { textsUtils } = require('../fixtures/texts-validations');
const { selectors } = require('./commands-selectors');

const {
    addNewContactSelector, btnRemoveSelector, cardContentSelector, deleteSelector,
    descriptionSelector, modalCardSelector, nameEmailSelector, namePasswordSelector,
    nameSelector, numberSelector, saveButtonSelector, sigInSelector
} = selectors;

const {
    validateAbsenceOfContacts,
    validateIfSelectorIsVisibleOrNot,
    validateTextH4, validateTextModalCardTitle
} = require('./commands-validations');

const accessLoginScreen = async (page) => {
    await page.goto('http://localhost:8080/');
};

const clickButton = async (page, selector) => {
    await page.locator(selector).click(textsUtils.waitForElementToLoad);
};

const insertEmail = async (page, email) => {
    await page.fill(nameEmailSelector, email);
};

const insertPassword = async (page, password) => {
    await page.fill(namePasswordSelector, password);
};

const insertNameContact = async (page, name) => {
    await page.locator(nameSelector).fill(name, textsUtils.waitForElementToLoad);
};

const insertNumberContact = async (page, number) => {
    await page.locator(numberSelector).fill(number, textsUtils.waitForElementToLoad);
};

const insertDescriptionContact = async (page, description) => {
    await page.locator(descriptionSelector).fill(description, textsUtils.waitForElementToLoad);
};

const login = async (page, emailAndPassword) => {
    await accessLoginScreen(page);
    await insertEmail(page, emailAndPassword.email);
    await insertPassword(page, emailAndPassword.password);
    await clickButton(page, sigInSelector);
    await validateTextH4(page, textsUtils.homeScreenTitle);
};

const createNewContact = async (page, newContactDetails) => {
    await clickButton(page, addNewContactSelector);
    await validateIfSelectorIsVisibleOrNot(page, modalCardSelector, textsUtils.stateVisible);
    await validateTextModalCardTitle(page, textsUtils.newContactModalTitle);
    await insertNameContact(page, newContactDetails.name);
    await insertNumberContact(page, newContactDetails.number);
    await insertDescriptionContact(page, newContactDetails.description);
    await clickButton(page, saveButtonSelector);
};

const deleteRegisteredContact = async (page) => {
    const cardsContacts = page.locator(cardContentSelector);
    const countContacts = await cardsContacts.count();

    if (countContacts > 0) {
        await clickButton(page, btnRemoveSelector);
        await validateAbsenceOfContacts(page);
    } else {
        console.log('No contacts registered')
    }
};

const checkIfNoContactsHaveBeenRegistered = async (page) => {
    await clickButton(page, deleteSelector);
    await validateAbsenceOfContacts(page);
};

module.exports = {
    login, accessLoginScreen, createNewContact,
    deleteRegisteredContact, checkIfNoContactsHaveBeenRegistered
};
