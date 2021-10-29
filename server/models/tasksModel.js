const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllTasks = async () => connection().then((db) => db.collection('tasks').find().toArray());

const addTask = async (description, name, momentDate) => connection()
  .then((db) => db.collection('tasks').insertOne({ description, name, momentDate }))
  .then((response) => ({
    _id: response.insertedId,
    description,
    name,
    momentDate,
  }));

const deleteTask = async (id) => connection().then((db) => db.collection('tasks').deleteOne({ _id: ObjectID(id) }))
  .then(() => ({ id }));

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
};
