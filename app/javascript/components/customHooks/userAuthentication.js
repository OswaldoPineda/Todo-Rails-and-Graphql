import React, { useState, useEffect } from 'react';
import { useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { UseUserContext } from '../contexts/UserStatusContext';

const authClient = new ApolloClient({
  uri: '/graphql_auth',
  cache: new InMemoryCache()
});

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

const SIGN_UP = gql`
  mutation UserSignUp($email: String!, $name: String!, $password: String!, $passwordConfirmation: String!){
    userSignUp(email: $email, name: $name, password: $password, passwordConfirmation: $passwordConfirmation) {
      user {
        email
        name
      }
    }
  }
`;

const useAuthentication = () => {
  const [callLogIn, { dataLogIn, errorLogIn }] = useMutation(LOG_IN, { client: authClient });
  const [callSignUp, { dataSignUp, errorSignUp }] = useMutation(SIGN_UP, { client: authClient });
  const history = useHistory();
  const { userStatus, setUserStatus, setUserData } = UseUserContext();

  const logIn = (email, password) => {
    callLogIn({
      variables: {
        email,
        password
      }
    }).then((res) => {
      const { credentials, user } = res.data.userLogin;
      const userObj = { 'email': user.email, 'userToken': credentials.accessToken };
      window.localStorage.setItem('userData', JSON.stringify(userObj));
      setUserStatus(true);
      setUserData(userObj);
      history.push({
        pathname: '/',
        message: `Welcome ${user.name}!!`
      });
    }).catch((error) => {
      console.error('Error Login:', error);
    });
  };

  const callLogOut = () => {
    window.localStorage.removeItem('userData');
    setUserStatus(false);
    setUserData({});
  };

  const signUp = ({ nickname, email, password, passwordConfirmation }) => {
    callSignUp({
      variables: {
        name: nickname,
        email,
        password,
        passwordConfirmation
      }
    }).then(() => {
      history.push({
        pathname: '/',
        message: 'Your account has been successfully created!!'
      });
    }).catch((error) => {
      console.error(error.message);
    });
  };

  return { callLogOut, logIn, signUp };
};

export default useAuthentication;