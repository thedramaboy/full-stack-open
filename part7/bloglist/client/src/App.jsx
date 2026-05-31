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
// import useNotificationStore from "./stores/notificationStore";
// import useBlogStore from "./stores/blogStore";
// import useUserStore from "./stores/userStore";
import {
  useNotificationDispatch,
  setNotification,
} from "./context/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser, useUserDispatch } from "./context/UserContext";
import { getUser, saveUser, removeUser } from "./services/persistentUser";
import useField from "./hooks/useField";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({ text: null, type: null });
  // const blogFormRef = useRef();
  const navigate = useNavigate();
  // const setNotification = useNotificationStore(
  //   (state) => state.setNotification,
  // );
  // const initializeBlogs = useBlogStore((state) => state.initializeBlogs);
  // const createBlog = useBlogStore((state) => state.addBlog);
  // const blogs = useBlogStore((state) => state.blogs);
  // const deleteBlog = useBlogStore((state) => state.deleteBlog);
  // const updateBlog = useBlogStore((state) => state.updateBlog);
  // const user = useUserStore((state) => state.user);
  // const setUser = useUserStore((state) => state.setUser);
  // const clearUser = useUserStore((state) => state.clearUser);
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const user = useUser();
  const userDispatch = useUserDispatch();
  const username = useField("text");
  const password = useField("password");

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  });

  const createBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.create(blogObject),
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setNotification(
        dispatch,
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success",
      );
    },
    onError: () => {
      setNotification(dispatch, "failed to create blog", "error");
    },
  });

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  //   initializeBlogs();
  // }, []);

  useEffect(() => {
    const loggedUserJSON = getUser();
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // setUser(user);
      userDispatch({ type: "SET", user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      saveUser(user);
      blogService.setToken(user.token);
      // setUser(user);
      userDispatch({ type: "SET", user });
      navigate("/");
      // setUsername("");
      // setPassword("");
      username.reset();
      password.reset();
    } catch {
      setNotification(dispatch, "wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    removeUser();
    // clearUser();
    userDispatch({ type: "CLEAR" });
  };

  const addBlog = async (blogObject) => {
    try {
      // const blogAdded = await blogService.create(blogObject);
      // setBlogs(blogs.concat(blogAdded));
      // const blogAdded = await createBlog(blogObject);
      // blogFormRef.current.toggleVisibility();
      // setNotification(
      //   dispatch,
      //   `a new blog ${blogAdded.title} by ${blogAdded.author} added`,
      //   "success",
      // );
      createBlogMutation.mutate(blogObject);
    } catch (error) {
      console.error("Error creating blog:", error);
      setNotification(dispatch, "failed to create blog", "error");
    }
  };

  // const updateBlog = async (id, blogObject) => {
  //   const updatedBlog = await blogService.update(id, blogObject);
  //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  // };

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const updateBlog = (id, blogObject) => {
    updateBlogMutation.mutate({ id, blogObject });
  };

  // const deleteBlog = async (id) => {
  //   await blogService.deleteBlog(id);
  //   setBlogs(blogs.filter((blog) => blog.id !== id));
  // };

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const deleteBlog = (id) => {
    deleteBlogMutation.mutate(id);
  };

  return (
    <div>
      <Notification />
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
