import React from 'react';
import PropTypes from 'prop-types';
import { decodeToken } from 'react-jwt';

import deleteTask from '../api/deleteTask';

import Modal from './Modal';

import Trash from '../imgs/trash.svg';
import Edit from '../imgs/edit.svg';

import '../css/Task.css';

function Task({
  description, task, id, fetchTasks, status, momentDate,
}) {
  const [modal, setModal] = React.useState(false);
  const [error, setError] = React.useState('');

  const formatedDate = new Date(momentDate).toLocaleString();

  const verifyIfUserIsAdminOrOwnsTask = () => {
    const token = localStorage.getItem('token');
    const {
      data: { admin, name: localStorageName },
    } = decodeToken(token);

    if (localStorageName === task || admin) {
      setModal(true);
    } else {
      setError('You cannot change / delete this task');
      setTimeout(() => setError(''), 4000);
    }
  };

  if (modal) {
    return (
      <Modal
        {...{
          description,
          task,
          id,
          fetchTasks,
          setModal,
          status,
        }}
      />
    );
  }

  return (
    <div className="task-container">
      <div className="task-header">
        <h3>{description}</h3>
        <p className="task-date">{formatedDate}</p>
        <p className="task-status">{`${task} / ${status}`}</p>
      </div>
      <p className="task-error">{error}</p>
      <div className="buttons-task-container">
        <button onClick={verifyIfUserIsAdminOrOwnsTask} type="button">
          <img width="25px" src={Edit} alt="Edit icon" />
        </button>
        <button onClick={() => deleteTask(id, fetchTasks)} type="button">
          <img width="25px" src={Trash} alt="Trash icon" />
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  momentDate: PropTypes.string.isRequired,
};

export default Task;
