import React from 'react';
import PropTypes from 'prop-types';
import editTask from '../api/editTask';

import Modal from './Modal';

import Trash from '../imgs/trash.svg';
import Edit from '../imgs/edit.svg';

function Task({
  description, name, id, fetch,
}) {
  const [modal, setModal] = React.useState(false);

  if (modal) {
    return (
      <Modal
        description={description}
        name={name}
        id={id}
        fetch={fetch}
        editTask={editTask}
        setModal={setModal}
      />
    );
  }

  return (
    <div>
      <div>
        <h3>{description}</h3>
        <p>{name}</p>
      </div>
      <div>
        <button onClick={() => setModal(true)} type="button">
          <img width="25px" src={Edit} alt="Edit icon" />
        </button>

        <img width="25px" src={Trash} alt="Trash icon" />
      </div>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default Task;
