import React from 'react';
import PropTypes from 'prop-types';

import todoIcon from '../imgs/todoIcon.svg';

function Header({ name, logOutUser }) {
  return (
    <header className="header-container">
      <div>
        <img src={todoIcon} alt="todo icon" />
        <p className="user-logged">
          {'Welcome '}
          <span className="username">{name}</span>
          !
        </p>
      </div>
      <button type="button" onClick={() => logOutUser()}>
        Log Out
      </button>
    </header>
  );
}

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  logOutUser: PropTypes.func.isRequired,
};
