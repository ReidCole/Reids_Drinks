beforeEach(() => {
  // set viewport to mobile screen dimensions
  cy.viewport(400, 800);
});

it("should show search results with links when searching for a drink", () => {
  // visit home
  cy.visit("localhost:3000/");

  // get search bar and type someting
  cy.get("[data-cy=header-searchbar]").type("ee");

  // get results
  cy.get("[data-cy=searchbar-link]").contains("Sweet Tea");
  cy.get("[data-cy=searchbar-link]").contains("Coffee");
  cy.get("[data-cy=searchbar-link]").contains("Green Tea");
  cy.get("[data-cy=searchbar-link]").contains("Beer");

  // click a result link
  cy.get("[data-cy=searchbar-link]").contains("Green Tea").click();

  // expect to be on page
  cy.url().should("include", "product");
  cy.wait(1000);
  cy.contains("Green Tea");
});
