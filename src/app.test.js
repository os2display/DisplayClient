describe('Simple app loads', () => {
  it('localhost and simple text', () => {
    cy.visit('http://localhost:3000');
    cy.get('.App').should('be.empty');
  });
});
