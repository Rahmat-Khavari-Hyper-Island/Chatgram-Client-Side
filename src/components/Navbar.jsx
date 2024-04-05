import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="mb-5 border-bottom">
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Chatgram
          </Link>

          <div>
            <div className="d-md-none d-block d-flex justify-content-end">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login / Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
