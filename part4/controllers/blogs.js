const blogRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const { request, response } = require("../app");

//GET
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  });
});

//POST
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

//DELETE
blogRouter.delete("/:id", async (request, response) => {
  const toDelete = await Blog.findByIdAndDelete(request.params.id);
  response.status(200).json(toDelete).end();
});

//PUT
blogRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, {
    title: request.body.title,
    author: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  });

  const blogUpdated = await Blog.findById(request.params.id);
  response.status(200).json(blogUpdated).end();
});

module.exports = blogRouter;
