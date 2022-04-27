const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const shirtsRoutes = express.Router();
module.exports = shirtsRoutes;

// 2.2 GET "/shirts" - išmeta 10 pigiausių marškinių (naudojam MySQL LIMIT ir ORDER BY).

shirtsRoutes.get('/shirts', async (req, res) => {
  let connection;
  try {
    // 1 prisijungti
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    // 2 atlikti veiksma
    const sql = 'SELECT * FROM `shirts` ORDER BY price ASC LIMIT 2';
    const [rows, fields] = await connection.query(sql);
    res.json(rows);
  } catch (error) {
    // // err gaudom klaidas
    console.log('home route error ===', error);
    res.status(500).json('something went wrong');
  } finally {
    // 3 atsijungti
    if (connection) connection.end();
    // connection?.close();
  }
});

// POST "/shirts" - įrašo vienus marškinius. //
