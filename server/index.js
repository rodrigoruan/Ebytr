const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./controllers/tasksController'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
