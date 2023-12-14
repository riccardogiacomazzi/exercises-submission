const blogRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const { request, response } = require("../app");

//GET
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(400).end;
  }
});

//POST
blogRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const user = body.userId ? await User.findById(body.userId) : await User.findOne({});

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error.message);
    next(error);
  }
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
