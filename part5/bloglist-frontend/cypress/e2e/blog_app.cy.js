describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const initUser = {
      username: "riccar_dog",
      name: "Riccardo G",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users", initUser);
    cy.visit("http://localhost:5173/");
  });

  it("displays Login Form as default", function () {
    cy.contains("Log in to Blog App");
  });

  describe("Login", function () {
    it("Succesfully works with correct credentials", function () {
      cy.get("#username").type("riccar_dog");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("Logged in as");
    });
    it("Doesn't work with wrong credentials", function () {
      cy.get("#username").type("wrong_username");
      cy.get("#password").type("wrong_password");
      cy.get("#login-button").click();
      cy.contains("Log in to Blog App");
    });
  });
});
