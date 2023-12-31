import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    });

    setNewBlog({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  };

  return (
    <div>
      <h3>Add blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label>title</label>
          <input
            id="title"
            aria-labelledby="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                title: target.value,
              }))
            }
          />
        </div>
        <div>
          <label>author</label>
          <input
            id="author"
            aria-labelledby="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                author: target.value,
              }))
            }
          />
        </div>
        <div>
          <label>url</label>
          <input
            id="url"
            aria-labelledby="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                url: target.value,
              }))
            }
          />
        </div>
        <button type="submit" id="add-blog-button">
          add blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
