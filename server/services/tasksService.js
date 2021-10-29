const models = require('../models/tasksModel');

const getAllTasks = async () => models.getAllTasks();

const addTask = async (description, name) => {
  const momentDate = new Date();
  const response = await models.addTask(description, name, momentDate);
  return response;
};

const deleteTask = async (id) => models.deleteTask(id);

const editTask = async (id, description, name) => models.editTask(id, description, name);

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
};
