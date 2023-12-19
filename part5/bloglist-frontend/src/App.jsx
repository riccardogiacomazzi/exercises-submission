import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    getBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginRequest({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("user state:", user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    console.log("logging in with", username, password);
  };

  return (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
      <h2>blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
