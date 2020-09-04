import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HelloWorld = () => {
  const { message } = useLocation();

  return (
    <div className='container mt-5'>
      { message ? <div className="alert alert-success" role="alert">{ message }</div> : '' }
      <section className="jumbotron text-center">
        <div className="container">
          <h1>Hello, world!</h1>
          <p className="lead text-muted">Welcome to my To-do app!!</p>
          <p>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelloWorld;
