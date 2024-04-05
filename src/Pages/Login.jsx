import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Login = () => {
  const { handleLogin, error } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="InputUsername"
              aria-describedby="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="form-group form-check mb-3">
            <span>
              Don't have an account?{" "}
              <a href="http://localhost:5173/signup">Register here</a>
            </span>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
