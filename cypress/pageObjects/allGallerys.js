class AllGalleries {
    singleGalleryClick(id) {
        cy.get(`a[href="/galleries/${id}"]`).click()
    }
}

export const allGalleries = new AllGalleries()