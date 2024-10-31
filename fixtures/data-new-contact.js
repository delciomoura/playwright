const { faker } =  require('@faker-js/faker');

const contact = {
    name: faker.person.fullName(),
    number: faker.phone.number({ style: 'international' }),
    description: faker.word.words(5)
};

const namelessContact = {
    name: "",
    number: faker.phone.number({ style: 'international' }),
    description: faker.word.words(5)
};

const numberlessContact = {
    name: faker.person.fullName(),
    number: "",
    description: faker.word.words(5)
};

const descriptionlessContact = {
    name: faker.person.fullName(),
    number: faker.phone.number({ style: 'international' }),
    description: ""
};

module.exports = { contact, namelessContact, numberlessContact, descriptionlessContact }
