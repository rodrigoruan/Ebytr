const models = require('../models/usersModel');

const errorMessage = (message) => ({ error: message });

const createUser = async (email, name, password) => {
  if (!email || !name || !password) {
    return errorMessage('invalid data');
  }

  if (!/^\w+@\w+\.com(\.br)?$/.test(email)) {
    return errorMessage('invalid email format');
  }

  const response = await models.createUser(email, name, password);

  return response;
};

module.exports = {
  
}