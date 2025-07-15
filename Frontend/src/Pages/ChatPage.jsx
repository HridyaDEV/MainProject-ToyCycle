import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const socket = io("http://localhost:5115"); 

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !roomId) return;

    // Join the chat room
    socket.emit("joinRoom", { roomId });

    const [user1, user2] = roomId.split("_");

    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5115/chat/messages/${user1}/${user2}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchChatHistory();

    // Listen for new messages from the server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup when component unmounts
    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("receiveMessage");
    };
  }, [roomId, user, token]);

  useEffect(() => {
    // Auto-scroll to latest message
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const receiverId = roomId.split("_").find((id) => id !== user._id);

    const msgData = {
      roomId,
      sender: user._id,
      receiver: receiverId,
      message,
    };

    // Emit the message
    socket.emit("sendMessage", msgData);

    // Optimistically add the message to local state
    setMessages((prev) => [
      ...prev,
      {
        sender: user._id,
        receiver: receiverId,
        message,
        timestamp: new Date(),
      },
    ]);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-yellow-500 text-white text-xl font-bold text-center">
        Chat Room
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-xl shadow-md ${
              msg.sender === user._id
                ? "bg-yellow-300 self-end ml-auto"
                : "bg-white self-start mr-auto"
            }`}
          >
            <p className="text-sm">{msg.message}</p>
            <p className="text-[11px] text-gray-600 text-right mt-1">
              {msg.timestamp &&
                new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="flex p-4 bg-white shadow-md items-center gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded-lg outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
