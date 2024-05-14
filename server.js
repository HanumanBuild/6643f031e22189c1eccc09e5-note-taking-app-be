const express = require('express');
const app = express();
const PORT = 3000;

// START MONGOOSE SETUP
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
// END MONGOOSE SETUP

app.use(express.json());

// START Import authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
// END Import authentication routes

// START Import notes routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);
// END Import notes routes

app.get('/', (req, res) => {
  res.send('Hello from Note-Taking App Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});