
// pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import axios from 'axios';

const NotificationsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    // FIX: useEffect callback cannot be async directly.
    // Wrap in an inner async function and await axios properly.
    const fetchNotification = async () => {
      try {
        const res = await axios.get(
          `https://campusbuy-backend-nkmx.onrender.com/mobilcreatenotifications/${id}`
        );
        setNotification(res.data.notification || null);
      } catch (err) {
        console.error('Failed to load notification:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-[#001F5B] animate-pulse">Loading notification...</div>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
          <div className="text-2xl text-gray-600">Notification no longer available.</div>
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#E30613] font-bold text-lg hover:underline">
            <FiArrowLeft /> Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const formattedDate = notification.timestamps || notification.createdAt
    ? new Date(notification.timestamps || notification.createdAt).toLocaleString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    : null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          <button onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-[#E30613] hover:text-[#c20511] font-bold text-xl mb-10 transition">
            <FiArrowLeft className="text-2xl" />
            Back to Notifications
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-[#E30613]">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-8 leading-tight">
              {notification.title}
            </h1>

            {formattedDate && (
              <div className="flex items-center gap-2 text-gray-500 mb-10 text-base">
                <FiClock className="text-xl" />
                <span>{formattedDate}</span>
              </div>
            )}

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notification.content || notification.message || notification.body || ''}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => navigate(-1)}
                className="border-2 border-[#E30613] hover:bg-[#E30613]/10 text-[#E30613] font-bold text-xl px-12 py-6 rounded-full transition">
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
