/// <reference types="Cypress" />

const locators = require("../../fixtures/locators.json")
const faker = require('faker');

let userData = {
    randomName: faker.name.findName(),
    randomLastName : faker.name.lastName(),
    randomEmail : faker.internet.email(),
    randomPassword : faker.internet.password()
}

describe('login case', () => {
    beforeEach(() => {
        cy.visit('')
        cy.get(locators.navigation.loginButton).click()
        cy.url().should('include', '/login') 
        cy.get(locators.loginPage.title).should('have.text', 'Please login')
    })

    it('negative case login / bad email', () => {
        cy.get(locators.loginPage.email).type(faker.internet.email())
        cy.get(locators.loginPage.password).type(faker.internet.password())
        cy.get(locators.loginPage.submitBtn).click()
        cy.get(locators.loginPage.validationError).should('be.visible')
        cy.get(locators.loginPage.validationError).should('have.text', 'Bad Credentials')
        cy.get(locators.loginPage.validationError).should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })

    it('negative case login / bad password', () => {
        cy.get(locators.loginPage.email).type(userData.randomEmail)
        cy.get(locators.loginPage.password).type('12345f')
        cy.get(locators.loginPage.submitBtn).click()
    })

    it.only('login with valid credentials', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {
        }).as('validLogin')
        cy.get(locators.loginPage.email).type('andrija123@gmail.com')
        cy.get(locators.loginPage.password).type('sifra123')
        cy.get(locators.loginPage.submitBtn).click()
        cy.wait('@validLogin').then((intercept) => {
            // cy.log(JSON.stringify(intercept.response.statusCode))
            expect(intercept.response.statusCode).to.eql(200)
        })
    })
})