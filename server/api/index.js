const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 5000;
const tasksRoutes = require('./controllers/tasksController');
const usersRoutes = require('./controllers/usersController');

app.use(cors());
app.use(express.json());
app.use('/', tasksRoutes);
app.use('/users', usersRoutes);

app.listen(port);

module.exports = app;
