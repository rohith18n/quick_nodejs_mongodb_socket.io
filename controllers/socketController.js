const chatController = require('./chatControllers');

function initializeSocket(io) {
  io.on('connection', async (socket) => {
    try {
      console.log('User connected:', socket.id);

      socket.on('joinChatRoom', async (data) => {
        await chatController.joinChatRoom(socket, data);
      });

      socket.on('loadChatEntries', async () => {
        await chatController.loadChatEntries(socket);
      });

      socket.on('createChatEntry', async (data) => {
        await chatController.createChatEntry(io, data);
      });
      

      socket.on('loadMessages', async (data) => {
        await chatController.loadMessages(socket, data);
      });

      socket.on('message', async (data) => {
        await chatController.handleMessage(io, data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = initializeSocket;
