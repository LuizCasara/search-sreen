/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('valid all search screen', () => {
    before(() => {
        cy.visit('http://localhost:3000')
        cy.wait(2000)
    })

    beforeEach(() => {
        cy.wait(500)
    })

    it('Should exist button load data', () => {
        cy.get('#btn-load-data')
            .should('exist')
    })

    it('Should exist button clear data', () => {
        cy.get('#btn-clear-data')
            .should('exist')
    })

    it('Should not exist table yet', () => {
        cy.get('#table-data')
            .should('not.exist')
    })

    it('Click on load button', () => {
        cy.get('#btn-load-data')
            .click()
    })

    it('Should load data in data table', () => {
        cy.get('#table-data')
            .should('exist')
    })

    it('Should contains all header labels', () => {
        const tableHeader = [
            "Avatar",
            "Login",
            "Name",
            "Email",
            "Company",
            "Type",
            "Admin",
            "Followers",
            "Following",
            "Repositories",
            "Created At",
            "Url",
        ]

        tableHeader.forEach(item => {
            cy.contains(item);
        })
    })

    it('Should be possible scroll in the screen', () => {
        cy.scrollTo('bottom', {duration: 1000})
        cy.scrollTo('top', {duration: 2000})
        cy.scrollTo('bottom', { easing: 'linear', duration: 2000 })
        cy.scrollTo('top', {duration: 1000})        
    })

    it('Should be visible a input to filter data', () => {
        cy.get('#input-filter')
            .should('exist')
    })

    it('Should be possible filter data table data', () => {
        cy.get('#input-filter')
            .clear()
            .type('mojo')

        cy.get('#table-data > .table > tbody').should(($lis) => {
            expect($lis).to.have.length(2)
        })
    })

    it('Should be possible filter data in CaseSensitive', () => {
        cy.get('#input-filter')
            .clear()
            .type('Defunkt')

        cy.get('#table-data > .table > tbody').should(($lis) => {
            expect($lis).to.have.length(1)
        })
    })

})
