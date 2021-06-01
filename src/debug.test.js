describe('Make sure debug-bar loads', () => {
  it('Should display the title Debug', () => {
    cy.visit('http://localhost:3000');
    cy.get('.debug-bar-header').contains('Debug');
  });
});

describe('Load data', () => {
  it('Should load data from fixtures', () => {
    cy.visit('http://localhost:3000');
    cy.get('#debug-bar-fixture-1').click();
    cy.contains('Slide 1');
  });
});
