import React from 'react';
import { Redirect } from 'react-router-dom';
import loginUser from '../api/services';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const storage = localStorage.getItem('token');
    if (storage) setRedirect(true);
  }, []);

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
      <button
        onClick={() => loginUser(email, password, setRedirect)}
        type="button"
      >
        LOGAR
      </button>
    </div>
  );
}

export default Login;
