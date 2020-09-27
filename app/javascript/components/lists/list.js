import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Badge = styled.span`
  color: white;
`;

const List = ({ list }) => {

  const getTaskNumber = (list) => ( list.tasks ? list.tasks.length : '0' );

  return(
    <Link to={`/lists/${list.id}/tasks`} className="text-decoration-none">
      <li className="list-group-item d-flex justify-content-between align-items-center" key={list.id}>
        {list.name}
        <Badge className="badge bg-primary rounded-pill">{getTaskNumber(list)}</Badge>
      </li>
    </Link>
  );
};

export default List;
