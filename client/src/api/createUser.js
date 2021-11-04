import axios from 'axios';

import { verifyEmail, verifyName, verifyPassword } from '../validations/validations';

const createUser = async (email, password, name, setCreated, setError) => {
  if (!verifyName(name)) {
    setError('Name must be at least 4 characters');
  }

  if (!verifyEmail(email)) {
    setError('Invalid email format');
  }

  if (!verifyPassword(password)) {
    setError('Password must be at least 6 characters');
  }

  const response = await axios.post('https://ebytr-rodrigo.herokuapp.com/users/create', { email, password, name })
    .catch(() => setError('User already exist!'));

  if (response) setCreated(true);
};

export default createUser;
