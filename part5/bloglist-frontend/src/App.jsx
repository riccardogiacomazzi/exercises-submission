import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    style: "",
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginRequest({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      updateNotification("Wrong credentials", "errorMessage");
      setTimeout(() => {
        updateNotification("", "");
      }, 3000);
    }
  };

  const handleLogout = () => {
    const user = window.localStorage.clear();
    setUser(user);
  };

  const handleBlog = async (event) => {
    try {
      event.preventDefault();
      blogService.setToken(user.token);
      const addedBlog = await blogService.create(newBlog);
      setNewBlog({ title: "", author: "", url: "", likes: 0 });
      const updatedBlog = await blogService.getAll();
      setBlogs(updatedBlog);
      updateNotification(`Blog "${addedBlog.title}" by ${addedBlog.author} added`, "notificationMessage");
      setTimeout(() => {
        updateNotification("", "");
      }, 3000);
    } catch (error) {
      updateNotification("Title and Url are required fields", "errorMessage");
      setTimeout(() => {
        updateNotification("", "");
      }, 3000);
    }
  };

  const updateNotification = (newMessage, newStyle) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      message: newMessage,
      style: newStyle,
    }));
  };

  return (
    <div>
      <Notification notification={notification} />
      {/* user is falsy _> login form provided */}
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {/* user is truthy _> blog list rendered */}
      {user && (
        <div>
          <p>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm handleBlog={handleBlog} user={user} newBlog={newBlog} setNewBlog={setNewBlog} />
          </Togglable>
          <Blog blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
