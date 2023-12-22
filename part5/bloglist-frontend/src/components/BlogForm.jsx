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
          title
          <input
            type="text"
            value={newBlog.title}
            name="blog name"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                title: target.value,
              }))
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="blog name"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                author: target.value,
              }))
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="blog name"
            onChange={({ target }) =>
              setNewBlog((prevBlog) => ({
                ...prevBlog,
                url: target.value,
              }))
            }
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
