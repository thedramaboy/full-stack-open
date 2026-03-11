import { useState } from "react";

const Blog = ({ blog, updateLike }) => {
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

  return (
    <div style={blogStyle}>
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
        </div>
      )}
    </div>
  );
};

export default Blog;
