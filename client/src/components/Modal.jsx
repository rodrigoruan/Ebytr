import React from 'react';
import PropTypes from 'prop-types';
import editTask from '../api/editTask';
import '../css/Modal.css';

function Modal({
  description, name, id, fetch, setModal,
}) {
  const [newDescription, setNewDescription] = React.useState('');

  const verifyTaskAndEdit = () => newDescription && editTask(newDescription, fetch, id, setModal);

  return (
    <div className="modal-container">
      <h2>{description}</h2>
      <p>{name}</p>
      <input
        placeholder="New description"
        onChange={({ target }) => setNewDescription(target.value)}
      />
      <button
        type="button"
        onClick={verifyTaskAndEdit}
      >
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
};
