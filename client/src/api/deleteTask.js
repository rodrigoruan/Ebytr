import axios from 'axios';

const deleteTask = async (id, fetchApiToUpdate) => {
  const token = localStorage.getItem('token');

  await axios.delete(`https://ebytr-rodrigo.herokuapp.com/${id}`, {
    headers: { Authorization: token.replace(/"/g, '') },
  });

  setTimeout(() => fetchApiToUpdate(), 1);
};

export default deleteTask;
