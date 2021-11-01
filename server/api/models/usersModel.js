// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const addUser = async (email, name, password) => connection().then((db) => db.collection('users').insertOne({ email, name, password }))
  .then((response) => ({
    id: response.insertedId,
    email,
    name,
  }));

module.exports = {
  addUser,
};
