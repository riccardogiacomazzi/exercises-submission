const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, errorMessage }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="text" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>{errorMessage}</div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
