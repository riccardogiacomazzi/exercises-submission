const blogRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      response.status(400).json(error.message);
      next(error);
    });
});

module.exports = blogRouter;
