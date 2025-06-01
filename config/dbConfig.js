const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.6xl5g.mongodb.net/pingr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}

module.exports = connectToDatabase;
