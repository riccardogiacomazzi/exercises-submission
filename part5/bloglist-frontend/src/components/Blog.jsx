import Togglable from "./Togglable";

const Blog = ({ blogs, updateBlog }) => {
  const blogStyle = {
    width: "100%",
    paddingTop: 10,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h3>Blogs</h3>

      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} by {blog.author}
          </div>
          <div>
            <Togglable buttonLabel="info" buttonLabelClose="hide">
              <ul>{blog.url} </ul>
              <ul>
                Likes: {blog.likes} <button onClick={() => updateBlog(blog.id)}>like</button>
              </ul>
              <ul>added by: {blog.user.name} </ul>
            </Togglable>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
