import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    style: "",
  });

  const blogFormRef = useRef();

  //GET all blogs from server
  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    getBlogs();
  }, []);

  //Checks if the user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const login = async (loginObject) => {
    try {
      const loggedUser = await loginService.loginRequest(loginObject);
      setUser(loggedUser);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } catch (error) {
      updateNotification("Wrong credentials", "errorMessage");
    }
  };

  const handleLogout = () => {
    const user = window.localStorage.clear();
    setUser(user);
  };

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      updateNotification(`Blog "${newBlog.title}" by ${newBlog.author} added`, "notificationMessage");
    } catch (error) {
      updateNotification("Title and Url are required fields", "errorMessage");
    }
  };

  const updateNotification = (newMessage, newStyle) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      message: newMessage,
      style: newStyle,
    }));
    setTimeout(() => {
      setNotification({ message: "", style: "" });
    }, 3000);
  };

  return (
    <div>
      <Notification notification={notification} />
      {/* user is falsy _> login form provided */}
      {!user && <LoginForm handleLogin={login} />}

      {/* user is truthy _> blog list rendered */}
      {user && (
        <div>
          <p>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <Blog blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
