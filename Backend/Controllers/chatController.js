const Message = require("../Models/messageModel");

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const roomId = [user1, user2].sort().join("_");

  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load messages" });
  }
};
