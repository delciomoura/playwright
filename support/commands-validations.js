import { textsUtils } from '../fixtures/texts-validations';
import { selectors } from './commands-selectors';

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

const validateAbsenceOfContacts = async (page) => {
    await validateIfSelectorIsVisibleOrNot(page, contentSelector, textsUtils.stateHidden);
    await validateIfSelectorIsVisibleOrNot(page, loaderSelector, textsUtils.stateHidden);
    await validateIfTheTextIsVisibleOnTheScreen(page, messageBodySelector, textsUtils.contactNotFound);
};

export {
    validateTextH4, validateTextModalCardTitle, validateCreatedContact,
    validateIfSelectorIsVisibleOrNot, validateIfTheTextIsVisibleOnTheScreen, validateAbsenceOfContacts
};