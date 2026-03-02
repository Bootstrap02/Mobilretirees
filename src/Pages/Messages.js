// // pages/Messages.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import { FiSend } from 'react-icons/fi';
// import axios from 'axios';

// const Messages = () => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     if (!userData) {
//       navigate('/signin');
//       return;
//     }
//   setMessages(userData.messages || []);
//   }, [navigate]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const userData = JSON.parse(localStorage.getItem('userData'));
//     try {
//       const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreatemessages/usercreatemessage', {
//         id: userData._id,
//         content: newMessage.trim(),
//       });

//       // Add new message to UI
//       const newMsg = res.data.message; // Assume response has the created message
//       setMessages([...messages, newMsg]);
//       setNewMessage('');
//     } catch (err) {
//       setError('Failed to send message');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 pt-24 pb-20">
//         <div className="max-w-4xl mx-auto px-6">
//           <h1 className="text-5xl font-extrabold text-[#001F5B] text-center mb-16">
//             Message Admin
//           </h1>

//           {/* Chat History */}
//           <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 h-96 overflow-y-auto space-y-6">
//             {error && <p className="text-red-600 text-center">{error}</p>}
//             {messages.length === 0 ? (
//               <p className="text-center text-gray-500 text-xl">No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div 
//                   key={msg._id} 
//                   className={`flex ${msg.user === msg.createdBy ? 'justify-start' : 'justify-end'}`} // Admin (no user) on left, user on right
//                 >
//                   <div 
//                     className={`max-w-xl p-6 rounded-2xl shadow-lg ${
//                      msg.createdBy ? 'bg-gray-100 text-[#001F5B]' : 'bg-[#E30613] text-white'
//                     }`}
//                   >
//                     <p className="text-lg mb-2">{msg.content}</p>
//                     <p className="text-sm opacity-70 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Send New Message (always shown) */}
//           <form onSubmit={handleSend} className="flex items-center gap-4 max-lg:gap-0 bg-white rounded-3xl shadow-2xl p-4 max-lg:p-0">
//             <textarea
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message to Admin..."
//               className="flex-1 p-4 max-lg:p-0 bg-gray-300 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition resize-none h-20"
//               required
//             />
//             <button 
//               type="submit"
//               className="bg-[#E30613] hover:bg-[#c20511] text-white p-6 max-lg:p-2 rounded-full shadow-2xl transition transform hover:scale-110"
//             >
//               <FiSend className="text-3xl max-lg:text-sm" />
//             </button>
//           </form>

//           {/* Back Button */}
//           <div className="text-center mt-16">
//             <NavLink 
//               to="/dashboard"
//               className="inline-flex items-center gap-3 text-[#E30613] font-bold text-xl hover:underline"
//             >
//               ← Back to Dashboard
//             </NavLink>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Messages;
// pages/Messages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
      return;
    }
    setMessages(userData.messages || []);
  }, [navigate]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userData = JSON.parse(localStorage.getItem('userData'));
    try {
      const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreatemessages/usercreatemessage', {
        id: userData._id,
        content: newMessage.trim(),
      });

      // Add new message to UI
      const newMsg = res.data.message; // Assume response has the created message
      setMessages([...messages, newMsg]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  // Handle Enter key for send (without Shift for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001F5B] text-center mb-8 lg:mb-16">
            Message Admin
          </h1>

          {/* Chat History */}
          <div 
            ref={chatContainerRef}
            className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 h-[calc(100vh-24rem)] sm:h-[calc(100vh-28rem)] lg:h-[calc(100vh-32rem)] overflow-y-auto space-y-4 lg:space-y-6 scrollbar-thin scrollbar-thumb-[#E30613] scrollbar-track-gray-100"
          >
            {error && (
              <p className="text-red-600 text-center text-sm sm:text-base lg:text-lg bg-red-100 p-3 rounded-xl">
                {error}
              </p>
            )}
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 text-base sm:text-lg lg:text-xl py-8 lg:py-16">
                No messages yet. Start a conversation!
              </p>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`flex items-end gap-3 sm:gap-4 animate-fadeIn ${msg.user === msg.createdBy ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.user !== msg.createdBy && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#001F5B] flex items-center justify-center text-white text-xs sm:text-sm lg:text-base font-bold shrink-0">
                      A
                    </div>
                  )}
                  <div 
                    className={`max-w-[70%] sm:max-w-[60%] lg:max-w-[50%] p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md transition-all hover:shadow-lg ${
                      msg.user === msg.createdBy 
                        ? 'bg-gray-100 text-[#001F5B]' 
                        : 'bg-[#E30613] text-white'
                    }`}
                  >
                    <p className="text-sm sm:text-base lg:text-lg mb-2 break-words">{msg.content}</p>
                    <p className="text-xs opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.user === msg.createdBy && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#E30613] flex items-center justify-center text-white text-xs sm:text-sm lg:text-base font-bold shrink-0">
                      U
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Send New Message */}
          <form onSubmit={handleSend} className="flex items-end gap-2 sm:gap-3 lg:gap-4 bg-white rounded-3xl shadow-2xl p-3 sm:p-4 lg:p-5">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message to Admin..."
              className="flex-1 p-3 sm:p-4 lg:p-5 border-2 border-gray-200 rounded-2xl text-sm sm:text-base lg:text-xl focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 transition resize-none min-h-[2.5rem] max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-[#E30613]"
              required
            />
            <button 
              type="submit"
              className="bg-[#E30613] hover:bg-[#c20511] text-white p-3 sm:p-4 lg:p-6 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95"
            >
              <FiSend className="text-xl sm:text-2xl lg:text-3xl" />
            </button>
          </form>

          {/* Back Button */}
          <div className="text-center mt-8 lg:mt-16">
            <NavLink 
              to="/dashboard"
              className="inline-flex items-center gap-3 text-[#E30613] font-bold text-base sm:text-lg lg:text-xl hover:underline transition-colors"
            >
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;