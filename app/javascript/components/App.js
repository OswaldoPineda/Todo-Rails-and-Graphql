import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Routes from './Routes'
import Navigation from './Navigation';
import { UserContextProvider } from './contexts/UserStatusContext';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  const userData = localStorage.getItem('userData');
  const credentials = JSON.parse(userData);

  return {
    headers: {
      ...headers,
      "token-type":   "Bearer",
      'access-token': credentials.userToken ? `${credentials.userToken}` : '',
      'expiry': credentials.expiry,
      'uid': credentials.uid,
      'client': credentials.client,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <Router>
          <Navigation />
          <Routes />
        </Router>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default App;
