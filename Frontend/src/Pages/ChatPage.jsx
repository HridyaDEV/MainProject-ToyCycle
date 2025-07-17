import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import io from "socket.io-client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import {
  getMessages,
  getOtherUserInfo,
} from "../Api/chatApi"; // ⬅️ API imports

const socket = io("http://localhost:5115");

const ChatPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUserName, setOtherUserName] = useState("User");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !roomId) return;

    socket.emit("joinRoom", { roomId });

    const [user1, user2] = roomId.split("_");
    const otherUserId = user1 === user._id ? user2 : user1;

    const fetchChatData = async () => {
      try {
        const msgs = await getMessages(user1, user2, token);
        setMessages(msgs);

        const otherUser = await getOtherUserInfo(roomId, token);
        setOtherUserName(otherUser.userName);
      } catch (err) {
        console.error("Chat loading error:", err);
      }
    };

    fetchChatData();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("receiveMessage");
    };
  }, [roomId, user, token]);

  useLayoutEffect(() => {
   
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const receiverId = roomId.split("_").find((id) => id !== user._id);

    const msgData = {
      roomId,
      sender: user._id,
      receiver: receiverId,
      message,
    };

    socket.emit("sendMessage", msgData);

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
    <div className="flex flex-col h-screen bg-yellow-100">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-md">
        <h1 className="text-3xl font-extrabold text-amber-800">ToyCycle</h1>
      </header>

      {/* Back Button */}
      <div className="px-10 py-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>

      {/* Chat Card */}
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white w-full max-w-3xl h-[90%] shadow-lg rounded-2xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-yellow-500 text-white px-6 py-4 rounded-t-2xl shadow-sm">
            <h2 className="text-xl font-semibold">Seller: {otherUserName}</h2>
          </div>

          {/* Chat Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-gray-50 scroll-smooth"
            ref={chatContainerRef}
          >
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

          {/* Input Field */}
          <form
            onSubmit={sendMessage}
            className="flex px-4 py-3 bg-gray-50 items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-amber-950 p-2 rounded-lg outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-semibold px-4 py-2 rounded-xl"
            >
              <IoIosSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
