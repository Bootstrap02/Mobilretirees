// pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import axios from "axios";

  
const NotificationsPage = () => {
  const { id } = useParams(); // Get notification ID from URL
  const navigate = useNavigate();
  const [notification, setNotification] = useState({});


 useEffect(()=>{
    const notifRes =  axios.get(`https://campusbuy-backend-nkmx.onrender.com/mobilcreatenotifications/${id}`);
    setNotification(notifRes.data.notification);

  },[id])


  
  if (!notification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Notification no longer available</div>
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

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-8 leading-tight">
              {notification.title}
            </h1>

            {/* Time & Status */}
            <div className="flex items-center gap-6 text-gray-600 mb-10">
              <div className="flex items-center gap-2">
                <FiClock className="text-xl" />
                <span>{notification.timestamps}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{notification.content}</p>
              {/* You can add more formatted content here */}
            </div>

            {/* Action Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
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