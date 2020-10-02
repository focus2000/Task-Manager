import React, { useContext, Fragment } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

const Headers = () => {
  const { logout, clearError, userAuth, user } = useContext(AuthContext);
  const onLogout = () => {
    logout();
    clearError();
  };

  const userLinks = (
    <Fragment>
      <li>Welcome {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="sm-hide">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar">
      <div className="logo">
        <h1>Task Manager</h1>
      </div>

      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  );
};

export default Headers;
