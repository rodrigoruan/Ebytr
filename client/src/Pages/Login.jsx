import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const storage = localStorage.getItem('token');
    if (storage) setRedirect(true);
  }, []);

  const loginUser = async () => {
    const token = await axios.post('http://localhost:5000/users/login', {
      email,
      password,
    });

    if (token) setRedirect(true);

    localStorage.setItem('token', token.data);
  };

  if (redirect) return <Redirect to="/home" />;

  return (
    <div>
      <input
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button onClick={loginUser} type="button">
        LOGAR
      </button>
    </div>
  );
}

export default Login;
