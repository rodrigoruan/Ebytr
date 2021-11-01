const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllTasks = async () => connection().then((db) => db.collection('tasks').find().toArray());

const addTask = async (description, name, email, momentDate) => connection()
  .then((db) => db.collection('tasks').insertOne({
    description, name, email, momentDate,
  }))
  .then((response) => ({
    _id: response.insertedId,
    description,
    name,
    momentDate,
  }));

const deleteTask = async (id) => connection()
  .then((db) => db.collection('tasks').deleteOne({ _id: ObjectID(id) }))
  .then(() => ({ id }));

const editTask = async (id, description, name) => connection()
  .then((db) => db
    .collection('tasks')
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name, description } },
    ))
  .then(({ value: { momentDate } }) => ({
    id,
    description,
    name,
    momentDate,
  }));

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
};
