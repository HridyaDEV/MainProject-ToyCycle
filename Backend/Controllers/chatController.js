const Message = require("../Models/messageModel");
const User = require("../Models/userModel");


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



exports.getAllChats = async (req, res) => {
  const userId = req.userId;

  try {
    // Step 1: Find all messages where user is either sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ timestamp: -1 }) // latest first
      .populate("sender", "userName email")    
      .populate("receiver", "userName email");

    const latestChats = {};

    // Step 2: Group by roomId and take the latest message
    for (const msg of messages) {
      if (!latestChats[msg.roomId]) {
        latestChats[msg.roomId] = msg;
      }
    }

    // Step 3: Return as array
    const chatList = Object.values(latestChats);
    res.status(200).json(chatList);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ message: "Error retrieving chat list" });
  }
};


exports.getOtherUserName = async (req, res) => {
  const { roomId } = req.params;
  const currentUserId = req.userId;

  try {
    const [id1, id2] = roomId.split("_");
    const otherUserId = id1 === currentUserId ? id2 : id1;

    const otherUser = await User.findById(otherUserId).select("userName");

    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userName: otherUser.userName });
  } catch (err) {
    console.error("Failed to get other user name:", err);
    res.status(500).json({ message: "Server error" });
  }
};
