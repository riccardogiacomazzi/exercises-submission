const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("../utils/test_helper");

test("GET to /api/blogs returns blogs as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("GET to /api/blogs return correct blogs number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(4);
});
