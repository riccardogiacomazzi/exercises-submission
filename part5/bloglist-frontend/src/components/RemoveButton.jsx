const RemoveButton = ({ deleteBlog, blog, user }) => {
  // remove button only available if :
  if (blog.user.id === user.id) {
    return (
      <div>
        <button onClick={() => deleteBlog(blog.id)} id="remove-button">
          remove
        </button>
      </div>
    );
  }
};

export default RemoveButton;
