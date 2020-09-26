import React from 'react';
import { useParams } from 'react-router-dom';

const TaskPage = () => {
  let { listId } = useParams();
  return(
    <h1>HOLA tasks {listId}</h1>
  );
};

export default TaskPage;
