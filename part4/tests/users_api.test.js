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
      username: "Salamander",
      password: "segugio",
      name: "Serio Serjo",
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

describe("User validation in POST requests:", () => {
  test("Username is a required field", async () => {
    const userNoUsername = {
      password: "123-456",
      name: "Antonio Fosso",
    };

    await api.post("/api/users").send(userNoUsername).set("Accept", "application/json").expect(400);
  });

  test("Password is a required field", async () => {
    const userNoPassword = {
      username: "abcabc",
      name: "Fosso Andonio",
    };

    await api.post("/api/users").send(userNoPassword).set("Accept", "application/json").expect(400);
  });

  test("Username and password must be at least 3 carachters long", async () => {
    const shortUsername = {
      username: "12",
      password: "123-456",
      name: "Anfo Dosso",
    };
    const shortPassword = {
      username: "123-546",
      password: "12",
      name: "Anfo Dosso",
    };

    await api.post("/api/users").send(shortUsername).set("Accept", "application/json").expect(400);
    await api.post("/api/users").send(shortPassword).set("Accept", "application/json").expect(400);
  });

  test("Username must be unique", async () => {
    const newUser = {
      username: "Longerthan3",
      password: "Longerthan3",
      name: "Anfo Frosso",
    };
    const newUserTwo = {
      username: "Longerthan3",
      password: "Different",
      name: "Luigi Biaco",
    };

    await api.post("/api/users").send(newUser).set("Accept", "application/json").expect(201);
    await api.post("/api/users").send(newUserTwo).set("Accept", "application/json").expect(400);
  });
});
