import React, { useEffect, useState } from 'react';
import List from './list';
import ListForm from './listForm';
import { useQuery, gql } from '@apollo/client';

const getUserData = window.localStorage.getItem('userData');
const userId = JSON.parse(getUserData).id;
const GET_LISTS = gql`
  query {
    lists(id: ${userId}) {
      id
      name
    }
  }
`;

const ListPage = () => {
  const { loading, error, data } = useQuery(GET_LISTS);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (data) {
      setLists(data.lists);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <div>
      <div>
        <ListForm setList={setLists} lists={lists}/>
      </div>
      <ul className="list-group col-sm-6 mx-auto">
        {lists.map(list => (
          <List list={list} key={list.id} />
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
