const express = require('express');
const cors = require('cors');
const moviesRoutes = require('./route/moviesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Use the movies routes
app.use('/api', moviesRoutes);

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

module.exports = app;