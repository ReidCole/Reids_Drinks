describe("First test", () => {
  it("should show the heading", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Heading");
  });
});

describe("Navigation tests", () => {
  it("should navigate to the cart page when clicking the cart button", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy=cart-link]").click();

    cy.url().should("include", "/cart");

    cy.contains("Cart");
  });
});
