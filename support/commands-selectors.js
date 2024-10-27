const hasTextDangerSelector = '.has-text-danger';
const contentSelector = '.content';
const pSelector = 'p';
const animationContentSelector = '.animation-content';
const messageBodySelector = '.message-body';
const loaderSelector = '#loader';
const modalCardSelector = '[class="modal-card"]';
const cardContentSelector = '.card-content';

const nameEmailSelector = async (page) => {
    return await page.$('[name="email"]');
};

const namePasswordSelector = async (page) => {
    return await page.$('[name="password"]');
};

const h4Selector = async (page) => {
    return await page.textContent('h4');
};

const modalCardTitleSelector = async (page) => {
    return await page.textContent('[class="modal-card-title"]');
};

const sigInSelector = async (page) => {
    return await page.$('#sigIn');
};

const addNewContactSelector = async (page) => {
    return await page.$('[data-cy="addNewContact"]');
};

const nameSelector = async (page) => {
    return await page.waitForSelector('[data-cy="name"]', { state: 'visible' });
};

const numberSelector = async (page) => {
    return await page.$('[data-cy="number"]');
};

const descriptionSelector = async (page) => {
    return await page.$('[data-cy="description"]');
};

const saveButtonSelector = async (page) => {
    return await page.$('[data-cy="saveButton"]');
};

const btnRemoveSelector = async (page) => {
    return await page.$('[data-cy="btn-remove"]');
};

const deleteSelector = async (page) => {
    return await page.$('.delete');
};

export {
    nameEmailSelector, namePasswordSelector, h4Selector,
    addNewContactSelector, modalCardTitleSelector, sigInSelector, nameSelector,
    numberSelector, descriptionSelector, saveButtonSelector, btnRemoveSelector,
    messageBodySelector, deleteSelector, hasTextDangerSelector, contentSelector,
    pSelector, animationContentSelector, loaderSelector, modalCardSelector, cardContentSelector
};
