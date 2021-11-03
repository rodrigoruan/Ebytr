import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';
import '@testing-library/jest-dom';

it('renders correctly Home page screen', () => {
  renderWithRouter(<Login />);
  const loginTitle = screen.getByText(/PLEASE SIGN IN/);
  expect(loginTitle).toBeInTheDocument();
});

it('Should correctly send to register page when click at join now', () => {
  const { history } = renderWithRouter(<Login />);

  const joinLink = screen.getByText(/Join Now/i);
  expect(joinLink).toBeInTheDocument();

  userEvent.click(joinLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/register');
});

it('Login inputs work correctly', () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByPlaceholderText(/Email Address/i);
  userEvent.type(emailInput, 'carlos@gmail.com');
  expect(emailInput.value).toContain('carlos@gmail.com');

  const passwordInput = screen.getByPlaceholderText(/Password/i);
  userEvent.type(passwordInput, 'batatafrita');

  const logInButton = screen.getByText(/Log In/i);
  expect(logInButton).toBeInTheDocument();
  userEvent.click(logInButton);
});
