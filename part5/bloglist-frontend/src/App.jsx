import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
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
      setLoginStatus(true);
      console.log("user state:", user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    const user = window.localStorage.clear();
    setUser(user);
  };

  const handleBlog = () => {
    blogService.create(newBlog);
  };

  return (
    <div>
      {/* user is falsy _> login form provided */}
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      )}

      {/* user is truthy _> blog list rendered */}
      {user && (
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>logout</button>
          <BlogForm
            handleBlog={handleBlog}
            user={user}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            errorMessage={errorMessage}
          />
          <Blog blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
