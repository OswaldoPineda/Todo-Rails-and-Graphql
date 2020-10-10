import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const DELETE_LIST = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId) {
      id
    }
  }
`;

const Badge = styled.span`
  color: white;
`;

const List = ({ list, lists, setLists }) => {
  const [deleteList, { data, error }] = useMutation(DELETE_LIST);

  const getTaskNumber = (list) => ( list.tasks ? list.tasks.length : '0' );

  const deleteTask = (id) => {
    deleteList({variables: { listId: `${id}` }})
      .then(() => {
        const newLists = lists.filter((list) => list.id !== id);
        setLists(newLists);
      }).catch((error) => {
        console.error('Error from delete List: ', error);
      });
  };

  const editIcon = (id) => {
    return(
      <button type="button" className="btn mx-1 btn-outline-secondary h-100">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
    </svg>
  </button>
    );
  };

  const deleteIcon = (id) => {
    return(
      <button type="button" className="btn btn-outline-danger h-100" onClick={() => deleteTask(id)}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"></path>
      </svg>
    </button>
    );
  };

  return(
    <div className="d-flex">
      <Link to={`/lists/${list.id}/tasks`} className="text-decoration-none col-10 pr-0 rounded">
        <li className="list-group-item d-flex justify-content-between align-items-center" key={list.id}>
          {list.name}
          <Badge className="badge bg-primary rounded-pill">{getTaskNumber(list)}</Badge>
        </li>
      </Link>
      <div>
        {editIcon(list.id)}
        {deleteIcon(list.id)}
      </div>
    </div>
  );
};

export default List;
