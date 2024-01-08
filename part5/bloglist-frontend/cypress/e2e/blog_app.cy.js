import { func } from "prop-types";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const firstUser = {
      username: "riccar_dog",
      name: "Riccardo G",
      password: "password",
    };

    const secondUser = {
      username: "alfons_o",
      name: "Alfonso Radura",
      password: "password",
    };

    cy.request("POST", "http://localhost:3001/api/users", firstUser);
    cy.request("POST", "http://localhost:3001/api/users", secondUser);

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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("riccar_dog");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
    });
    it("an user can create a new blog", function () {
      cy.get("#togglable-button").click();
      cy.get("#title").type("test_blog title");
      cy.get("#author").type("test_blog author");
      cy.get("#url").type("test_blog url");
      cy.get("#add-blog-button").click();
      cy.contains("test_blog title by test_blog author");
    });
  });

  describe("When a blog is created", function () {
    beforeEach(function () {
      cy.get("#username").type("riccar_dog");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.get("#togglable-button").click();
      cy.get("#title").type("test_blog title");
      cy.get("#author").type("test_blog author");
      cy.get("#url").type("test_blog url");
      cy.get("#add-blog-button").click();
    });

    it("users can like a blog", function () {
      cy.get('button:contains("info")').click();
      cy.contains("Likes: 0");
      cy.get("#like-button").click();
      cy.contains("Likes: 1");
    });

    it.only("the users who created the entry, can delete it", function () {
      cy.contains("test_blog title by test_blog author");
      cy.get('button:contains("info")').click();
      cy.get("#remove-button").click();
      cy.should("not.contain", "test_blog title by test_blog author");
    });
  });
});
