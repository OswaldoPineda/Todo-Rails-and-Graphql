import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <Router>
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
      </Router>
    </ApolloProvider>
  );
};

export default App;
