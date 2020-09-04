import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import Navigation from './Navigation';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      setUserStatus(true);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navigation userStatus={userStatus} setUserStatus={setUserStatus}/>
        <Switch>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/signin'>
            <SignIn setUserStatus={setUserStatus}/>
          </Route>
          <Route path='/'>
            <HelloWorld />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
