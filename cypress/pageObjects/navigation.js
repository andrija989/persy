class Navigation {
    get createGalleryBtn() {
        return cy.get('a[href="/create"]')
    }

    clickCreateGallery() {
        this.createGalleryBtn.click()
    }
}

export const navigation = new Navigation()