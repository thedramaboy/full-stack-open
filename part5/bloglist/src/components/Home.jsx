import Blog from "./Blog";

const Home = ({ blogs, user, updateBlog, deleteBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLike={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default Home;
