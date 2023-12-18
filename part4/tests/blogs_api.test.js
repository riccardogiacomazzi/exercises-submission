const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUser = {
  username: "Utente1",
  password: "segreto",
  name: "Utente_test1",
};

const userLogin = { username: "Utente1", password: "segreto" };

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(initialBlogs[1]);
  await newBlog.save();

  await User.deleteMany({});
  await api.post("/api/users").send(initialUser).set("Accept", "application/json");
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
  const authorization = await api.post("/api/login").send(userLogin).set("Accept", "application/json");

  const addBlog = {
    title: "Breaking Good",
    author: "Accendi Unlume",
    url: "www.ggww.com",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .auth(authorization.body.token, { type: "bearer" })
    .send(addBlog)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length + 1);
});

test("POST with empty likes returns them as 0 ", async () => {
  const authorization = await api.post("/api/login").send(userLogin).set("Accept", "application/json");

  const addBlogNoLikes = {
    title: "Breaking Good",
    author: "Accendi Unlume",
    url: "www.ggww.com",
  };

  await api
    .post("/api/blogs")
    .auth(authorization.body.token, { type: "bearer" })
    .send(addBlogNoLikes)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body[2].likes).toBe(0);
});

test("Title and url are required. If missing status is 400", async () => {
  const authorization = await api.post("/api/login").send(userLogin).set("Accept", "application/json");

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

  await api
    .post("/api/blogs")
    .auth(authorization.body.token, { type: "bearer" })
    .send(addBlogNoTitle)
    .set("Accept", "application/json")
    .expect(400);
  await api
    .post("/api/blogs")
    .auth(authorization.body.token, { type: "bearer" })
    .send(addBlogNoUrl)
    .set("Accept", "application/json")
    .expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(2);
});

test("DELETE to /api/blogs/:id works properly", async () => {
  const addBlog = {
    title: "Breaking Good",
    author: "Accendi Unlume",
    url: "www.ggww.com",
    likes: 2,
  };

  const authorization = await api.post("/api/login").send(userLogin).set("Accept", "application/json");

  await api.post("/api/blogs").auth(authorization.body.token, { type: "bearer" }).send(addBlog);

  const response = await api.get("/api/blogs");
  const idToDelete = response.body[2].id;
  await api.delete(`/api/blogs/${idToDelete}`).auth(authorization.body.token, { type: "bearer" }).expect(200);
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
