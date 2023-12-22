import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username: username, password: password });
  };

  return (
    <div>
      <h3>Log in to Blog App</h3>
      <form onSubmit={login}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="text" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        {/* <div>{notification}</div> */}
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
