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
    cy.get("[data-cy=sidebar-link]").contains("Home");

    // get sign in button
    cy.get("[data-cy=sidebar-link]").contains("Sign In");

    // get cart button
    cy.get("[data-cy=sidebar-link]").contains("Cart");

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

    // click sign in link
    cy.get("[data-cy=sidebar-link]").contains("Sign In").click();

    // should be on sign in page now
    cy.url().should("include", "/signin");

    // sign in button should not exist
    cy.get("[data-cy=signin-submitbtn]").should("not.exist");

    // set email
    cy.get("[data-cy=input-email]").type("a@a.com");

    // set password
    cy.get("[data-cy=input-password]").type("123456");

    // sign in button should now exist
    cy.get("[data-cy=signin-submitbtn]");

    // go to create account tab
    cy.get("[data-cy=createaccount-tab]").click();

    // submit button should now say Create New Account
    cy.get("[data-cy=signin-submitbtn]").contains("Create New Account");

    // go back to sign in tab
    cy.get("[data-cy=signin-tab]").click();

    // submit button should now say Sign In
    cy.get("[data-cy=signin-submitbtn]").contains("Sign In");

    // click sign in button
    cy.get("[data-cy=signin-submitbtn]").click();

    // should not be on signin page anymore
    cy.url().should("not.include", "/signin");

    // click sidebar button
    cy.get("[data-cy=header-sidebarbtn]").click();

    // there should not be a sign in button
    cy.get("[data-cy=sidebar-link]").contains("Sign In").should("not.exist");

    // there should now be a sign out button
    cy.get("[data-cy=sidebar-link]").contains("Sign Out");

    // there should now be an account button, and click it
    cy.get("[data-cy=sidebar-link]").contains("Account").click();

    // there should be text saying who you are signed in as
    cy.contains("Signed in as a@a.com");

    // test reset password link
    cy.get("[data-cy=resetpassword-link]").click();

    // should now be on reset password page
    cy.url().should("include", "/resetpassword");

    // should be a disabled button
    cy.get("[data-cy=submit-btn]").contains("Send Reset Email").should("be.disabled");

    // go back to account page
    cy.visit("localhost:3000/account");

    // test delete account link
    cy.get("[data-cy=deleteaccount-link]").click();

    // should be on delete account page
    cy.url().should("include", "/deleteaccount");

    // click delete account button
    cy.get("[data-cy=deleteaccount-btn]").click();

    // modal should show up (background in DOM)
    cy.get("[data-cy=modal-background]");

    // click cancel button
    cy.get("[data-cy=modal-cancelbtn]").click();

    // modal should go away
    cy.get("[data-cy=modal-background]").should("not.exist");
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
    cy.contains("Wrong password for this email");
  });

  it("should show that the user is already signed in if they go back to the sign in page after signing in", () => {
    // sign in page
    cy.visit("localhost:3000/signin");

    // set email
    cy.get("[data-cy=input-email]").type("b@b.com");

    // set password
    cy.get("[data-cy=input-password]").type("123456");

    // sign in
    cy.get("[data-cy=signin-submitbtn]").click();

    // should not be on signin page anymore
    cy.url().should("not.include", "/signin");

    // visit to sign in page manually
    cy.visit("localhost:3000/signin");

    // should say you are already signed in with the email
    cy.contains("You are currently signed in as b@b.com");
  });

  it("should tell the user to sign in when they go to routes that require being signed in", () => {
    // account page
    cy.visit("localhost:3000/account");

    // should say you need to sign in
    cy.contains("You are not signed in.");

    // delete account page
    cy.visit("localhost:3000/deleteaccount");

    // should say you need to sign in
    cy.contains("You must Sign In to an account to delete it.");
  });
});
