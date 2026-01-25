// pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiArrowLeft, FiCheckCircle, FiClock } from 'react-icons/fi';
import axios from "axios";


// Dummy data (replace with real API fetch later)
const dummyNotifications = [
  {
    id: 1,
    title: "Annual General Meeting Reminder",
    content: "Our AGM is scheduled for March 15, 2026 at Eko Hotel, Victoria Island. RSVP required by February 28, 2026. This is a mandatory meeting for all members. Agenda includes welfare updates, financial reports, and election of new officers.",
    time: "2 hours ago",
    read: false,
    type: "event",
    category: "Meetings",
  },
  {
    id: 2,
    title: "November Pension Credited",
    content: "Your November pension payment of ₦485,000 has been successfully credited to your account ending in 1234. Transaction reference: PEN-2025-1087. If not reflected within 24 hours, contact support.",
    time: "Yesterday at 09:15 AM",
    read: false,
    type: "pension",
    category: "Finance",
  },
  {
    id: 3,
    title: "Dues Expiry Notice",
    content: "Your annual membership dues expire on February 1, 2027. Renew now to maintain full benefits and voting rights. Late payment may incur penalties. Pay via the Dues section in your dashboard.",
    time: "3 days ago",
    read: true,
    type: "dues",
    category: "Membership",
  },
  {
    id: 4,
    title: "New Health Partnership Announced",
    content: "EMRAN has partnered with Reddington Hospital Group for expanded specialist care coverage. Members can now access cardiology, oncology, and orthopedic services at discounted rates.",
    time: "1 week ago",
    read: true,
    type: "health",
    category: "Health",
  },
];

const NotificationsPage = () => {
  const { id } = useParams(); // Get notification ID from URL
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

   const getNotification= async()=>{
    try {
      const res = await axios.get(`https://campusbuy-backend-nkmx.onrender.com/mobilcreatenotifications/${id}`);
      setNotification(res.data);
    } catch (err) {
      alert('Failed to get Notification.');
    }
  }

  useEffect(() => {
    // Simulate fetching single notification by ID
    getNotification()
    const found = dummyNotifications.find(n => n.id === parseInt(id));
    if (found) {
      setNotification(found);
    } else {
      // Handle not found (redirect or error)
      navigate('/dashboard');
    }
  }, [id, navigate]);

  if (!notification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading notification...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-[#E30613] hover:text-[#c20511] font-bold text-xl mb-10 transition"
          >
            <FiArrowLeft className="text-2xl" />
            Back to Notifications
          </button>

          {/* Notification Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-[#E30613]">
            {/* Category Badge */}
            <span className="inline-block px-5 py-2 rounded-full bg-[#E30613]/10 text-[#E30613] font-bold text-sm mb-6">
              {notification.category.toUpperCase()}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-8 leading-tight">
              {notification.title}
            </h1>

            {/* Time & Status */}
            <div className="flex items-center gap-6 text-gray-600 mb-10">
              <div className="flex items-center gap-2">
                <FiClock className="text-xl" />
                <span>{notification.time}</span>
              </div>
              {notification.read ? (
                <div className="flex items-center gap-2 text-green-600">
                  <FiCheckCircle className="text-xl" />
                  <span>Read</span>
                </div>
              ) : (
                <div className="text-[#E30613] font-medium">Unread</div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{notification.content}</p>
              {/* You can add more formatted content here */}
            </div>

            {/* Action Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition transform hover:scale-105">
                Take Action
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="border-2 border-[#E30613] hover:bg-[#E30613]/10 text-[#E30613] font-bold text-xl px-12 py-6 rounded-full transition"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationsPage;