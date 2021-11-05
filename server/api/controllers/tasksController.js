const services = require('../services/tasksService');

const getAllTasks = async (_req, res) => {
  const response = await services.getAllTasks();

  res.status(200).json(response);
};

const createTask = async (req, res) => {
  const { description, name, email } = req.body;

  const response = await services.addTask(description, name, email);

  const CODE = response.error ? 400 : 200;

  res.status(CODE).json(response);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const response = await services.deleteTask(id, token);

  const CODE = response.error ? 400 : 204;

  res.status(CODE).json(response);
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  const token = req.headers.authorization;

  const response = await services.editTask(id, description, token, status);

  const CODE = response.error ? 400 : 200;

  res.status(CODE).json(response);
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  editTask,
};
