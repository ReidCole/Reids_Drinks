describe("Mobile screen tests", () => {
  beforeEach(() => {
    // set viewport to mobile screen dimensions
    cy.viewport(400, 900);

    // clear cart data
    cy.clearLocalStorage();
  });

  it("should add items to the cart and be able to delete them", () => {
    const item1Name = "Sweet Tea";

    // home page
    cy.visit("localhost:3000");

    // go to item 1 page
    cy.get("[data-cy=scrollableproductlist-link]").contains(item1Name).first().click();

    // test buy now button
    cy.contains("Buy Now").click();

    // modal should pop up
    cy.get("[data-cy=modal-background]").should("exist");

    // click off modal
    cy.get("[data-cy=button]").contains("How rude...").click();

    // modal should be gone
    cy.get("[data-cy=modal-background]").should("not.exist");

    // add it to the cart
    cy.contains("Add To Cart").click();

    // should show notification that it was added to the cart
    cy.contains(`Added 1 ${item1Name} to your cart`);

    // go to cart
    cy.visit("localhost:3000/cart");

    // find item 1 in cart
    cy.get("[data-cy=cart-item]")
      .contains(item1Name)
      .siblings("[data-cy=item-quantity]")
      .contains("1");

    // go back to home page
    cy.visit("localhost:3000/");

    // add other drinks of different quantities
    const item2Name = "Orange Juice";
    const item2Quantity = 3;
    const item3Name = "Coffee";
    const item3Quantity = 8;

    // go to item 2
    cy.get("[data-cy=scrollableproductlist-link]").contains(item2Name).first().click();

    // set quantity
    for (let n = 0; n < item2Quantity - 1; n++) {
      cy.get("[data-cy=quantity-plusbtn").click();
    }

    // add it to the cart
    cy.contains("Add To Cart").click();

    // go back to home page
    cy.visit("localhost:3000/");

    // go to item 3
    cy.get("[data-cy=scrollableproductlist-link]").contains(item3Name).first().click();

    // set quantity
    for (let n = 0; n < item3Quantity - 1; n++) {
      cy.get("[data-cy=quantity-plusbtn").click();
    }

    // add it to the cart
    cy.contains("Add To Cart").click();

    // go to cart
    cy.visit("localhost:3000/cart");

    // check for items and proper values
    cy.get("[data-cy=cart-item]")
      .contains(item2Name)
      .siblings("[data-cy=item-quantity]")
      .contains(item2Quantity);
    cy.get("[data-cy=cart-item]")
      .contains(item3Name)
      .siblings("[data-cy=item-quantity]")
      .contains(item3Quantity);

    // delete item 2
    cy.get("[data-cy=cart-item]")
      .contains(item2Name)
      .siblings("[data-cy=cart-itemdeletebtn]")
      .click();

    // item 2 should be gone
    cy.get("[data-cy=cart-item]").contains(item2Name).should("not.exist");
  });
});
