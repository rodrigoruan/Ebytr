import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import loginUser from '../api/loginUser';
import TodoIcon from '../imgs/todoIcon.svg';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setRedirect(true);
  }, []);

  return (
    <div className="login-container">
      <img src={TodoIcon} alt="todo icon" />

      <h1 className="login-title">PLEASE SIGN IN</h1>

      <input
        placeholder="Email Address"
        onChange={({ target }) => setEmail(target.value)}
      />

      <input
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
        type="password"
      />

      <button
        onClick={() => loginUser(email, password, setRedirect)}
        type="button"
      >
        Log In
      </button>

      <p>
        Don&apos;t have an account?
        <Link to="/register" className="register-button">
          {' Join Now'}
        </Link>
      </p>

      {redirect && <Redirect to="/home" />}
    </div>
  );
}

export default Login;
