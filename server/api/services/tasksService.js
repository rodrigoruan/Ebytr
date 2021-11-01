const jwt = require('jsonwebtoken');
const models = require('../models/tasksModel');
const { getAllAdmins } = require('../models/usersModel');
const { validateData } = require('../validations/validations');

const { SECRET } = process.env;

const errorMessage = { error: 'invalid data' };

const getAllTasks = async () => models.getAllTasks();

const addTask = async (description, name, email) => {
  const momentDate = new Date();
  const response = await models.addTask(description, name, email, momentDate);
  return response;
};

const deleteTask = async (id, token, email) => {
  const decodedJwt = jwt.verify(token, SECRET).data;
  const allAdmins = await getAllAdmins();
  const userIsAdmin = allAdmins.some((admin) => admin.email === email);
  const userOwnsTask = email === decodedJwt;

  if (!userIsAdmin || !userOwnsTask || validateData(id, token, email)) {
    return errorMessage;
  }

  const response = await models.deleteTask(id);
  return response;
};

const editTask = async (id, description, name, email, token) => {
  const decodedJwt = jwt.verify(token, SECRET).data;
  const allAdmins = await getAllAdmins();
  const userIsAdmin = allAdmins.some((admin) => admin.email === email);
  const userOwnsTask = email === decodedJwt;

  if (!userIsAdmin || !userOwnsTask || validateData(id, token, email)) {
    return errorMessage;
  }

  const response = await models.editTask(id, description, name);
  return response;
};

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
};
