import React from 'react';
import PropTypes from 'prop-types';
import { decodeToken } from 'react-jwt';
import editTask from '../api/editTask';
import deleteTask from '../api/deleteTask';
import Modal from './Modal';
import Trash from '../imgs/trash.svg';
import Edit from '../imgs/edit.svg';
import '../css/Task.css';

function Task({
  description, name, id, fetch, status, date,
}) {
  const [modal, setModal] = React.useState(false);

  const formatedDate = new Date(date).toLocaleString();

  const verifyIfUserIsAdminOrOwnsTask = () => {
    const token = localStorage.getItem('token');
    const { data: { admin, name: localStorageName } } = decodeToken(token);

    if (localStorageName === name || admin) setModal(true);
  };

  if (modal) {
    return (
      <Modal
        description={description}
        name={name}
        id={id}
        fetch={fetch}
        editTask={editTask}
        setModal={setModal}
        status={status}
      />
    );
  }

  return (
    <div className="task-container">
      <div className="task-header">
        <h3>{description}</h3>
        <p className="task-date">{formatedDate}</p>
        <p className="task-status">{`${name} / ${status}`}</p>
      </div>
      <div className="buttons-task-container">
        <button onClick={verifyIfUserIsAdminOrOwnsTask} type="button">
          <img width="25px" src={Edit} alt="Edit icon" />
        </button>

        <button onClick={() => deleteTask(id, fetch)} type="button">
          <img width="25px" src={Trash} alt="Trash icon" />
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Task;
