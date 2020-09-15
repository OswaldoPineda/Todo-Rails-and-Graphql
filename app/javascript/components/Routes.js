import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';

const Routes = () => {
  return(
    <Switch>
      <Route path='/signup'>
        <SignUp />
      </Route>
      <Route path='/signin'>
        <SignIn />
      </Route>
      <Route path='/'>
        <HelloWorld />
      </Route>
    </Switch>
  );
}

export default Routes;
