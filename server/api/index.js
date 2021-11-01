const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 5000;
const routes = require('./controllers/tasksController');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);

module.exports = app;
