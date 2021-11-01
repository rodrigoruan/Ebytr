import React from 'react';
import PropTypes from 'prop-types';

import Trash from '../imgs/trash.svg';
import Edit from '../imgs/edit.svg';

function Task({ description, name }) {
  return (
    <div>
      <div>
        <h3>{description}</h3>
        <p>{name}</p>
      </div>
      <div>
        <img width="25px" src={Trash} alt="Trash icon" />
        <img width="25px" src={Edit} alt="Edit icon" />
      </div>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Task;
