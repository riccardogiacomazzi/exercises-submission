import Togglable from "./Togglable";
import RemoveButton from "./RemoveButton";

const Blog = ({ blogs, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    display: "flex",
    flexDirection: "column",
    width: "95vw",
    paddingTop: 10,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const infoContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div>
      <h3>Blogs</h3>

      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} by {blog.author}
          </div>
          <div style={infoContainerStyle}>
            <Togglable buttonLabel="info" buttonLabelClose="hide">
              <ul>{blog.url} </ul>
              <ul>
                Likes: {blog.likes} <button onClick={() => updateBlog(blog.id)}>like</button>
              </ul>
              <ul>Added by: {blog.user.name} </ul>
              <RemoveButton deleteBlog={deleteBlog} blog={blog} user={user} />
            </Togglable>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
