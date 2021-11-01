const express = require('express');

const routes = express.Router();
const services = require('../services/tasksService');

routes.get('/', async (_req, res) => {
  const response = await services.getAllTasks();
  res.status(200).json(response);
});

routes.post('/', async (req, res) => {
  const { description, name, email } = req.body;
  const response = await services.addTask(description, name, email);
  res.status(200).json(response);
});

routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const token = req.headers.authorization;
  const response = await services.deleteTask(id, token, email);
  res.status(204).json(response);
});

routes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, name, email } = req.body;
  const token = req.headers.authorization;
  const response = await services.editTask(id, description, name, email, token);
  res.status(200).json(response);
});

module.exports = routes;
