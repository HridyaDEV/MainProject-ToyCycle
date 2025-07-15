import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getMessageList } from "../Api/chatApi";
import { jwtDecode } from "jwt-decode";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        // Decode token to get userId
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);

        const data = await getMessageList(token);
        setMessages(data);
        console.log("Fetched chats:", data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-amber-800 hover:text-amber-600 text-sm flex items-center mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Profile
      </button>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Your Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500 italic">You have no messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            if (!msg.sender || !msg.receiver) return null;

            const otherUser =
              msg.sender._id === currentUserId ? msg.receiver : msg.sender;

            return (
              <div
                key={msg._id}
                className="bg-white shadow border border-amber-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/chat/${msg.roomId}`)}
              >
                <p className="font-semibold text-amber-900">
                  Chat with: {otherUser.userName}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {msg.message?.slice(0, 60) || "No message content"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllMessages;
