import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';

const SIGN_UP = gql`
  mutation UserSignUp($email: String!, $name: String!, $password: String!, $passwordConfirmation: String!){
    userSignUp(email: $email, name: $name, password: $password, passwordConfirmation: $passwordConfirmation) {
      user {
        email
        name
      }
    }
  }
`;

const authClient = new ApolloClient({
  uri: '/graphql_auth',
  cache: new InMemoryCache()
});

const testGraph = () => {
  const [user, setUser] = useState([]);
  const refInput = useRef('');
  const [signUp, { data, errors }] = useMutation(SIGN_UP, { client: authClient });

  useEffect(() => {
    if (data) {
      setUser(data.userSignUp.user);
    }
  });

  const callSignUp = () => {
    const inputVal = refInput.current.value;
    signUp({ variables: { name: 'waldo', email: inputVal, password: '1234567', passwordConfirmation: '1234567' }});
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        callSignUp();
      }}>
        <input ref={refInput}/>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default testGraph;
