const Login = ({ handleLogin, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      <label>
        username
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </label>
    </div>
    <div>
      <label>
        password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </label>
    </div>
    <button type="submit">login</button>
  </form>
);

export default Login;
