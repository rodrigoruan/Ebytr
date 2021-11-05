const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 5000;
const tasksRoutes = require('./routes/tasksRoute');
const usersRoutes = require('./routes/usersRoute');

app.use(cors());
app.use(express.json());
app.use('/', tasksRoutes);
app.use('/users', usersRoutes);

if (!module.parent) {
  app.listen(port);
}

module.exports = app;
