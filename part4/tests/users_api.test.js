const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/users");
const helper = require("../tests/test_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "cane",
      passwordHash,
    });
    await user.save();
  });

  test("a new user gets sucesfully created", async () => {
    const userAtStart = await helper.usersInDb();

    newUser = {
      username: "gegiu",
      password: "segugio",
      name: "Gesu al Sugo",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(userAtStart.length + 1);
  });
});
