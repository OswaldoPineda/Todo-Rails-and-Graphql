import React, { useEffect, useState } from 'react';
import List from './list';
import ListForm from './listForm';
import { useQuery, gql } from '@apollo/client';

const getUserData = window.localStorage.getItem('userData');
const userId = getUserData ? JSON.parse(getUserData).id : 'null';
const GET_LISTS = gql`
  query {
    lists(id: ${userId}) {
      id
      name
      tasks {
        id
      }
    }
  }
`;

const ListPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_LISTS);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (data) {
      setLists(data.lists);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const checkLists = (lists) => {
    if (lists.length > 0) {
      return(
        <ul className="list-group col-sm-6 mx-auto">
          {lists.map(list => (
            <List list={list} lists={lists} setLists={setLists} key={list.id} />
          ))}
        </ul>
      );
    }

    return(<h1 className="text-center">Empty Lists.</h1>);
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <div>
      <div>
        <ListForm setList={setLists} lists={lists}/>
      </div>
      {checkLists(lists)}
    </div>
  );
};

export default ListPage;
