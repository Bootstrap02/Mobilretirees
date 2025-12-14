// pages/NewsEvents.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const NewsEvents = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) navigate('/signin');
  }, [navigate]);

  const news = [
    {
      title: "EMRAN End-of-Year Get-Together 2025",
      date: "December 18, 2025",
      location: "Eko Hotel, Lagos",
      desc: "Annual fellowship and awards dinner for all retirees.",
      featured: true,
    },
    {
      title: "November Pension Credited Successfully",
      date: "November 25, 2025",
      desc: "All retirees have received their monthly pension. Contact support if not reflected.",
    },
    {
      title: "New HMO Partnership with Reddington Hospital",
      date: "October 2025",
      desc: "Expanded coverage now includes specialist care at Reddington facilities nationwide.",
    },
  ];

  const upcomingEvents = [
    { title: "EMRAN Christmas Party", date: "Dec 18, 2025", location: "Lagos" },
    { title: "Health Talk: Managing Hypertension", date: "Jan 15, 2026", location: "Virtual" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001F5B] text-center mb-12">
            News & Events
          </h1>

          {/* Featured Event */}
          <div className="bg-gradient-to-r from-[#E30613] to-[#c20511] text-white rounded-3xl p-10 mb-12 shadow-2xl">
            <span className="bg-white text-[#E30613] px-4 py-1 rounded-full text-sm font-bold">FEATURED</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              EMRAN End-of-Year Get-Together 2025
            </h2>
            <p className="text-xl mb-6">December 18, 2025 • Eko Hotel, Victoria Island, Lagos</p>
            <p className="text-lg opacity-90 mb-8">
              Join fellow retirees for an evening of celebration, awards, and reconnection.
            </p>
            <button className="bg-white text-[#E30613] hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition">
              RSVP Now
            </button>
          </div>

          {/* News List */}
          <h2 className="text-3xl font-bold text-[#001F5B] mb-8">Latest Updates</h2>
          <div className="space-y-8 mb-16">
            {news.slice(1).map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-lg">{item.desc}</p>
                  <p className="text-sm text-gray-500 mt-4">{item.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <h2 className="text-3xl font-bold text-[#001F5B] mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold text-[#001F5B] mb-3">{event.title}</h3>
                <p className="text-lg text-gray-700 mb-2">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsEvents;