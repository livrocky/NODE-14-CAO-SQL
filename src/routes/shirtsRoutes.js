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
    const sql = 'SELECT * FROM `shirts` ORDER BY price ASC LIMIT 5';
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

shirtsRoutes.post('/shirts', async (req, res) => {
  let connection;
  try {
    const { brand, model, size, price } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO shirts (brand, model, size, price) VALUES (?, ?, ?, ?)`;
    const [rows] = await connection.execute(sql, [brand, model, size, price]);
    console.log('connected');
    res.json(rows);
  } catch (error) {
    // // err gaudom klaidas
    res.status(500).json('error in post shirts');
  } finally {
    await connection?.end();
  }
});

//Pakoreguojame GET "/shirts", kad leistų pagal dydį filtruoti ("/shirts/:size") ir grąžintų 10 pigiausių to dydžio'o. Tačiau jei dydis neparašytas - grąžintų, kaip ir anksčiau, visų dydžių 10 pigiausių.

shirtsRoutes.get('/shirts/:size', async (req, res) => {
  let connection;
  try {
    const { size } = req.params;
    console.log('size===', size);
    connection = await mysql.createConnection(dbConfig);
    // 2 atlikti veiksma

    const sql = 'SELECT * FROM shirts WHERE size = ? ORDER BY price ASC';
    const [rows] = await connection.query(sql, [size]);
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
