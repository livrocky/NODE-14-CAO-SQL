const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors('cors'));

// 2.1. GET "/" - išmeta, kad serveris funkcionuoja.

app.listen(PORT, () => console.log('express is online', PORT));
