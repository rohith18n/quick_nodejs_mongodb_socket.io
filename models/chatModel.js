const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: String,
    createdBy: String,
    messages: [
        {
            chatEntryId: String,
            message: String,
            sender: String,
            isUser: Boolean,
            time: Date,
        },
    ],
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
