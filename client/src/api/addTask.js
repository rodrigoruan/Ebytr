import axios from 'axios';
import { decodeToken } from 'react-jwt';

const addTask = async (description, fetchApiToUpdate) => {
  const token = localStorage.getItem('token');
  const { data: { email, name } } = decodeToken(token);

  axios.post('http://ebytr-rodrigo.herokuapp.com/', { description, name, email });

  setTimeout(() => fetchApiToUpdate(), 1);
};

export default addTask;
