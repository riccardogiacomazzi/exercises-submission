const BlogForm = ({ handleBlog, newBlog, setNewBlog }) => {
  return (
    <div>
      <h3>Add blog</h3>
      <form onSubmit={handleBlog}>
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
