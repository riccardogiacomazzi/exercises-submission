describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
  });

  it("passes", () => {});
});
