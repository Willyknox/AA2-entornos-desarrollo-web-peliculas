const express = require('express');
const cors = require('cors');
const moviesRoutes = require('./route/moviesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Use the movies routes
app.use('/api', moviesRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Backend server started on port ${PORT}`);
});
