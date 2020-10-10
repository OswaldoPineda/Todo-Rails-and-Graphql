import React, { useState } from 'react';
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

const EDIT_LIST = gql`
  mutation editList($listId: String!, $name: String!) {
    editList(listId: $listId, name: $name) {
      id
      name
    }
  }
`;

const Badge = styled.span`
  color: white;
`;

const List = ({ list, lists, setLists }) => {
  const [selectedList, setSelectedList] = useState(null);
  const [deleteList, { dataDelete, errorDelete }] = useMutation(DELETE_LIST);
  const [editList, { dataEdit, errorEdit }] = useMutation(EDIT_LIST);

  const getTaskNumber = (list) => ( list.tasks ? list.tasks.length : '0' );

  const handleDeleteList = (id) => {
    deleteList({variables: { listId: `${id}` }})
      .then(() => {
        const newLists = lists.filter((list) => list.id !== id);
        setLists(newLists);
      }).catch((error) => {
        console.error('Error from delete List: ', error);
      });
  };

  const handleEditList = (list, newName) => {
    setSelectedList(null);
    editList({variables: { listId: String(list.id), name: newName }})
      .then((data) => {
        console.log(data);
      }).catch((error) => {
        console.error('Error from edit List: ', error);
      });
  };

  const editIcon = (id) => {
    return(
      <button type="button" className="btn mx-1 btn-outline-secondary h-100" onClick={() => setSelectedList(list)}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
    </svg>
  </button>
    );
  };

  const deleteIcon = (id) => {
    return(
      <button type="button" className="btn btn-outline-danger h-100" onClick={() => handleDeleteList(id)}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"></path>
      </svg>
    </button>
    );
  };

  const listElement = (list) => {
    return(
      <Link to={`/lists/${list.id}/tasks`} className="text-decoration-none col-10 pr-0 rounded">
        <li className="list-group-item d-flex justify-content-between align-items-center" key={list.id}>
          {list.name}
          <Badge className="badge bg-primary rounded-pill">{getTaskNumber(list)}</Badge>
        </li>
      </Link>
    );
  };

  const listEditInput = (list) => {
    return(
      <div className="text-decoration-none col-10 pr-0 rounded">
        <input
          className="form-control"
          autoFocus="autofocus"
          type="text"
          defaultValue={list.name}
          onBlur={(e) => handleEditList(list, e.currentTarget.value)} />
      </div>
    );
  }

  return(
    <div className="d-flex">
      { list === selectedList ? listEditInput(list) : listElement(list) }
      <div>
        {editIcon(list)}
        {deleteIcon(list.id)}
      </div>
    </div>
  );
};

export default List;
