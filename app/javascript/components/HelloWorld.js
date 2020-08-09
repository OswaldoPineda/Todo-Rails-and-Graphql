import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TestGraph from './testGraph';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const HelloWorld = () => {
  return (
    <ApolloProvider client={client}>
      <TestGraph />
    </ApolloProvider>
  );
};

export default HelloWorld;
