const models = require('../models/tasksModel');

const getAllTasks = async () => models.getAllTasks();

module.exports = {
  getAllTasks,
};
