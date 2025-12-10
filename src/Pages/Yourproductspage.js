// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiFileText, FiHeart, FiCalendar, FiLogOut, FiDownload } from 'react-icons/fi';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { BigLoader } from '../Modals/Loaders';
// Mock data (replace with real API later)
const mockUser = {
  fullname: "Chief Emmanuel Adebayo",
  staffId: "EMB-1978-045",
  pensionId: "PEN-2025-1087",
  nextPaymentDate: "2025-12-25",
  monthlyPension: 485000,
  healthPlan: "Gold Retiree Medical Plan",
  pendingDocuments: 2,
  unreadNotifications: 3,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setUser({ ...mockUser, ...userData.user });
      setLoading(false);
    }, 1200);

    // Countdown to next payment
    const calculateDays = () => {
      const next = new Date(mockUser.nextPaymentDate);
      const today = new Date();
      const diff = next - today;
      setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calculateDays();
    const interval = setInterval(calculateDays, 86400000); // daily update
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <BigLoader message="Loading your dashboard..." />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Welcome Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#001F5B]">
              Welcome back, {user.fullname.split(' ')[0]} 
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Here’s your retirement summary as of {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN – Pension & Health */}
            <div className="lg:col-span-2 space-y-8">

              {/* Pension Card – BIG & PROUD */}
              <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-gray-300 text-lg">Monthly Pension</p>
                    <h2 className="text-5xl font-bold mt-2">
                      ₦{user.monthlyPension.toLocaleString()}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">Next Payment In</p>
                    <div className="text-6xl font-bold text-[#E30613]">{daysLeft}</div>
                    <p className="text-sm">days • 25 Dec 2025</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <p className="text-sm opacity-90">Payment will be credited to:</p>
                  <p className="font-bold text-xl mt-1">GTBank •••• 5678</p>
                </div>
              </div>

              {/* Health Plan Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#001F5B]">Health Benefits</h3>
                  <FiHeart className="text-4xl text-[#E30613]" />
                </div>
                <p className="text-3xl font-bold text-[#001F5B] mb-4">{user.healthPlan}</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">Coverage Status</p>
                    <p className="font-bold text-green-600">Active</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">Hospitals</p>
                    <p className="font-bold text-[#001F5B]">120+ Nationwide</p>
                  </div>
                </div>
                <NavLink to="/health" className="block mt-6 text-center bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl">
                  View Health Portal
                </NavLink>
              </div>

            </div>

            {/* RIGHT COLUMN – Quick Actions */}
            <div className="space-y-8">

              {/* Profile Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-[#E30613] rounded-full flex items-center justify-center text-4xl text-white font-bold">
                    {user.fullname.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#001F5B]">{user.fullname}</h3>
                    <p className="text-gray-600">Staff ID: {user.staffId}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <NavLink to="/profile" className="flex items-center gap-3 text-[#001F5B] hover:text-[#E30613]">
                    <FiUser /> My Profile
                  </NavLink>
                  <NavLink to="/documents" className="flex items-center gap-3 text-[#001F5B] hover:text-[#E30613] relative">
                    <FiFileText /> Documents 
                    {user.pendingDocuments > 0 && (
                      <span className="ml-auto bg-[#E30613] text-white text-xs px-2 py-1 rounded-full">
                        {user.pendingDocuments} new
                      </span>
                    )}
                  </NavLink>
                  <NavLink to="/notifications" className="flex items-center gap-3 text-[#001F5B] hover:text-[#E30613] relative">
                    <FiBell /> Notifications
                    {user.unreadNotifications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {user.unreadNotifications}
                      </span>
                    )}
                  </NavLink>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#001F5B] text-white rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
                <div className="space-y-4">
                  <NavLink to="/pension-history" className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl transition">
                    Pension Payment History
                  </NavLink>
                  <NavLink to="/events" className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl transition">
                    Upcoming Events & Reunions
                  </NavLink>
                  <NavLink to="/support" className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl transition">
                    Contact Support
                  </NavLink>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full bg-gray-200 hover:bg-gray-300 text-[#001F5B] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
              >
                <FiLogOut /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;