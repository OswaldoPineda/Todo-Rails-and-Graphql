import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HelloWorld = () => {
  const { message } = useLocation();
  return (
    <div className='container'>
      { message ? <div className="alert alert-success" role="alert">{ message }</div> : '' }
      <section className="jumbotron text-center">
        <div className="container">
          <h1>Hello, world! { message }</h1>
          <p className="lead text-muted">Welcome to my To-do app!!</p>
          <p>
            <Link to="/signin" className="btn btn-primary my-2">Go to signin</Link>
            <Link to="/signup" className="btn btn-secondary my-2">Go to signup</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelloWorld;
