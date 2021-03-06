import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuthentication from '../customHooks/userAuthentication';

const SignUp = () => {
  const { signUp } = useAuthentication();
  const [messageErrors, setMessageErrors] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();

  return(
    <section className='container mt-5'>
      { messageErrors ? <div className="alert alert-danger" role="alert">{ messageErrors }</div> : '' }
      <h1 className='text-center mb-5'>Sign Up</h1>
      <div className='row d-flex justify-content-center'>
        <form className='col-12 col-sm-7' onSubmit={() => handleSubmit(signUp({nickname, email, password, passwordConfirmation}))}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
            type="email"
            name="email"
            className={`form-control ${ errors.email && 'is-invalid' }`}
            ref={register({ required: true })}
            onChange={(e) => setEmail(e.currentTarget.value)}/>
            { errors.email && <div className="invalid-feedback">Please provide a valid email.</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Nickname</label>
            <input
            type="text"
            name="nickname"
            ref={register({ required: true })}
            className={`form-control ${ errors.nickname && 'is-invalid' }`}
            onChange={(e) => setNickname(e.currentTarget.value)}/>
            { errors.nickname && <div className="invalid-feedback">Please provide a valid nickname.</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
            type="password"
            name="password"
            ref={register({ required: true, min: 7 })}
            className={`form-control ${ errors.password && 'is-invalid' }`}
            onChange={(e) => setPassword(e.currentTarget.value)} />
            { errors.password && <div className="invalid-feedback">At least 7 digits.</div> }
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation</label>
            <input
            type="password"
            name="passwordConf"
            ref={register({ required: true, min: 7, validate: (value) => { return value === watch('password'); }})}
            className={`form-control ${ errors.passwordConfirmation && 'is-invalid' }`}
            onChange={(e) => setPasswordConfirmation(e.currentTarget.value)} />
            { errors.passwordConfirmation && <div className="invalid-feedback">Doesn't match with the password.</div> }
          </div>
          <button type="submit" className="btn btn-lg btn-block btn-primary">Sign Up</button>
        </form>
        <div className="col-12 col-sm-7">
          <Link to='/' className='btn btn-lg btn-secondary mt-3 btn-block'>Back to home</Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
