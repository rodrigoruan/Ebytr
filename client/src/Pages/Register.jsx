import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import createUser from '../api/createUser';

import returnIcon from '../imgs/return.svg';

import '../css/Register.css';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [created, setCreated] = React.useState(false);

  return (
    <div>
      <header>
        <Link to="/">
          <img className="return-icon" src={returnIcon} alt="return icon" />
        </Link>
      </header>

      <div className="register-container">
        <h1>SIGN UP</h1>
        <form method="POST" className="register-form">
          <input
            placeholder="Name"
            required
            type="text"
            onChange={({ target }) => setName(target.value)}
          />

          <input
            placeholder="Email"
            required
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          />

          <input
            placeholder="Password"
            required
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <p className="register-error">{error}</p>

          <button
            type="button"
            onClick={() => createUser(email, password, name, setCreated, setError)}
          >
            Create account
          </button>

          {created && <Redirect to="/" />}
        </form>
      </div>
    </div>
  );
}

export default Register;
