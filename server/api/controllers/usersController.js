/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const services = require('../services/usersService');

const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const response = await services.createUser(email, name, password);

  const CODE = response.error ? 400 : 200;

  res.status(CODE).json(response);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const response = await services.loginUser(email, password);

  if (response.error) return res.status(401).json(response);

  const token = jwt.sign(
    { data: { email, name: response.name, admin: response.admin || false } },
    SECRET,
  );

  res.status(200).json(token);
};

module.exports = {
  createUser,
  loginUser,
};
