import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import Togglable from "./Togglable";

const userLogged = {
  username: "admin",
  name: "Riccardo Giacomaziz",
  id: "6581b11dad414436adf04a38",
};

const blogs = [
  {
    title: "Test blog title is rendered",
    author: "Tester author",
    url: "www.test.com",
    likes: 0,
    user: {
      username: "admin",
      name: "admino",
      id: "6581b11dad414436adf04a38",
    },
    id: "6585c7fbd17394973f7a0485",
  },
];

const mockLike = jest.fn();

describe("<Blog />:", () => {
  test("Title and Author are correctly rendered", () => {
    const { container } = render(<Blog blogs={blogs} user={userLogged} />);

    const div = container.querySelector(".blogTitle");
    expect(div).toHaveTextContent("Test blog title is rendered by Tester author");
  });
});

describe("<Togglable />:", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="info">
        <div className="testDiv">
          <p>togglable content is shown</p>
        </div>
      </Togglable>
    ).container;
  });

  test("URL and Likes are shown when the info button has been clicked", async () => {
    const blog = blog;

    const user = userEvent.setup();
    const button = screen.getByText("info");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveTextContent("togglable content is shown");
  });

  test("If Like is pressed twice, it is received twice", async () => {
    const blog = blogs;

    render(
      <Togglable buttonLabel="info" buttonLabelClose="hide">
        <ul>{blog.url}</ul>
        <ul>
          Likes: {blog.likes} <button onClick={() => mockLike(blog.id)}>like</button>
        </ul>
      </Togglable>
    );

    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
