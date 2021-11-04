import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Register from '../pages/Register';
import '@testing-library/jest-dom/extend-expect';

it('renders correctly Register page screen', () => {
  renderWithRouter(<Register />);
  const loginTitle = screen.getByText(/SIGN UP/);
  expect(loginTitle).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText(/Name/i);
  userEvent.type(nameInput, 'marcos');
  expect(nameInput.value).toContain('marcos');

  const emailInput = screen.getByPlaceholderText(/Email/i);
  userEvent.type(emailInput, 'marcos@gmail.com');
  expect(emailInput.value).toContain('marcos@gmail.com');

  const passwordInput = screen.getByPlaceholderText(/Password/i);
  userEvent.type(passwordInput, 'batataassada');
  expect(passwordInput.value).toContain('batataassada');

  const createAccountButton = screen.getByText(/Create account/i);
  expect(createAccountButton).toBeInTheDocument();
  userEvent.click(createAccountButton);
});
