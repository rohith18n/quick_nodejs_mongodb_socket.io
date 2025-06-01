const express = require('express');
const http = require('http');
const https = require('https'); 

const socketIO = require('socket.io');
const connectToDatabase = require('./config/dbConfig');
const initializeSocket = require('./controllers/socketController');
const chatRouter = require('./routes/chatRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const cron = require("node-cron");

connectToDatabase();


initializeSocket(io);


app.get('/', (req, res) => {
  res.send('Welcome to Quick');
});

app.use('/chat', chatRouter);

cron.schedule('*/14 * * * *', () => {
  console.log('Pinging server to keep it alive...');
  https.get('https://quick-chat.onrender.com', (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Ping error:', err.message);
  });
});

module.exports = {
  app,
  server,
};
