const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "EuropeanDance",
    author: "Boa Ragno",
    url: "www.tektonik.com",
    likes: 0,
  },
  {
    title: "MortiDiFame",
    author: "Giustiziere Maskerato",
    url: "www.maledettiiiiii.com",
    likes: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(initialBlogs[1]);
  await newBlog.save();
});

test("GET to /api/blogs returns blogs as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("GET to /api/blogs return correct blogs number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test("POST to /api/blogs create a new entry", async () => {
  const addBlog = {
    title: "Breaking Good",
    author: "Accendi Unlume",
    url: "www.ggww.com",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .send(addBlog)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(3);
});

test("POST with empty likes returns them as 0 ", async () => {
  const addBlogNoLikes = {
    title: "Breaking Good",
    author: "Accendi Unlume",
    url: "www.ggww.com",
  };

  await api
    .post("/api/blogs")
    .send(addBlogNoLikes)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body[2].likes).toBe(0);
});

test("Title and url are required. If missing status is 400", async () => {
  const addBlogNoTitle = {
    author: "Accendi Unlume",
    url: "www.ggww.com",
    likes: 4,
  };

  const addBlogNoUrl = {
    author: "Accendi Unlume",
    title: "Gigante Wonder",
    likes: 4,
  };

  await api.post("/api/blogs").send(addBlogNoTitle).set("Accept", "application/json").expect(400);
  await api.post("/api/blogs").send(addBlogNoUrl).set("Accept", "application/json").expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(2);
});

test("DELETE to /api/blogs/:id works properly", async () => {
  const response = await api.get("/api/blogs");
  const idToDelete = response.body[1].id;
  await api.delete(`/api/blogs/${idToDelete}`).expect(200);
});

test("PUT to /api/blogs/:id works properly", async () => {
  const response = await api.get("/api/blogs");
  const idToUpdate = response.body[1].id;

  const blogUpdate = {
    title: response.body[1].title,
    author: response.body[1].author,
    url: response.body[1].url,
    likes: 333,
    id: response.body[1].id,
  };

  await api.put(`/api/blogs/${idToUpdate}`).send(blogUpdate).expect(200);
  const updatedResponse = await api.get(`/api/blogs/${idToUpdate}`);
  expect(updatedResponse.body.likes).toBe(333);
});
