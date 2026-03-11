const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      <label>username</label>
      <input type="text" value={username} onChange={handleUsernameChange} />
    </div>
    <div>
      <label>password</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
