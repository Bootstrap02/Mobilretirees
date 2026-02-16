// pages/Dashboard.jsx — CONSTITUTION ADDED BESIDE PENSION & HEALTH
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import constitutionPDF from '../assets/emran-constitution.pdf'; // Your imported PDF

// Icons
import { 
  FiUser, FiLogOut, FiDollarSign, FiBell, FiMessageSquare, FiCalendar, 
  FiFileText 
} from 'react-icons/fi';

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

    const userData = {
      fullname: stored.fullname || "EMRAN Member",
      email: stored.email || "No email available",
      staffId: stored._id || "N/A",
      retirementYear: stored.retirementYear || "N/A",
      profilePhoto: stored.image[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=128`,
      duesStatus: stored.duesStatus || "Pending Verification",
      unreadMessages: stored.unreadMessages || 0,
      notifications: stored.notifications || 0,
      upcomingEvents: stored.upcomingEvents || 0,
    };

    setUser(userData);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-[#001F5B]">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Welcome Banner */}
          <div className=" max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <img 
                  src={user.profilePhoto} 
                  alt={user.fullname} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`}
                />
                <div>
                  <h1 className="text-4xl font-bold">Welcome, {user.fullname}</h1>
                  <p className="text-xl opacity-90 mt-2">
                    {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
                    Retired {user.retirementYear !== "N/A" ? user.retirementYear : "Member"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink
                  to={`/profile/${user.staffId}`}
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center"
                >
                  <FiUser className="text-2xl" />
                  My Profile
                </NavLink>
                <button
                  onClick={() => {
                    localStorage.removeItem('userData');
                    navigate('/signin');
                  }}
                  className="bg-red-600/80 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center"
                >
                  <FiLogOut className="text-2xl" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* smalls screen */}
         <div className=" hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 shadow-xl sm:shadow-2xl">
  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
    {/* Avatar + Text */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
      <img
        src={user.profilePhoto}
        alt={user.fullname}
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white/80 shadow-lg"
        onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`}
      />
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Welcome, {user.fullname}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl opacity-90 mt-1 sm:mt-2">
          {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
          Retired {user.retirementYear !== "N/A" ? user.retirementYear : "Member"}
        </p>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
      <NavLink
        to={`/profile/${user.staffId}`}
        className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition flex items-center justify-center gap-3 flex-1 sm:flex-none"
      >
        <FiUser className="text-xl sm:text-2xl" />
        My Profile
      </NavLink>

      <button
        onClick={() => {
          localStorage.removeItem('userData');
          navigate('/signin');
        }}
        className="bg-red-600/80 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition flex items-center justify-center gap-3 flex-1 sm:flex-none"
      >
        <FiLogOut className="text-xl sm:text-2xl" />
        Logout
      </button>
    </div>
  </div>
</div>

          {/* Quick Status Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiDollarSign className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Dues Status</h3>
              <p className="text-xl font-medium text-green-600">{user.duesStatus}</p>
              <NavLink to="/dues" className="text-[#E30613] font-bold mt-4 block hover:underline">
                View Details →
              </NavLink>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiBell className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Notifications</h3>
              <p className="text-3xl font-bold text-gray-800">{user.notifications}</p>
              <NavLink to="/notifications" className="text-[#E30613] font-bold mt-4 block hover:underline">
                View All →
              </NavLink>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiMessageSquare className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Messages</h3>
              <p className="text-3xl font-bold text-gray-800">{user.unreadMessages}</p>
              <NavLink to="/messages" className="text-[#E30613] font-bold mt-4 block hover:underline">
                Check Inbox →
              </NavLink>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiCalendar className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Upcoming Events</h3>
              <p className="text-3xl font-bold text-gray-800">{user.upcomingEvents}</p>
              <NavLink to="/news-events" className="text-[#E30613] font-bold mt-4 block hover:underline">
                See Calendar →
              </NavLink>
            </div>
          </div>

          {/* MAIN SECTION: Pension + Health + Constitution */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Pension Overview */}
            <NavLink 
              to="/pension-history" 
              className="block bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2 border-t-8 border-[#E30613]"
            >
              <h2 className="text-3xl font-bold text-[#001F5B] mb-6">Pension Overview</h2>
              <p className="text-xl text-gray-700 mb-6">
                View your monthly pension, payment history, and next due date.
              </p>
              <p className="text-lg text-gray-600 font-medium">Click for full details →</p>
            </NavLink>

            {/* Health Coverage */}
            <NavLink 
              to="/health" 
              className="block bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2 border-t-8 border-[#E30613]"
            >
              <h2 className="text-3xl font-bold text-[#001F5B] mb-6">Health Coverage</h2>
              <p className="text-xl text-gray-700 mb-6">
                Access your medical plan, approved hospitals, and claim status.
              </p>
              <p className="text-lg text-gray-600 font-medium">Click to manage benefits →</p>
            </NavLink>

            {/* Constitution Download */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-[#E30613] flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#001F5B] mb-6">EMRAN Constitution</h2>
                <p className="text-xl text-gray-700 mb-8">
                  Download the official governing document of ExxonMobil Retirees Association of Nigeria.
                </p>
              </div>
              <a 
                href={constitutionPDF}
                download="EMRAN_Constitution.pdf"
                className="mt-6 inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#E30613] to-[#c20511] hover:from-[#c20511] hover:to-[#E30613] text-white font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl transition transform hover:scale-105"
              >
                <FiFileText className="text-3xl" />
                Download Constitution
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl font-bold mb-6">Need Assistance?</h3>
            <p className="text-2xl mb-8 opacity-90">
              Our team is available 24/7 for your pension, health, dues, and membership queries.
            </p>
            <a 
              href="tel:+23412777700"
              className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-3xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 mb-8"
            >
              Call +234 1 277 7700
            </a>
            <p className="text-xl opacity-90">
              Or email: <a href="mailto:retirees.support@exxonmobil.ng" className="text-[#E30613] hover:text-white underline">retirees.support@exxonmobil.ng</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;