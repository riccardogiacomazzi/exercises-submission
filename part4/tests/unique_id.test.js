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
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(initialBlogs[1]);
  await newBlog.save();
});

test("A blog unique id is present", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[1].id).toBeDefined();
});
