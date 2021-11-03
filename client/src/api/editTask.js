import axios from 'axios';
import { decodeToken } from 'react-jwt';

const editTask = async (description, fetchApiToUpdate, id, setModal, status) => {
  const token = localStorage.getItem('token');
  const { data: { name } } = decodeToken(token);

  await axios.put(
    `http://localhost:5000/${id}`,
    { description, name, status },
    { headers: { Authorization: token.replace(/"/g, '') } },
  );

  setTimeout(() => setModal(false), 1);
  setTimeout(() => fetchApiToUpdate(), 1);
};

export default editTask;
