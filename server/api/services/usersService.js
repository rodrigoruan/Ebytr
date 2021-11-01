const models = require('../models/usersModel');
const {
  validateData,
  validateEmailFormat,
} = require('../validations/validations');

const errorMessage = { error: 'invalid data' };

const createUser = async (email, name, password) => {
  if (validateData(email, name, password) || validateEmailFormat(email)) {
    return errorMessage;
  }

  const response = await models.createUser(email, name, password);

  return response;
};

const loginUser = async (email, password) => {
  if (validateData(email, password) || validateEmailFormat(email)) {
    return errorMessage;
  }

  const response = await models.loginUser(email, password);

  return response;
};

const createAdmin = async (email, password, name, code) => {
  if (
    validateData(email, password, name)
    || validateEmailFormat(email)
    || code !== 'xablau'
  ) {
    return errorMessage;
  }

  const response = await models.createAdmin(email, password, name);

  return response;
};

const loginAdmin = async (email, password) => {
  if (validateData(email, password) || validateEmailFormat(email)) {
    return errorMessage;
  }

  const response = await models.createAdmin(email, password);

  return response;
};

module.exports = {
  createUser,
  loginUser,
  createAdmin,
  loginAdmin,
};
