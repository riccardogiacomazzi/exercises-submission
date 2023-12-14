const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const initialUser = [
  {
    username: "Giovanni",
    password: "password",
    name: "Giov1_Giov",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let newUser = new User(initialUser);
  await newUser.save();
});

//TO BE CHECKED
test("login with correct username and password works", async () => {
  const userCorrect = {
    username: "Giovanni",
    password: "password",
  };

  await api.post("/api/login").send(userCorrect).set("Accept", "application/json").expect(200);
});

test("login with wrong username and password returns status(401)", async () => {
  const userWrongUsername = {
    username: "Giovanniiii",
    password: "password",
  };

  await api.post("/api/login").send(userWrongUsername).set("Accept", "application/json").expect(401);
});
