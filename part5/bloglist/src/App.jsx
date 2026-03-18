import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: null, type: null });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setMessage({ text: "wrong username or password", type: "error" });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
        message={message}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const blogAdded = await blogService.create(blogObject);
      setBlogs(blogs.concat(blogAdded));
      blogFormRef.current.toggleVisibility();
      setMessage({
        text: `a new blog ${blogAdded.title} by ${blogAdded.author} added`,
        type: "success",
      });
      setTimeout(() => setMessage({ text: null, type: null }), 5000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setMessage({ text: "failed to create blog", type: "error" });
      setTimeout(() => setMessage({ text: null, type: null }), 5000);
    }
  };

  const blogDescription = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      {!user && loginForm()}
      <Notification message={message} />
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogDescription()}
        </div>
      )}
    </div>
  );
};

export default App;
