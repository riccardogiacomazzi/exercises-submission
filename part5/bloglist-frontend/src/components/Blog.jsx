const Blog = ({ blogs }) => {
  return (
    <div>
      <h3>Blogs</h3>
      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} - {blog.author}
        </p>
      ))}
    </div>
  );
};

export default Blog;
