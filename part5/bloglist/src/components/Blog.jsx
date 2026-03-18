import { useState } from "react";

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    return setVisible(!visible);
  };

  const handleLikeUpdate = () => {
    const updatedObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };

    updateLike(blog.id, updatedObject);
  };

  const handleDelete = () => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (result) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={handleToggle}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLikeUpdate}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          <button onClick={handleDelete}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
