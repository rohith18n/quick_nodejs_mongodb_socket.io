const ChatModel = require('../models/chatModel');

async function joinChatRoom(socket, data) {
  const { chatEntryId } = data;
  socket.join(chatEntryId);
  const chatEntry = await ChatModel.findById(chatEntryId).lean().exec();
  if (chatEntry) {
    socket.to(chatEntryId).emit('loadMessages', chatEntry.messages);
  }
}

async function loadChatEntries(socket) {
  const chatEntries = await ChatModel.find({}).lean().exec();
  socket.emit('chatEntries', chatEntries);
}

async function createChatEntry(io, data) {
    try {
      const { chatName, createdBy } = data; // Extract chatName from data
      const newChatEntry = new ChatModel({ chatName: chatName, createdBy:createdBy, messages: [] });
      await newChatEntry.save();
      io.emit('newChatEntry', [newChatEntry]);
    } catch (error) {
      console.error('Error creating chat entry:', error);
    }
  }
  

async function loadMessages(socket, data) {
  const { chatEntryId } = data;
  const doc = await ChatModel.findOne({ _id: chatEntryId }).lean().exec();
  if (doc) {
    socket.emit('loadMessages', doc.messages);
  }
}

async function handleMessage(io, data) {
  try {
    await ChatModel.updateOne(
      { _id: data.chatEntryId },
      { $push: { messages: data } }
    );
    io.to(data.chatEntryId).emit('message', data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  joinChatRoom,
  loadChatEntries,
  createChatEntry,
  loadMessages,
  handleMessage,
};
