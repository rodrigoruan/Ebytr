import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';
import '@testing-library/jest-dom/extend-expect';

it('renders correctly Home page screen', () => {
  renderWithRouter(<Login />);
  const loginTitle = screen.getByText(/PLEASE SIGN IN/);
  expect(loginTitle).toBeInTheDocument();
});

it('Should render correctly register page when click at join now', () => {
  const { history } = renderWithRouter(<Login />);

  const joinLink = screen.getByText(/Join Now/i);
  expect(joinLink).toBeInTheDocument();

  userEvent.click(joinLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/register');
});
