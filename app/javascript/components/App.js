import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'
import Navigation from './Navigation';
import { UserContextProvider } from './contexts/UserStatusContext';

const client = new ApolloClient({
  uri: '/graphql',
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
