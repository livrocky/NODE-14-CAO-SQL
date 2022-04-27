require('dotenv').config();

const PORT = process.env.PORT || 5000;

// db config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'second_db',
  port: '8889',
};

module.exports = {
  PORT,
  dbConfig,
};
