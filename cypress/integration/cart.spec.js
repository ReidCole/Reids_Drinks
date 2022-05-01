describe("Mobile screen tests", () => {
  beforeEach(() => {
    // set viewport to mobile screen dimensions
    cy.viewport(400, 900);

    // clear cart data
    cy.clearLocalStorage();
  });

  it("should add an item to the cart");
  it("should add multiple items of differing quantities to the cart");
});
