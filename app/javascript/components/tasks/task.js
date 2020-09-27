import React from 'react';
import styled from 'styled-components';

const Task = ({ task }) => {
  return(
    <li className="list-group-item">
      <a className="w-100 d-block text-decoration-none"
        data-toggle="collapse"
        href={`#task${task.id}`}
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        key={task.id}>
          {task.title}
      </a>
      <div className="collapse" id={`task${task.id}`}>
        <textarea className="form-control"
        value={task.description}
        id="exampleFormControlTextarea1"
        rows="3" />
      </div>
    </li>
  );
};

export default Task;
