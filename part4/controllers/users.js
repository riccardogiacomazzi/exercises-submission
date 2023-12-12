const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/users");
const middleware = require("../utils/middleware");

//GET
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

//POST
userRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
