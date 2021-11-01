import axios from 'axios';

const addTask = async (description, fetchApiToUpdate) => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  axios.post('http://localhost:5000', {
    description,
    name,
    email,
  });

  setTimeout(() => fetchApiToUpdate(), 1);
};

export default addTask;
