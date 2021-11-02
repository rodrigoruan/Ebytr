/* eslint-disable consistent-return */
const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const routes = express.Router();
const services = require('../services/usersService');

routes.post('/create', async (req, res) => {
  const { email, name, password } = req.body;
  const response = await services.createUser(email, name, password);
  const CODE = response.error ? 400 : 200;
  res.status(CODE).json(response);
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const response = await services.loginUser(email, password);

  if (response.error) {
    return res.status(400).json(response);
  }

  const token = jwt.sign(
    { data: { email, name: response.name, admin: response.admin || false } },
    SECRET,
  );

  res.status(200).json(token);
});

module.exports = routes;
