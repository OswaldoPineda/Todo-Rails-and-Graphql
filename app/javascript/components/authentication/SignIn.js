import React, { useState, useEffect } from 'react';
import { useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';

const LOG_IN = gql`
  mutation UserLogin ($email: String!, $password: String!) {
    userLogin(email: $email,  password: $password) {
      user {
        email
        name
      }
      credentials {
        accessToken
        tokenType
      }
    }
  }
`;

const authClient = new ApolloClient({
  uri: '/graphql_auth',
  cache: new InMemoryCache()
});

const SignIn = (props) => {
  const [logIn, { data, error }] = useMutation(LOG_IN, { client: authClient });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();

  const callLogin = () => {
    logIn({
      variables: {
        email,
        password
      }
    }).then((res) => {
      const { credentials, user } = res.data.userLogin;
      window.localStorage.setItem('userEmail', user.email);
      window.localStorage.setItem('userToken', credentials.accessToken);
      props.setUserStatus(true);
      history.push({
        pathname: '/',
        message: `Welcome ${user.name}!!`
      });
    }).catch((error) => {
      console.error('Error Login:', error);
    });
  };

  return(
    <section className='container mt-5'>
      <h1 className='text-center mb-5'>Sign In</h1>
      <div className='row d-flex justify-content-center'>
        <form className='col-12 col-sm-7' onSubmit={handleSubmit(callLogin)}>
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
