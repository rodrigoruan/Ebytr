import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';
import '@testing-library/jest-dom';

it('renders correctly Home page screen', () => {
  const { history } = renderWithRouter(<Header name="João" logOutUser={() => localStorage.clear()} />);
  const userName = screen.getByText(/João/i);
  expect(userName).toBeInTheDocument();

  const logOutButton = screen.getByText(/Log Out/i);
  expect(logOutButton).toBeInTheDocument();

  userEvent.click(logOutButton);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
