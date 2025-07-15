// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const socket = io("http://localhost:5115");

// const Chat = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const scrollRef = useRef();

//   const [user, setUser] = useState(null);
//   const [otherUser, setOtherUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   // 1. Get current user from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) return navigate("/login");
//     setUser(storedUser);
//   }, []);

//   // 2. Get chat participants from backend
//   useEffect(() => {
//     const fetchParticipants = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5115/chat/participants/${roomId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const currentId = JSON.parse(localStorage.getItem("user"))._id;
//         const other = res.data.user._id === currentId ? res.data.otherUser : res.data.user;

//         setOtherUser(other);
//       } catch (err) {
//         console.error("Error loading participants:", err);
//         navigate("/messages");
//       }
//     };

//     fetchParticipants();
//   }, [roomId]);

//   // 3. Load previous messages and join room
//   useEffect(() => {
//     if (!user || !otherUser) return;

//     socket.emit("joinRoom", { roomId });

//     axios
//       .get(`http://localhost:5115/chat/messages/${user._id}/${otherUser._id}`)
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error("Message fetch error", err));
//   }, [user, otherUser, roomId]);

//   // 4. Handle incoming socket messages
//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socket.off("receiveMessage");
//   }, []);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const msg = {
//       roomId,
//       sender: user._id,
//       receiver: otherUser._id,
//       message: input,
//     };

//     socket.emit("sendMessage", msg);
//     setMessages((prev) => [...prev, { ...msg }]);
//     setInput("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!user || !otherUser) {
//     return <div className="text-center text-red-500 mt-20">Loading chat...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <header className="bg-white p-4 shadow-md sticky top-0 z-10">
//         <h1 className="text-2xl font-bold text-amber-900">Chat with {otherUser.userName}</h1>
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`max-w-md px-4 py-2 rounded-xl ${
//               msg.sender === user._id
//                 ? "ml-auto bg-yellow-400 text-white"
//                 : "mr-auto bg-white text-black border"
//             }`}
//           >
//             {msg.message}
//           </div>
//         ))}
//         <div ref={scrollRef} />
//       </div>

//       <form
//         onSubmit={handleSend}
//         className="flex items-center gap-2 p-4 border-t bg-white"
//       >
//         <input
//           type="text"
//           className="flex-1 border px-4 py-2 rounded-full"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-amber-500 text-white px-4 py-2 rounded-full"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
