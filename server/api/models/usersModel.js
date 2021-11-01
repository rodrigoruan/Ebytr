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

const createAdmin = async (email, password, name) => connection()
  .then((db) => db.collection('users').insertOne({
    email,
    password,
    name,
    admin: true,
  }))
  .then((response) => ({ id: response.insertedId, email, password }));

const getAllAdmins = async () => connection().then((db) => db.collection('users').find({ admin: true }).toArray());

module.exports = {
  createUser,
  loginUser,
  createAdmin,
  getAllAdmins,
};
