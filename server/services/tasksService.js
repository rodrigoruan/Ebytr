const models = require('../models/tasksModel');

const getAllTasks = async () => models.getAllTasks();

const addTask = async (description, name) => {
  const momentDate = new Date();
  const response = await models.addTask(description, name, momentDate);
  return response;
};

module.exports = {
  getAllTasks,
  addTask,
};
