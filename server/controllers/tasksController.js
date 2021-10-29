const express = require('express');

const routes = express.Router();
const services = require('../services/tasksService');

routes.get('/', async (_req, res) => {
  const response = await services.getAllTasks();
  res.status(200).json(response);
});

routes.post('/', async (req, res) => {
  const { description, name } = req.body;
  const response = await services.addTask(description, name);
  res.status(204).json(response);
});

routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await services.deleteTask(id);
  res.status(200).json(response);
});

module.exports = routes;
