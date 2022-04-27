const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { PORT, dbConfig } = require('./config');
const shirtsRoutes = require('./routes/shirtsRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// 2.1. GET "/" - išmeta, kad serveris funkcionuoja. //
app.get('/', (req, res) => res.json('yellou'));

app.use('/api', shirtsRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ err: 'Tokio puslapio nera' });
});

app.listen(PORT, () => console.log('express is online', PORT));
