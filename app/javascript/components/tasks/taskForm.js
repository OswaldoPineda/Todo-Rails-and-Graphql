import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const NEW_TASK = gql`
  mutation NewTask($title: String!, $description: String!, $listId: String!) {
    createTask(title: $title, description: $description, listId: $listId) {
      id
      title
      description
    }
  }
`;

const TaskForm = ({ tasks, setTasks }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [createTask, { data, error }] = useMutation(NEW_TASK);
  let { id } = useParams();

  const callCreateTask = ({ title, description }) => {
    createTask({variables: { title: title, description: description, listId: id }})
      .then(({ data }) => {
        const newTasks = data.createTask;
        setTasks([...tasks, newTasks]);
        document.querySelector('form').reset();
      }).catch((err) => {
        console.error(err);
      });
  }

  return(
    <form className="row g-3 my-5 d-flex justify-content-center" onSubmit={handleSubmit(callCreateTask)}>
      <div className="col-auto">
        <label className="sr-only">New Task</label>
      </div>
      <div className="col-4">
        <label className="sr-only">Title</label>
        <input
          type="text"
          name="title"
          ref={register({ required: true })}
          className={`form-control form-control-lg ${ errors.name && 'is-invalid' }`}
          placeholder="School" />
          { errors.name && <div className="invalid-feedback">Please provide a list name.</div> }
        <label className="sr-only">Description</label>
        <textarea
        name="description"
        ref={register({ required: false })}
        className='form-control form-control-lg mt-1'
        placeholder="Provide a description (optional)"/>
      </div>
      <div className="col-auto d-flex align-items-center">
        <button type="submit" className="btn btn-outline-primary btn-lg mb-3">Create</button>
      </div>
    </form>
  );
};

export default TaskForm;
