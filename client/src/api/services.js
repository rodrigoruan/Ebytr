import axios from 'axios';

const loginUser = async (email, password, callback) => {
  const token = await axios.post('http://localhost:5000/users/login', {
    email,
    password,
  });
  if (token) callback(true);
  localStorage.setItem('token', token.data);
};

export default loginUser;
