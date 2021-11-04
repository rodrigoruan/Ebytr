import axios from 'axios';

const loginUser = async (email, password, callback, setError) => {
  try {
    const token = await axios.post('https://ebytr-rodrigo.herokuapp.com/users/login', { email, password });

    callback(true);

    localStorage.setItem('token', JSON.stringify(token.data));
  } catch (err) {
    setError('Invalid data!');
  }
};

export default loginUser;
