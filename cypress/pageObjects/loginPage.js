class AuthLogin {
    get email() {
        return cy.get('input[id="email"]')
    }
    get password() {
        return cy.get('input[id="password"]')
    }
    get submitBtn() {
        return cy.get('button[type="submit"]')
    }
    get loginButton() {
        return cy.get('a[href="/login"]')
    }

    clickLoginButton() {
        this.loginButton.click()
    }

    login(email, password) {
        this.email.type(email)
        this.password.type(password)
        this.submitBtn.click()
    }
}

export const authLogin = new AuthLogin()