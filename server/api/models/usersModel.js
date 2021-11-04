const connection = require('./connection');

const getAllUsers = async () => connection().then((db) => db.collection('users').find().toArray());

const createUser = async (email, name, password) => connection()
  .then((db) => db.collection('users').insertOne({ email, name, password }))
  .then((response) => ({ id: response.insertedId, email, name }));

const loginUser = async (email, password) => connection().then((db) => db.collection('users').findOne({ email, password }));

const insertAdminUser = ({ name, email, password }) => connection()
  .then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    admin: true,
  }))
  .then((response) => ({ id: response.insertedId, name, email }));

const getAllAdmins = async () => connection().then((db) => db.collection('users').find({ admin: true }).toArray());

module.exports = {
  createUser,
  loginUser,
  getAllAdmins,
  insertAdminUser,
  getAllUsers,
};
