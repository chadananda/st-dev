// End-to-end smoke test. Run with `npm run test:e2e` (needs cypress installed).
//
// This file used to assert the Sapper starter template's content -- an <h1> reading
// "Great success!" and a /blog nav link -- neither of which this site has ever had. It
// could only ever fail, which is why it was worth replacing rather than deleting: a test
// that asserts the wrong thing is indistinguishable from no test at all.

describe('sacred-traditions.org', () => {
  it('renders the home page', () => {
    cy.visit('/');
    cy.get('h1').should('exist');
    cy.title().should('include', 'Sacred Traditions');
  });

  it('serves the head metadata search engines need', () => {
    cy.visit('/');
    cy.get('head link[rel="canonical"]').should('exist');
    cy.get('head meta[property="og:title"]').should('exist');
    cy.get('head script[type="application/ld+json"]').should('exist');
  });

  it('navigates to /about', () => {
    cy.visit('/');
    cy.get('nav a[href="about"], nav a[href="/about"]').first().click();
    cy.url().should('include', '/about');
  });

  it('reaches the Ocean reader page', () => {
    cy.visit('/ocean');
    cy.title().should('include', 'sacred-traditions.org');
  });
});
