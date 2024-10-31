Feature: Contact registration flow

    As a Zaplink user
    I need to be able to register a contact
    So that I can easily find it in the future

    Scenario: Validate registration of a new contact
        Given the user is logged into the application
        When access the contacts section and register a new contact, filling in the requested information
        Then the contact should be successfully registered
        And it should appear in the user contact list
    
    Scenario Outline: Scenario Outline name
        Given the user is logged into the application
        When access the contacts section and register a new contact, without filling in the "<contactType>"
        Then message should be displayed "<message>"
        And the contact must not be successfully registered
        And should not appear in the user contact list

        Examples:
            | contactType            | message                |
            | namelessContact        | Nome é obrigatório     |
            | numberlessContact      | Whatsapp é obrigatório |
            | descriptionlessContact | Assunto é obrigatório  |
