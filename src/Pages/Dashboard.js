// pages/Dashboard.jsx — FINAL VERSION
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { BigLoader } from '../Modals/Loaders';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) {
      navigate('/signin');
      return;
    }

    // REAL DUMMY DATA from your uncle's conversation + constitution
    const dummyData = {
      fullname: stored.user?.fullname || "Chief Emmanuel Adebayo",
      staffId: "EMB-1978-045",
      pensionId: "PEN-2025-1087",
      department: "Operations & Maintenance",
      retirementYear: 2018,
      monthlyPension: 485000,
      lastPayment: "₦485,000 on Nov 25, 2025",
      nextPaymentDate: "Dec 25, 2025",
      daysUntilPayment: 13,
      totalPensionReceived: 38280000,
      healthPlan: "Gold Retiree Medical Plan (Family Cover)",
      duesStatus: "Paid until Dec 2026",
      unreadMessages: 5,
      upcomingEvents: 2,
      pendingDocuments: 3,
      deathBenefit: "₦500,000 (Eligible for spouse/family)",
      emergencyContact: "+234 1 277 7700",
      address: "26 Acacia Drive, Osborne Foreshore Estate Phase 2, Ikoyi, Lagos",
    };

    setUser(dummyData);
    setLoading(false);
  }, [navigate]);

  if (loading) return <BigLoader message="Loading your portal..." />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-10 shadow-2xl">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.fullname}</h1>
            <p className="text-xl opacity-90">EMRAN Member • Retired {user.retirementYear} • {user.department}</p>
            <p className="mt-4 text-lg">Dues: <span className="text-green-400 font-bold">{user.duesStatus}</span></p>
          </div>

          {/* Pension Mega Card */}
          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-l-8 border-[#E30613]">
              <h2 className="text-3xl font-bold text-[#001F5B] mb-6">Pension Summary</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600">Monthly Pension</p>
                  <p className="text-5xl font-bold text-[#E30613]">₦{user.monthlyPension.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl">
                  <p className="text-gray-600">Last Payment</p>
                  <p className="text-2xl font-bold text-green-700">{user.lastPayment}</p>
                </div>
                <div className="bg-[#E30613] text-white p-6 rounded-2xl text-center">
                  <p className="text-6xl font-bold">{user.daysUntilPayment}</p>
                  <p className="text-xl">Days Until Next Payment</p>
                  <p className="text-lg opacity-90">{user.nextPaymentDate}</p>
                </div>
                <NavLink to="/pension-history" className="block text-center bg-[#001F5B] hover:bg-[#001F3B] text-white font-bold py-4 rounded-xl">
                  View Full History
                </NavLink>
              </div>
            </div>

            {/* Health & Benefits */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Health Coverage</h3>
                <p className="text-xl font-medium mb-4">{user.healthPlan}</p>
                <p className="text-green-600 font-bold text-2xl mb-6">Active • Family Covered</p>
                <NavLink to="/health" className="block text-center bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl">
                  View Hospitals & Claims
                </NavLink>
              </div>

              <div className="bg-red-50 border-4 border-red-200 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-red-800 mb-4">Death Benefit</h3>
                <p className="text-4xl font-bold text-red-700">₦500,000</p>
                <p className="text-red-800 mt-2">Payable to spouse/family</p>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Documents", value: user.pendingDocuments, icon: "📄", link: "/documents" },
              { label: "Messages", value: user.unreadMessages, icon: "✉️", link: "/notifications" },
              { label: "Events", value: user.upcomingEvents, icon: "🎉", link: "/events" },
              { label: "Total Received", value: `₦${(user.totalPensionReceived / 1000000).toFixed(1)}M`, icon: "💰", link: "/pension-history" },
            ].map((item, i) => (
              <NavLink to={item.link} key={i} className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-3xl font-bold text-[#001F5B]">{item.value}</p>
                <p className="text-gray-600 mt-2">{item.label}</p>
              </NavLink>
            ))}
          </div>

          {/* Support */}
          <div className="bg-[#001F5B] text-white rounded-3xl p-10 text-center">
            <h3 className="text-3xl font-bold mb-4">Need Help?</h3>
            <p className="text-xl mb-6">Call EMRAN Support 24/7</p>
            <a href="tel:+23412777700" className="text-4xl font-bold text-[#E30613]">+234 1 277 7700</a>
            <p className="mt-4 opacity-80">Or visit our office at {user.address}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;