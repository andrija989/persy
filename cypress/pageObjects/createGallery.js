const data = require('../fixtures/data.json')

class CreateGallery {
    get titleInput() {
        return cy.get('input[id="title"]')
    }

    get descriptionInput() {
        return cy.get('input[id="description"]')
    }

    get urlInput() {
        return cy.get('input[type="url"]')
    }

    get addNewImageBtn() {
        return cy.get('form div:nth-of-type(3) > [type]')
    }

    get submitBtn() {
        return cy.get('form > button:nth-of-type(1)')
    }

    createGalleryForm() {
        this.titleInput.type(data.galleryData.title)
        this.descriptionInput.type(data.galleryData.description)
        this.urlInput.type(data.galleryData.url)
        this.addNewImageBtn.click()
        this.urlInput.eq(1).type(data.galleryData.url)
        this.submitBtn.click()
    }
}

export const createGallery = new CreateGallery()