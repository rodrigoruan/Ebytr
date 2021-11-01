// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createUser = async (email, name, password) => connection()
  .then((db) => db.collection('users').insertOne({ email, name, password }))
  .then((response) => ({
    id: response.insertedId,
    email,
    name,
  }));

const loginUser = async (email, password) => connection().then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  createUser,
  loginUser,
};
