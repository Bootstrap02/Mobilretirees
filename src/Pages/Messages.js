// pages/Messages.jsx
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
      return;
    }
  setMessages(userData.messages || []);
  }, [navigate]);

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-[#001F5B] text-center mb-16">
            Message Admin
          </h1>

          {/* Chat History */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 h-96 overflow-y-auto space-y-6">
            {error && <p className="text-red-600 text-center">{error}</p>}
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 text-xl">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`flex ${msg.user === msg.createdBy ? 'justify-start' : 'justify-end'}`} // Admin (no user) on left, user on right
                >
                  <div 
                    className={`max-w-xl p-6 rounded-2xl shadow-lg ${
                     msg.createdBy ? 'bg-gray-100 text-[#001F5B]' : 'bg-[#E30613] text-white'
                    }`}
                  >
                    <p className="text-lg mb-2">{msg.content}</p>
                    <p className="text-sm opacity-70 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Send New Message (always shown) */}
          <form onSubmit={handleSend} className="flex items-center gap-4 max-lg:gap-0 bg-white rounded-3xl shadow-2xl p-4 max-lg:p-0">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to Admin..."
              className="flex-1 p-4 max-lg:p-0 bg-gray-300 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition resize-none h-20"
              required
            />
            <button 
              type="submit"
              className="bg-[#E30613] hover:bg-[#c20511] text-white p-6 max-lg:p-2 rounded-full shadow-2xl transition transform hover:scale-110"
            >
              <FiSend className="text-3xl max-lg:text-sm" />
            </button>
          </form>

          {/* Back Button */}
          <div className="text-center mt-16">
            <NavLink 
              to="/dashboard"
              className="inline-flex items-center gap-3 text-[#E30613] font-bold text-xl hover:underline"
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