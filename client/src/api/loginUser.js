import axios from 'axios';

const loginUser = async (email, password, callback) => {
  const token = await axios.post('http://localhost:5000/users/login', {
    email,
    password,
  });

  if (token) callback(true);

  const valuesToStore = Object.entries(token.data);
  valuesToStore.forEach((value) => localStorage.setItem(value[0], value[1]));
};

export default loginUser;
