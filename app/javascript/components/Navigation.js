import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  const callLogOut = () => {
    window.localStorage.removeItem('userEmail');
    window.localStorage.removeItem('userToken');
    props.setUserStatus(false);
  };

  const renderButtons = () => {
    if (props.userStatus) {
      return(
        <ul className="navbar-nav ml-auto mb-lg-0">
          <li className="nav-item">
            <Link to="/account" className="nav-link">Account</Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">My tasks</Link>
          </li>
          <li className="nav-item">
            <span onClick={callLogOut} className="nav-link">Log Out</span>
          </li>
        </ul>
      );
    } else {
      return(
        <ul className="navbar-nav ml-auto mb-lg-0">
          <li className="nav-item">
            <Link to="/signin" className="nav-link">Signin</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
        </ul>
      );
    }
  };

  return(
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand " to="/">Todo App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            { renderButtons() }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
