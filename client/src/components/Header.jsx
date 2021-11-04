import React from 'react';
import { useHistory } from 'react-router-dom';

import { decodeToken } from 'react-jwt';

import todoIcon from '../imgs/todoIcon.svg';

function Header() {
  const [name, setName] = React.useState('');
  const [logged, setLogged] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);
    if (token && decoded) {
      setLogged(true);
      setName(decoded.data.name);
    }
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    setLogged(false);
    history.push('/');
  };

  if (!logged) return <div>User not logged</div>;

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
