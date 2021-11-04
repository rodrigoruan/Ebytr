import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { LocalStorageMock } from '@react-mock/localstorage';
import Home from '../pages/Home';
import '@testing-library/jest-dom';

const renderComponent = ({ token }) => render(
  <LocalStorageMock items={{ token }}>
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Home />
    </Router>
  </LocalStorageMock>,
);

it('renders correctly Home page screen', async () => {
  const { TOKEN } = process.env;

  renderComponent({
    token: TOKEN,
  });

  const inputTask = await screen.findByPlaceholderText(/Add a task here.../i);
  expect(inputTask).toBeInTheDocument();

  userEvent.type(inputTask, 'Fazer bolo');
  expect(inputTask.value).toContain('Fazer bolo');

  const addTaskButton = await screen.findByAltText(/add task icon/i);
  expect(addTaskButton).toBeInTheDocument();
  userEvent.click(addTaskButton);
});
