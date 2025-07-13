const Message = require("./Models/messageModel");

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("sendMessage", async ({ roomId, sender, receiver, message }) => {
      try {
        const newMsg = new Message({ roomId, sender, receiver, message });
        await newMsg.save();

        io.to(roomId).emit("receiveMessage", {
          sender,
          message,
          timestamp: newMsg.timestamp,
        });
      } catch (err) {
        console.error("Error saving message:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketConnection;
