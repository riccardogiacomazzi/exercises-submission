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

const newBlog = { title: "first blog", author: "first author", url: "www.url1.com" };

describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createUser({ username: firstUser.username, name: firstUser.name, password: firstUser.password });
    cy.createUser({ username: secondUser.username, name: secondUser.name, password: secondUser.password });
    cy.visit("http://localhost:5173/");
  });

  it("displays Login Form as default", function () {
    cy.contains("Log in to Blog App");
  });

  describe("Login", function () {
    it("Succesfully works with correct credentials", function () {
      cy.loginUI({ username: firstUser.username, password: firstUser.password });
      cy.contains("Logged in as");
    });
    it("Doesn't work with wrong credentials", function () {
      cy.loginUI({ username: "wrong_username", password: "wrong_password" });
      cy.contains("Log in to Blog App");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: firstUser.username, password: firstUser.password });
    });
    it("an user can create a new blog", function () {
      cy.get("#togglable-button").click();
      cy.createBlog({ title: newBlog.title, author: newBlog.author, url: newBlog.url });
      cy.contains(`${newBlog.title} by ${newBlog.author}`);
    });
  });

  describe("When a blog is created", function () {
    beforeEach(function () {
      cy.login({ username: firstUser.username, password: firstUser.password });
      cy.get("#togglable-button").click();
      cy.createBlog({ title: newBlog.title, author: newBlog.author, url: newBlog.url });
    });

    it("users can like a blog", function () {
      cy.get('button:contains("info")').click();
      cy.contains("Likes: 0");
      cy.get("#like-button").click();
      cy.contains("Likes: 1");
    });

    it("the users who created the entry, can delete it", function () {
      cy.contains(`${newBlog.title} by ${newBlog.author}`);
      cy.get('button:contains("info")').click();
      cy.get("#remove-button").click();
      cy.should("not.contain", `${newBlog.title} by ${newBlog.author}`);
    });

    it("another user can't delete it", function () {
      cy.get("#logout-button").click();
      cy.loginUI({ username: secondUser.username, password: secondUser.password });
      cy.get('button:contains("info")').click();
      cy.get("#remove-button").should("not.exist");
    });
  });
});
