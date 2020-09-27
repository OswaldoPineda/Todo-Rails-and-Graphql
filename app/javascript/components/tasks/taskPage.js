import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import TaskForm from './taskForm';
import Task from './task';

const GET_TASKS = gql`
  query Tasks($listId: String!) {
    tasks(id: $listId) {
      id
      title
      description
    }
  }
`;


const TaskPage = () => {
  let { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_TASKS, { variables: { listId: id } });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data.tasks);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);


  const checkTasks = (tasks) => {
    if (tasks.length > 0) {
      return(
        <ul className="list-group col-sm-6 mx-auto">
          {tasks.map(task => (
            <Task task={task} key={task.id} />
          ))}
        </ul>
      );
    }

    return(<h1 className="text-center">Empty List.</h1>);
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <div>
      <div>
        <TaskForm tasks={tasks} setTasks={setTasks}/>
      </div>
      {checkTasks(tasks)}
    </div>
  );
};

export default TaskPage;
