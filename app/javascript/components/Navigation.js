import React, { useEffect } from 'react';
import useAuthentication from './customHooks/userAuthentication';
import { NavLink, Link } from 'react-router-dom';
import { UseUserContext } from './contexts/UserStatusContext';

const Navigation = () => {
  const { callLogOut } = useAuthentication();
  const { userStatus } = UseUserContext();

  const loggedUserNav = () => {
    return (
      <ul className="navbar-nav ml-auto mb-lg-0">
        <li className="nav-item">
          <NavLink to="/account"
          activeClassName='active'
          className="nav-link">Account</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks"
          activeClassName='active'
          className="nav-link">My tasks</NavLink>
        </li>
        <li className="nav-item">
          <span onClick={callLogOut} className="nav-link">Log Out</span>
        </li>
      </ul>
    );
  };

  const loggedOutUserNav = () => {
    return (
      <ul className="navbar-nav ml-auto mb-lg-0">
        <li className="nav-item">
          <NavLink to="/signin"
          activeClassName='active'
          className="nav-link">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup"
          activeClassName='active'
          className="nav-link">Signup</NavLink>
        </li>
      </ul>
    );
  };

  return(
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand " to="/">Todo App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          { userStatus ? loggedUserNav() : loggedOutUserNav() }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
