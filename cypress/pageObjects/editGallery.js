const data = require('../fixtures/data.json')

class EditGallery {
    get editGalleryBtn() {
        return cy.get('a[type="button"]')
    }

    get deleteGalleryBtn() {
        return cy.get(':nth-child(5) > button.btn')
    }

    get galleryTitle() {
        return cy.get('h1')
    }

    get galleryDescription() {
        return cy.get('p')
    }

    get galleryImage() {
        return cy.get(`img[src="${data.galleryData.url}"]`)
    }

    get commentInput() {
        return cy.get('textarea')
    }

    get submitCommentBtn() {
        return cy.get('form > .btn.btn-custom')
    }

    get createdCommentText() {
        return cy.get('ul > li > p')
    }

    get deleteCommentBtn() {
        return cy.get('i[class="fas fa-trash"]')
    }

    clickEditGallery() {
        this.editGalleryBtn.click({force:true})
    }

    clickDeleteGallery() {
        this.deleteGalleryBtn.click()
    }

    enterComment() {
        this.commentInput.type(data.comment)
        this.submitCommentBtn.click()
    }

    deleteComment() {
        this.deleteCommentBtn.click()
    }
}

export const editGallery = new EditGallery()