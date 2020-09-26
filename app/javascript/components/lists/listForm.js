import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';

const NEW_LIST = gql`
  mutation NewList($name: String!) {
    createList(name: $name) {
      id
      name
    }
  }
`;

const ListForm = ({ lists, setList }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [createList, { data, error }] = useMutation(NEW_LIST);

  const callCreateList = (data) => {
    createList({variables: { name: data.name }})
      .then(({ data }) => {
        const newList = data.createList;
        setList([...lists, newList]);
        document.querySelector('form').reset();
      }).catch((err) => {
        console.error(err);
      });
  }

  return(
    <form className="row g-3 my-5 d-flex justify-content-center" onSubmit={handleSubmit(callCreateList)}>
      <div className="col-auto">
        <label className="sr-only">New List</label>
      </div>
      <div className="col-4">
        <label className="sr-only">Name</label>
        <input
          type="text"
          name="name"
          ref={register({ required: true })}
          className={`form-control form-control-lg ${ errors.name && 'is-invalid' }`}
          placeholder="School" />
          { errors.name && <div className="invalid-feedback">Please provide a list name.</div> }
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Create</button>
      </div>
    </form>
  );
};

export default ListForm;
