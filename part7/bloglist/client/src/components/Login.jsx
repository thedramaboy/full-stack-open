const Login = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      <label>
        username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
    </div>
    <div>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </div>
    <button type="submit">login</button>
  </form>
);

export default Login;
