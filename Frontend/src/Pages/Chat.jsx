import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

const socket = io("http://localhost:5115");

const Chat = () => {
  const { state } = useLocation();
console.log("Chat page state:", state);

  const navigate = useNavigate();

  const user = state?.user;
  const otherUser = state?.otherUser;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  // 🛡️ Guard: If user or otherUser is missing, redirect or show message
  useEffect(() => {
    if (!user || !otherUser) {
      navigate("/"); // Redirect to home or login if needed
    }
  }, [user, otherUser, navigate]);

  if (!user || !otherUser) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Missing chat data. Redirecting...
      </div>
    );
  }

  const roomId = [user._id, otherUser._id].sort().join("_");

  // Join room & fetch old messages
  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    axios
      .get(`http://localhost:5115/chat/messages/${user._id}/${otherUser._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [roomId]);

  // Listen for new messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      roomId,
      sender: user._id,
      receiver: otherUser._id,
      message: input,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, { sender: user._id, message: input }]);
    setInput("");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* App Header */}
      <header className="items-center bg-white shadow-lg px-6 py-3 sticky top-0 z-10">
        <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>
      </header>

      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 shadow bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white text-lg uppercase">
            {otherUser.userName?.charAt(0)}
          </div>
          <div>
            <h1 className="text-lg font-semibold">{otherUser.userName}</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.sender === user._id
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex items-center gap-2 p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-500 p-3 rounded-full text-white hover:bg-amber-600 transition"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;
