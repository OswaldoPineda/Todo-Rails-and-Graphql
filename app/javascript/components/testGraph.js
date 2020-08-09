import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GREETING = gql`
 query {
    testField
  }
`;

const testGraph = () => {
  const [name, useName] = useState('');

  const { loading, error, data } = useQuery(GREETING);

  return (
    <h1>test graph conection </h1>
  );
};

export default testGraph;
