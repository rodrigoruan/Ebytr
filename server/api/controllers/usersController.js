const express = require('express');

const routes = express.Router();
const services = require('../services/usersService');

routes.post('/create', async (req, res) => {
  const { email, name, password } = req.password;

  const response = await services.createUser(email, name, password);
  res.status(200).json(response);
});
