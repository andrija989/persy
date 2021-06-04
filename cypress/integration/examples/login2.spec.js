/// <reference types="Cypress" />

import { authLogin } from '../../pageObjects/loginPage.js'

describe('login case', () => {
    beforeEach(() => {
        cy.visit('')
        authLogin.clickLoginButton()
    })

    it('login with valid credentials', () => {
        authLogin.login('andrija123@gmail.com', 'sifra123')
    })
})