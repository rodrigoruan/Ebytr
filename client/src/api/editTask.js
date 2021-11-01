import axios from 'axios';

const editTask = async (description, fetchApiToUpdate, id, setModal) => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  await axios.put(
    `http://localhost:5000/${id}`,
    { description, name, email }, { headers: { Authorization: token } },
  );

  setTimeout(() => setModal(false), 1);
  setTimeout(() => fetchApiToUpdate(), 1);
};

export default editTask;
