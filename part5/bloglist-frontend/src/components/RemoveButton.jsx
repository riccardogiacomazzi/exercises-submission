const RemoveButton = ({ deleteBlog, blog }) => {
  return (
    <div>
      <button onClick={() => deleteBlog(blog.id)}>remove</button>
    </div>
  );
};

export default RemoveButton;
