import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import BlogDetails from "./components/BlogDetails";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: null, type: null });
  const blogFormRef = useRef();
  const navigate = useNavigate();

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
      navigate("/");
      setUsername("");
      setPassword("");
    } catch {
      setMessage({ text: "wrong username or password", type: "error" });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    }
  };

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
      <Notification message={message} />
      <div>
        <div>
          <Link style={{ padding: 10 }} to="/">
            blogs
          </Link>
          {!user ? (
            <Link to="/login">login</Link>
          ) : (
            <span>
              <Link style={{ padding: 10 }} to={"/newBlog"}>
                new blog
              </Link>
              <button onClick={handleLogout}>logout</button>
            </span>
          )}
        </div>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  blogs={blogs}
                  user={user}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  handleLogin={handleLogin}
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                />
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetails
                  blogs={blogs}
                  user={user}
                  updateLike={updateBlog}
                  deleteBlog={deleteBlog}
                />
              }
            />
            <Route
              path="/newBlog"
              element={<BlogForm createBlog={addBlog} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;

const NotFound = () => (
  <div>
    <h2>404 - Page not found</h2>
    <p>the page you are looking for does not exist.</p>
    <Link to="/">go back to home</Link>
  </div>
);
