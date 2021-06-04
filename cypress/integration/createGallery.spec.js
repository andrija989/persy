
const locators = require('../fixtures/locators.json')

describe('create gallery tests', () => {
    before(() => {
        cy.visit('')
        cy.get(locators.navigation.loginButton).click()
        cy.url().should('include', '/login') 
        cy.get(locators.loginPage.title).should('have.text', 'Please login')
    })

    it('login with valid credentials', () => {
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

    it('delete', () => {
        cy.get('a[href="/galleries/2049"]').click()
        cy.wait(2000)
        cy.get('button[class="btn btn-custom"]').eq(0).click()

    })
})