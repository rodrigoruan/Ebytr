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

  const response = await axios.post('http://localhost:5000/users/create', { email, password, name });

  if (response) setCreated(true);
};

export default createUser;
