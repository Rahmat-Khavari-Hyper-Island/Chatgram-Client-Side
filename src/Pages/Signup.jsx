import React, { useState, useContext } from "react";
import SignupContext from "../context/SignupContext";

const SignupForm = () => {
  const { signup } = useContext(SignupContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !username || !password) {
      setError("Please fill in all fields."); // Set error message if any field is empty
      setShowTooltip(true); // Show tooltip
      return;
    }
    try {
      await signup({
        first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email: email.toLowerCase(),
        username,
        password,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="InputFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="InputFirstName"
              aria-describedby="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="InputLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="InputLastName"
              aria-describedby="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              aria-describedby="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
            <label htmlFor="InputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              aria-describedby="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showTooltip && (
            <div className="invalid-tooltip">Please fill in all fields.</div>
          )}
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="form-group form-check mb-3">
            <span>
              Already have an account?{" "}
              <a href="http://localhost:5173/login">Login here</a>
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

export default SignupForm;
