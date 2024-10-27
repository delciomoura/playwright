import { textsUtils } from '../fixtures/texts-validations';
import {
    addNewContactSelector, btnRemoveSelector, cardContentSelector, deleteSelector, descriptionSelector,
    modalCardSelector,
    nameEmailSelector, namePasswordSelector, nameSelector,
    numberSelector, saveButtonSelector, sigInSelector
} from './commands-selectors';
import {
    validateAbsenceOfContacts,
    validateIfSelectorIsVisibleOrNot,
    validateTextH4, validateTextModalCardTitle
} from './commands-validations';

const accessLoginScreen = async (page) => {
    await page.goto('http://localhost:8080/');
};

const clickSigIn = async (page) => {
    const sigIn = await sigInSelector(page);
    sigIn.click();
};

const login = async (page, emailAndPassword) => {
    const emailInput = await nameEmailSelector(page);
    const passwordInput = await namePasswordSelector(page);

    await emailInput.fill(emailAndPassword.email);
    await passwordInput.fill(emailAndPassword.password);
    await clickSigIn(page);
    await validateTextH4(page, textsUtils.homeScreenTitle);
};

const clickAddNewContact = async (page) => {
    const addNewContactButton = await addNewContactSelector(page);
    await addNewContactButton.click();
};

const clickSaveButton = async (page) => {
    const saveButton = await saveButtonSelector(page);
    await saveButton.click();
};

const clickCloseContactRegistrationModal = async (page) => {
    const btnRemove = await btnRemoveSelector(page);
    await btnRemove.click();
};

const createNewContact = async (page, newContactDetails) => {

    await clickAddNewContact(page);
    await validateIfSelectorIsVisibleOrNot(page, modalCardSelector, textsUtils.stateVisible);
    await validateTextModalCardTitle(page, textsUtils.newContactModalTitle);

    const nameInput = await nameSelector(page);
    const numberInput = await numberSelector(page);
    const descriptionInput = await descriptionSelector(page);

    await nameInput.fill(newContactDetails.name);
    await numberInput.fill(newContactDetails.number);
    await descriptionInput.fill(newContactDetails.description);
    await clickSaveButton(page);
};

const deleteRegisteredContact = async (page) => {
    const cards = page.locator(cardContentSelector);
    const count = await cards.count();

    if (count > 0) {
        await clickCloseContactRegistrationModal(page);
        await validateAbsenceOfContacts(page);
    } else {
        console.log('No contacts registered')
    }
};

const checkIfNoContactsHaveBeenRegistered = async (page) => {
    const btnCloseContactModal = await deleteSelector(page);
    await btnCloseContactModal.click();
    await validateAbsenceOfContacts(page);
};

export {
    login, accessLoginScreen, clickAddNewContact,
    createNewContact, clickCloseContactRegistrationModal, deleteRegisteredContact,
    checkIfNoContactsHaveBeenRegistered
};
