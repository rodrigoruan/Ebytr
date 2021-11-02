import React from 'react';
import PropTypes from 'prop-types';
import editTask from '../api/editTask';
import '../css/Modal.css';

function Modal({
  description, name, id, fetch, setModal, status,
}) {
  const [newDescription, setNewDescription] = React.useState('');
  const [taskStatus, setTaskStatus] = React.useState('pending');

  const verifyTaskAndEdit = () => {
    if (newDescription) editTask(newDescription, fetch, id, setModal, taskStatus);
  };

  return (
    <div className="modal-container">
      <h2>{description}</h2>
      <p>{`${name} / ${status}`}</p>
      <input
        placeholder="New description"
        onChange={({ target }) => setNewDescription(target.value)}
      />
      <label htmlFor="status">
        <select
          id="status"
          role="combobox"
          onChange={({ target }) => setTaskStatus(target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In progresss</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button type="button" onClick={verifyTaskAndEdit}>
        Update Task
      </button>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
