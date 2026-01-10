// pages/Messages.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiSend } from 'react-icons/fi';

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
      return;
    }

    // Dummy API fetch simulation - replace with real HTTPS fetch
    const fetchMessages = async () => {
      try {
        // Real API: fetch('https://your-api.com/messages', { headers: { Authorization: `Bearer ${userData.token}` } })
        // Dummy data
        const dummyMessages = [
          {
            id: 1,
            sender: 'Admin',
            content: 'Welcome to EMRAN! How can we assist you today?',
            timestamp: '2026-01-08 14:30:00'
          },
          {
            id: 2,
            sender: 'User',
            content: 'I have a question about my pension payment.',
            timestamp: '2026-01-08 15:45:00'
          },
          {
            id: 3,
            sender: 'Admin',
            content: 'Sure, please provide your staff ID for verification.',
            timestamp: '2026-01-09 09:15:00'
          }
        ];
        setMessages(dummyMessages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Real API: await fetch('https://your-api.com/messages/send', { method: 'POST', body: JSON.stringify({ content: newMessage }) })
      // Dummy simulation
      const newMsg = {
        id: messages.length + 1,
        sender: 'User',
        content: newMessage,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading messages...</div>;

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
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xl p-6 rounded-2xl shadow-lg ${
                    msg.sender === 'User' 
                      ? 'bg-[#E30613] text-white' 
                      : 'bg-gray-100 text-[#001F5B]'
                  }`}
                >
                  <p className="text-lg mb-2">{msg.content}</p>
                  <p className="text-sm opacity-70 text-right">{new Date(msg.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Send New Message */}
          <form onSubmit={handleSend} className="flex items-center gap-4 bg-white rounded-3xl shadow-2xl p-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to Admin..."
              className="flex-1 p-4 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition resize-none h-20"
              required
            />
            <button 
              type="submit"
              className="bg-[#E30613] hover:bg-[#c20511] text-white p-6 rounded-full shadow-2xl transition transform hover:scale-110"
            >
              <FiSend className="text-3xl" />
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