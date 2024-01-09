// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", "http://localhost:3001/api/testing/reset");
});

Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3001/api/users", { username, name, password });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("loginUI", ({ username, password }) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#url").type(url);
  cy.get("#add-blog-button").click();
});
