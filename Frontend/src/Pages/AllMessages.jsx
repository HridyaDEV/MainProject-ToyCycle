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
    <div className="min-h-screen bg-amber-50 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-lg px-6 py-3 sticky top-0 z-10">
        <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>
      </header>

      <div className="p-6 flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-800 hover:text-amber-600 text-sm flex items-center mb-4 self-start"
        >
          <FaArrowLeft className="mr-2" /> Back to Profile
        </button>

        <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          Your Messages
        </h1>

        {messages.length === 0 ? (
          <p className="text-gray-500 italic text-center">You have no messages yet.</p>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-full">
            {messages.map((msg) => {
              if (!msg.sender || !msg.receiver) return null;

              const otherUser =
                msg.sender._id === currentUserId ? msg.receiver : msg.sender;

              return (
                <div
                  key={msg._id}
                  onClick={() => navigate(`/chat/${msg.roomId}`)}
                  className="bg-white shadow border border-amber-200 rounded-lg p-4 w-full max-w-md cursor-pointer hover:shadow-md transition"
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
    </div>
  );
};

export default AllMessages;
