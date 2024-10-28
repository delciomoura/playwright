const { test, expect } = require('@playwright/test');
const { contact, namelessContact, numberlessContact, descriptionlessContact } = require('../fixtures/data-new-contact');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.fill('[name="email"]', 'junior@delcio.com.br');
    await page.fill('[name="password"]', 'delcio123');
    await page.click('#sigIn');
});

test.describe('Contact registration flow', () => {
    test('Validate registration of a new contact', async ({ page }) => {
        const textH4 = await page.textContent('h4');

        expect(textH4).toBe('Seu gerenciador digital de contatos');

        await page.click('[data-cy="addNewContact"]');

        const textModalCardTitle = await page.textContent('[class="modal-card-title"]');

        expect(textModalCardTitle).toBe('Novo Contato');

        await page.fill('[data-cy="name"]', contact.name);
        await page.fill('[data-cy="number"]', contact.number);
        await page.fill('[data-cy="description"]', contact.description);
        await page.click('[data-cy="saveButton"]');
        await page.waitForSelector('.animation-content', { state: 'hidden' });
        await page.locator(`p:has-text("${contact.name}")`).isVisible();
        await page.locator(`p:has-text("${contact.number}")`).isVisible();
        await page.locator(`p:has-text("${contact.description}")`).isVisible();
    });

    test('Registration new contact without providing the name', async ({ page }) => {
        const textH4 = await page.textContent('h4');

        expect(textH4).toBe('Seu gerenciador digital de contatos');

        await page.click('[data-cy="addNewContact"]');

        const textModalCardTitle = await page.textContent('[class="modal-card-title"]');

        expect(textModalCardTitle).toBe('Novo Contato');

        await page.fill('[data-cy="name"]', namelessContact.name);
        await page.fill('[data-cy="number"]', namelessContact.number);
        await page.fill('[data-cy="description"]', namelessContact.description);
        await page.click('[data-cy="saveButton"]');

        const textNameRequired = await page.textContent('.has-text-danger');

        expect(textNameRequired).toBe('Nome é obrigatório');

        await page.click('.delete');
    });

    test('Registration new contact without providing the number', async ({ page }) => {
        const textH4 = await page.textContent('h4');

        expect(textH4).toBe('Seu gerenciador digital de contatos');

        await page.click('[data-cy="addNewContact"]');

        const textModalCardTitle = await page.textContent('[class="modal-card-title"]');

        expect(textModalCardTitle).toBe('Novo Contato');

        await page.fill('[data-cy="name"]', numberlessContact.name);
        await page.fill('[data-cy="number"]', numberlessContact.number);
        await page.fill('[data-cy="description"]', numberlessContact.description);
        await page.click('[data-cy="saveButton"]');

        const textNameRequired = await page.textContent('.has-text-danger');

        expect(textNameRequired).toBe('Whatsapp é obrigatório');

        await page.click('.delete');
    });

    test('Registration new contact without providing the description', async ({ page }) => {
        const textH4 = await page.textContent('h4');

        expect(textH4).toBe('Seu gerenciador digital de contatos');

        await page.click('[data-cy="addNewContact"]');

        const textModalCardTitle = await page.textContent('[class="modal-card-title"]');

        expect(textModalCardTitle).toBe('Novo Contato');

        await page.fill('[data-cy="name"]', descriptionlessContact.name);
        await page.fill('[data-cy="number"]', descriptionlessContact.number);
        await page.fill('[data-cy="description"]', descriptionlessContact.description);
        await page.click('[data-cy="saveButton"]');

        const textNameRequired = await page.textContent('.has-text-danger');

        expect(textNameRequired).toBe('Assunto é obrigatório');

        await page.click('.delete');
    });
});

test.afterEach(async ({ page }) => {
    const cards = page.locator('.card-content');
    const count = await cards.count();
    
    if (count > 0) {
        await page.click('[data-cy="btn-remove"]');
        await page.waitForSelector('.content', { state: 'hidden' });
    } else {
        console.log('No contacts registered')
    }

    const textNoContactRegistered = await page.textContent('[class="message-body"]');

    expect(textNoContactRegistered).toBe(' Contato não encontrado :( ');
});
