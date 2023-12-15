const blogRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");

//GET all
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs);
});
//GET /:id
blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(400).end;
  }
});

//POST
blogRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body;
    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    console.log("user:", user);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error.message);
    next(error);
  }
});

//DELETE
blogRouter.delete("/:id", middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    const userId = blog.user;
    if (user._id.valueOf() === userId.toString()) {
      const toDelete = await Blog.findByIdAndDelete(request.params.id);
      response.status(200).json(toDelete).end();
    }
  } catch (error) {
    response.status(401).json({ error: "Token invalid" });
  }
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
