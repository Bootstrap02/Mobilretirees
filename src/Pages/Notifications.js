// pages/Notifications.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, title: "Pension Payment Credited", message: "Your November pension of ₦485,000 has been paid.", date: "Nov 25, 2025", read: true },
    { id: 2, title: "Event Reminder", message: "EMRAN End-of-Year Get-Together is in 4 days!", date: "Dec 14, 2025", read: false },
    { id: 3, title: "Document Pending", message: "Please upload your 2025 life certificate.", date: "Dec 10, 2025", read: false },
    { id: 4, title: "Health Plan Update", message: "New hospitals added to your Gold plan network.", date: "Oct 30, 2025", read: true },
    { id: 5, title: "Welcome Back!", message: "You’ve successfully logged into the new retiree portal.", date: "Dec 14, 2025", read: false },
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) navigate('/signin');
  }, [navigate]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold text-[#001F5B]">
              Notifications {unreadCount > 0 && <span className="text-[#E30613]">({unreadCount} new)</span>}
            </h1>
            {unreadCount > 0 && (
              <button className="text-[#E30613] font-bold hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-6">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all ${
                  !notif.read ? 'border-l-4 border-[#E30613] shadow-xl' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${!notif.read ? 'text-[#001F5B]' : 'text-gray-800'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-gray-700 mt-2 text-lg">{notif.message}</p>
                    <p className="text-sm text-gray-500 mt-4">{notif.date}</p>
                  </div>
                  {!notif.read && <div className="w-3 h-3 bg-[#E30613] rounded-full ml-4 mt-2"></div>}
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No notifications at this time.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;