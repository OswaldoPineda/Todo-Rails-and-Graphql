import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GREETING = gql`
 query {
    testField
  }
`;

const testGraph = () => {
  const [name, setName] = useState('');
  const { loading, error, data } = useQuery(GREETING);

  useEffect(() => {
    if (data) {
      setName(data.testField);
    }
  });
  return (
    <h1>{name} </h1>
  );
};

export default testGraph;
