const connection = require('./connection');

const getAllTasks = async () => connection().then((db) => db.collection('tasks').find().toArray());

module.exports = {
  getAllTasks,
};
