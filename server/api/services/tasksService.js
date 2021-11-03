const jwt = require('jsonwebtoken');

const models = require('../models/tasksModel');

const { validateData } = require('../validations/validations');
const { userOwnsTaskOrIsAdmin } = require('../validations/validations');

const { SECRET } = process.env;

const errorMessage = { error: 'invalid data' };

const getAllTasks = async () => models.getAllTasks();

const addTask = async (description, name, email) => {
  if (validateData(description, name, email)) return errorMessage;

  const momentDate = new Date();

  const response = await models.addTask(description, name, email, momentDate);

  return response;
};

const deleteTask = async (id, token) => {
  const decodedJwt = jwt.verify(token, SECRET).data;
  const { email } = decodedJwt;

  if (userOwnsTaskOrIsAdmin(id, email) || validateData(id, token)) {
    return errorMessage;
  }

  const response = await models.deleteTask(id);

  return response;
};

const editTask = async (id, description, token, status) => {
  const decodedJwt = jwt.verify(token, SECRET).data;
  const { email, name } = decodedJwt;

  if (userOwnsTaskOrIsAdmin(id, email) || validateData(id, email, name, status)) {
    return errorMessage;
  }

  const response = await models.editTask(id, description, name, status);

  return response;
};

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
};
