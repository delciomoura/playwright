const { textsUtils } = require('../fixtures/texts-validations');
const { selectors } = require('./commands-selectors');

const {
    animationContentSelector, contentSelector, h4Selector,
    loaderSelector, messageBodySelector, modalCardTitleSelector, pSelector
} = selectors;

const { expect } = require('@playwright/test');

const validateTextH4 = async (page, text) => {
    expect(await page.textContent(h4Selector)).toBe(text);
};

const validateTextModalCardTitle = async (page, text) => {
    expect(await page.textContent(modalCardTitleSelector)).toBe(text);
};

const validateIfTheTextIsVisibleOnTheScreen = async (page, selector, text) => {
    const isVisible = await page.locator(`${selector}:has-text("${text}")`).isVisible();
    if (isVisible) {
        console.log(`The text "${text}" is visible on the screen.`);
    } else {
        throw new Error(`O texto "${text}" not found.`);
    }
};

const validateCreatedContact = async (page, newContactDetails) => {
    await validateIfSelectorIsVisibleOrNot(page, animationContentSelector, textsUtils.stateHidden);
    await validateIfTheTextIsVisibleOnTheScreen(page, pSelector, newContactDetails.name);
    await validateIfTheTextIsVisibleOnTheScreen(page, pSelector, newContactDetails.number);
    await validateIfTheTextIsVisibleOnTheScreen(page, contentSelector, newContactDetails.description);
};

const validateIfSelectorIsVisibleOrNot = async (page, selector, state) => {
    await page.waitForSelector(selector, { state });
};

const validateQuantityOfItemsonTheSecreen = async (page, selector, quantity) => {
    const locator = await page.locator(selector);
    const count = await locator.count();
    if (count === quantity) {
        console.log('Existe apenas um elemento .card-content na tela.');
    } else {
        throw new Error(`Teste falhou: existem ${count} elementos .card-content na tela.`);
    }
};

const validateAbsenceOfContacts = async (page) => {
    await validateIfSelectorIsVisibleOrNot(page, contentSelector, textsUtils.stateHidden);
    await validateIfSelectorIsVisibleOrNot(page, loaderSelector, textsUtils.stateHidden);
    await page.fill('[placeholder="Número do Whats"]', '123');
    await page.click('[class="button is-primary"]');
    await validateIfSelectorIsVisibleOrNot(page, contentSelector, textsUtils.stateHidden);
    await validateIfSelectorIsVisibleOrNot(page, loaderSelector, textsUtils.stateHidden);
    await validateIfTheTextIsVisibleOnTheScreen(page, messageBodySelector, textsUtils.contactNotFound);
};

module.exports = {
    validateTextH4, validateTextModalCardTitle, validateCreatedContact, validateQuantityOfItemsonTheSecreen,
    validateIfSelectorIsVisibleOrNot, validateIfTheTextIsVisibleOnTheScreen, validateAbsenceOfContacts
};