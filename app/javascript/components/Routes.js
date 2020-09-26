import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import ListPage from './lists/ListPage';
import TaskPage from './tasks/taskPage';
import PrivateRoute from './PrivateRoute';

const Routes = (props) => {
  // const listId = props.match.params.listId;
  // const taskId = props.match.params.taskId;

  return(
    <Switch>
      <PrivateRoute path='/lists/:id/tasks' component={TaskPage} />
      <PrivateRoute path='/lists' component={ListPage} />
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
