describe("Blog app", () => {
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
});
