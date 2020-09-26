import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UseUserContext } from './contexts/UserStatusContext';
import SignIn from './authentication/SignIn';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userStatus } = UseUserContext();

  if (userStatus) return(<Route {...rest} exact component={Component} />)
  else return (<Route {...rest} ><SignIn path={rest.path}/></Route>)
};

export default PrivateRoute;
