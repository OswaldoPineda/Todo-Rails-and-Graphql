import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {  } from 'react-beautiful-dnd';

const Badge = styled.span`
  color: white;
`;

const List = ({ list }) => {
  return(
    <Link to={`/lists/${list.id}/tasks`}>
      <li className="list-group-item d-flex justify-content-between align-items-center" key={list.id}>
        {list.name}
        <Badge className="badge bg-primary rounded-pill">0</Badge>
      </li>
    </Link>
  );
};

export default List;
