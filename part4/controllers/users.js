const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

//GET
userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, id: 1 });
  response.json(users);
});

//POST
userRouter.post("/", async (request, response) => {
  try {
    const { username, password, name } = request.body;
    if (request.body.password === undefined || request.body.username === undefined) {
      response.status(400).json({ error: "username or password missing" });
    } else if (request.body.password.length < 3 || request.body.username.length < 3) {
      response.status(400).json({ error: "username and password must be at least 3 carachters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

module.exports = userRouter;
