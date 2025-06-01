const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers');

// Define routes related to chat functionality
router.get('/chatEntries', async (req, res) => {
  try {
    const chatEntries = await chatController.getChatEntries();
    res.json(chatEntries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes as needed

module.exports = router;
