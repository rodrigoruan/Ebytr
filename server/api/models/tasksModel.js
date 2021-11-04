const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllTasks = () => connection().then((db) => db.collection('tasks').find().toArray());

const addTask = (description, name, email, momentDate) => connection()
  .then((db) => db.collection('tasks').insertOne({
    description,
    name,
    email,
    momentDate,
    status: 'pending',
  }))
  .then((response) => ({
    _id: response.insertedId,
    description,
    name,
    momentDate,
  }));

const deleteTask = (id) => connection()
  .then((db) => db.collection('tasks').deleteOne({ _id: ObjectID(id) }))
  .then(() => ({ id }));

const editTask = (id, description, name, status) => connection()
  .then((db) => db
    .collection('tasks')
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name, description, status } },
    ))
  .then(({ value: { momentDate } }) => ({
    id,
    description,
    name,
    momentDate,
    status,
  }));

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
};
