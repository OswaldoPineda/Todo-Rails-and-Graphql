import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return(
    <section className='container mt-5'>
      <h1 className='text-center mb-5'>Sign In</h1>
      <div className='row d-flex justify-content-center'>
        <form className='col-12 col-sm-7'>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-lg btn-block btn-primary">Sign In</button>
        </form>
        <div className="col-12 col-sm-7">
          <Link to='/' className='btn btn-lg btn-secondary mt-3 btn-block'>Back to home</Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
