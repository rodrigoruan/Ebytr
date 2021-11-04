require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGODB_URI } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'tasks';
let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGODB_URI, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;
