// This function verify if user has acess to modify this task(owner|admin)

import { decodeToken } from 'react-jwt';

const verifyUser = (task, setModal, setError) => {
  const token = localStorage.getItem('token');
  const { data: { admin, name: localStorageName } } = decodeToken(token);

  if (localStorageName === task || admin) {
    setModal(true);
  } else {
    setError('You cannot change / delete this task');
    setTimeout(() => setError(''), 5000);
  }
};

export default verifyUser;
