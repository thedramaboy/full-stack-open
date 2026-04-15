import { useParams } from "react-router-dom";

const BlogDetails = ({ blogs, user, updateLike, deleteBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const handleLikeUpdate = () => {
    const updatedObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };
    console.log(updatedObject);
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
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes} <button onClick={handleLikeUpdate}>like</button>
      </p>
      <p>Added by {blog.user?.name}</p>
      {user && blog.user?.id === user.id && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  );
};

export default BlogDetails;
