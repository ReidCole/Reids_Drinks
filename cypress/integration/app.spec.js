describe("Mobile screen tests", () => {
  beforeEach(() => {
    // set viewport to mobile screen dimensions
    cy.viewport(400, 900);

    // clear firebase auth data
    cy.window().then((win) => {
      win.indexedDB.deleteDatabase("firebaseLocalStorageDb");
    });
  });

  it("should show the sidebar when clicking the sidebar button", () => {
    // home page
    cy.visit("localhost:3000");

    // click sidebar button
    cy.get("[data-cy=header-sidebarbtn]").click();

    // sidebar background should show up
    cy.get("[data-cy=sidebar-background]");

    // get home button
    cy.get("[data-cy=sidebar-btn]").contains("Home");

    // get sign in button
    cy.get("[data-cy=sidebar-btn]").contains("Sign In");

    // get cart button
    cy.get("[data-cy=sidebar-btn]").contains("Cart");

    // click back button to close sidebar
    cy.get("[data-cy=sidebar-backbtn]").click();

    // sidebar background should be gone
    cy.get("[data-cy=sidebar-background]").should("not.exist");
  });

  it("should sign in the user when they sign in", () => {
    // home page
    cy.visit("localhost:3000");

    // click sidebar button
    cy.get("[data-cy=header-sidebarbtn]").click();

    // click sign in button
    cy.get("[data-cy=sidebar-btn]").contains("Sign In").click();

    // should be on sign in page now
    cy.url().should("include", "/signin");

    // set email
    cy.get("[data-cy=input-email]").type("a@a.com");

    // set password
    cy.get("[data-cy=input-password]").type("123456");

    // sign in
    cy.get("[data-cy=signin-submitbtn]").click();

    // should not be on signin page anymore
    cy.url().should("not.include", "/signin");

    // click sidebar button
    cy.get("[data-cy=header-sidebarbtn]").click();

    // there should not be a sign in button
    cy.get("[data-cy=sidebar-btn]").contains("Sign In").should("not.exist");

    // there should now be an account button
    cy.get("[data-cy=sidebar-btn]").contains("Account");

    // there should now be a sign out button
    cy.get("[data-cy=sidebar-btn]").contains("Sign Out");
  });

  it("should show error when the user types in the wrong password on signin screen", () => {
    // sign in page
    cy.visit("localhost:3000/signin");

    // set email
    cy.get("[data-cy=input-email]").type("a@a.com");

    // set password
    cy.get("[data-cy=input-password]").type("12345");

    // sign in
    cy.get("[data-cy=signin-submitbtn]").click();

    // wrong password error should show up
    cy.get("[data-cy=error-msg]").contains("Wrong password for this email");
  });

  it("should show that the user is already signed in if they go back to the signin page after signing in", () => {});
});

describe("Desktop screen tests", () => {
  // it("desktop - should show the header on the home page", () => {
  //   // set viewport to desktop screen dimensions
  //   cy.viewport(1000, 720);
  //   // get site logo
  //   cy.get("[data-cy=header-logo]");
  //   // get search bar
  //   cy.get("[data-cy=header-searchbar]");
  //   // get cart button
  //   cy.get("[data-cy=header-cartbtn]");
  //   // get account button
  //   cy.get("[data-cy=header-accountbtn]");
  // });
});
