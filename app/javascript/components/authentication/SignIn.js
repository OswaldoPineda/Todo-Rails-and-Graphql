import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useAuthentication from '../customHooks/userAuthentication';

const SignIn = ({ path }) => {
  const { logIn } = useAuthentication();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();

  return(
    <section className='container mt-5'>
      <h1 className='text-center mb-5'>Sign In</h1>
      <div className='row d-flex justify-content-center'>
        <form className='col-12 col-sm-7' onSubmit={handleSubmit(() => logIn(email, password, path))}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
            type="email"
            name="email"
            className={`form-control ${ errors.email && 'is-invalid' }`}
            onChange={(e) => setEmail(e.currentTarget.value)}
            ref={register({ required: true })}
          />
          { errors.email && <div className="invalid-feedback">Please provide a valid email.</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
            type="password"
            name="password"
            ref={register({ required: true, min: 7 })}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className={`form-control ${ errors.password && 'is-invalid' }`}
            />
          { errors.password && <div className="invalid-feedback">Please provide a valid password.</div> }
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
