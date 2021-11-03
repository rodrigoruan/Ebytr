import axios from 'axios';

const loginUser = async (email, password, callback, setError) => {
  try {
    const token = await axios.post('http://localhost:5000/users/login', { email, password });

    callback(true);

    localStorage.setItem('token', JSON.stringify(token.data));
  } catch (err) {
    setError('Invalid data!');
  }
};

export default loginUser;
