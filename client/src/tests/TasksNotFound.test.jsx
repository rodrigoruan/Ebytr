import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import TasksNotFound from '../components/TasksNotFound';
import '@testing-library/jest-dom';

it('renders correctly Home page screen', () => {
  renderWithRouter(<TasksNotFound />);
  const notTasksFound = screen.getByText(/Seems doesn‘t have any tasks yet.../i);
  expect(notTasksFound).toBeInTheDocument();
});
