/// <reference types="Cypress" />

import { authLogin } from '../pageObjects/loginPage.js'
import { navigation } from '../pageObjects/navigation.js'
import { createGallery } from '../pageObjects/createGallery.js'
import { allGalleries } from '../pageObjects/allGallerys.js'
import { editGallery } from '../pageObjects/editGallery.js'

const data = require('../fixtures/data.json')

describe('login case', () => {
    before(() => {
        cy.visit('')
        authLogin.clickLoginButton()
    })

    it('login with valid credentials', () => {
        // cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', (req) => {
        // }).as('validLoginNew')
        authLogin.login('andrija12345@gmail.com', 'sifra123')
        cy.percySnapshot();
        // cy.wait('@validLoginNew').then((intercept) => {
        //     // cy.log(JSON.stringify(intercept.response.statusCode))
        //     expect(intercept.response.statusCode).to.eql(200)
        // })
    })

    let galleryID = ''
    it('create gallery', () => {
        cy.wait(2000)
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries', (req) => {}).as('createGallery')
        navigation.clickCreateGallery()
        createGallery.createGalleryForm()
        cy.percySnapshot();
        cy.wait('@createGallery').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(201)
            galleryID = intercept.response.body.id
        })
    })

    it('find created gallery', () => {
        allGalleries.singleGalleryClick(galleryID)
        cy.url().should('include', `${galleryID}`)
        cy.percySnapshot();
        editGallery.galleryTitle.should('have.text', data.galleryData.title.toLowerCase())
        // editGallery.galleryDescription.should('have.text', '\n Opis opis\n')
        editGallery.galleryImage.should('be.visible')
    })

    let commentID = ''
    it('create comment', () => {
        cy.intercept("POST", "https://gallery-api.vivifyideas.com/api/comments", (req) =>{}).as('createComment')
        editGallery.enterComment()
        editGallery.createdCommentText.eq(0).should('have.text', data.comment)
        cy.wait('@createComment').then((intercept) => {
            commentID = intercept.response.body[0].id
            expect(intercept.response.statusCode).to.eql(200)
        })
        cy.percySnapshot();
    })

    it('delete comment', () => {
        cy.wait(3000)
        cy.log(commentID)
        cy.intercept("DELETE", `https://gallery-api.vivifyideas.com/api/comments/${commentID}`, (req) => {}).as('deleteComment')
        editGallery.deleteComment()
        cy.wait('@deleteComment').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(200)
        })
        editGallery.deleteCommentBtn.should('not.exist')
        editGallery.createdCommentText.should('not.exist')
        cy.percySnapshot();
    })

    it('delete gallery', () => {
        cy.intercept("DELETE", `https://gallery-api.vivifyideas.com/api/galleries/${galleryID}`, (req) => {
        }).as('deleteGallery')
        editGallery.clickDeleteGallery()
        cy.wait('@deleteGallery').then((intercept) => {
            expect(intercept.response.statusCode).to.eql(200)
        })
        cy.percySnapshot();
    })
})