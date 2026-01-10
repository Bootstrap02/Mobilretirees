// // pages/Dashboard.jsx — FULLY FIXED & BEAUTIFUL
// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import constitution from '../assets/emran-constitution.pdf';


// // All required icons imported
// import { 
//   FiUser, 
//   FiLogOut, 
//   FiDollarSign, 
//   FiBell, 
//   FiMessageSquare, 
//   FiCalendar 
// } from 'react-icons/fi';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('userData'));
    
//     if (!storedUser) {
//       navigate('/signin');
//       return;
//     }

//     // Use REAL signed-in user data with safe fallbacks
//     const userData = {
//       fullname: storedUser.user.fullname || "EMRAN Member",
//       email: storedUser.user.email || "No email available",
//       staffId: storedUser.user.id || "N/A",
//       retirementYear: storedUser.retirementYear || "N/A",
//       // Profile avatar (use if exists, fallback to placeholder)
//       profilePhoto: storedUser.user.profilePic || "https://via.placeholder.com/150?text=" + (storedUser.user.fullname?.charAt(0) || "U"),
//       duesStatus: storedUser.duesStatus || "Pending Verification",
//       unreadMessages: storedUser.unreadMessages || 0,
//       notifications: storedUser.notifications || 0,
//       upcomingEvents: storedUser.upcomingEvents || 0,
//       // Pension/health fields will be populated from API later
//     };

//     setUser(userData);
//     setLoading(false);
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-2xl text-[#001F5B]">Loading your dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">

//           {/* Sub-Header: Welcome with Avatar */}
//           <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden">
//             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,rgba(227,6,19,0.3),transparent)]"></div>
//             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
//               <div className="flex items-center gap-6">
//                 {/* PROFILE AVATAR */}
//                 <div className="relative">
//                   <img 
//                     src={user.profilePhoto} 
//                     alt={user.fullname} 
//                     className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
//                     onError={(e) => {
//                       e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`;
//                     }}
//                   />
//                   <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
//                 </div>

//                 <div>
//                   <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
//                     Welcome, {user.fullname}
//                   </h1>
//                   <p className="text-lg md:text-xl opacity-90 mt-3">
//                     {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
//                     Retired {user.retirementYear !== "N/A" ? user.retirementYear : "Member"}
//                   </p>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <NavLink
//                   to={`/profile/${user.staffId}`}  // FIXED: Correct template literal using user.staffId
//                   className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center"
//                 >
//                   <FiUser className="text-2xl" />
//                   My Profile
//                 </NavLink>

//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('userData');
//                     navigate('/signin');
//                   }}
//                   className="bg-red-600/80 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center"
//                 >
//                   <FiLogOut className="text-2xl" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Quick Status Cards */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiDollarSign className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Dues Status</h3>
//               <p className="text-xl font-medium text-green-600">{user.duesStatus}</p>
//               <NavLink to="/dues" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 View Details →
//               </NavLink>
//             </div>

//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiBell className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Notifications</h3>
//               <p className="text-3xl font-bold text-gray-800">{user.notifications}</p>
//               <NavLink to="/notifications" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 View All →
//               </NavLink>
//             </div>

//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiMessageSquare className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Messages</h3>
//               <p className="text-3xl font-bold text-gray-800">{user.unreadMessages}</p>
//               <NavLink to="/messages" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 Check Inbox →
//               </NavLink>
//             </div>

//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiCalendar className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Upcoming Events</h3>
//               <p className="text-3xl font-bold text-gray-800">{user.upcomingEvents}</p>
//               <NavLink to="/news-events" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 See Calendar →
//               </NavLink>
//             </div>
//           </div>

//           {/* Pension & Health – Clickable Teasers */}
//           <div className="grid lg:grid-cols-2 gap-8 mb-12">
//             <NavLink 
//               to="/pension-history" 
//               className="block bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2"
//             >
//               <h2 className="text-3xl font-bold text-[#001F5B] mb-6">Pension Overview</h2>
//               <p className="text-xl text-gray-700 mb-4">
//                 View your monthly pension, payment history, and next due date.
//               </p>
//               <p className="text-lg text-gray-600">Click to see full details →</p>
//             </NavLink>

//             <NavLink 
//               to="/health" 
//               className="block bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2"
//             >
//               <h2 className="text-3xl font-bold text-[#001F5B] mb-6">Health Coverage</h2>
//               <p className="text-xl text-gray-700 mb-4">
//                 Access your medical plan, hospital list, and claim status.
//               </p>
//               <p className="text-lg text-gray-600">Click to manage your health benefits →</p>
//             </NavLink>
//           </div>

//           {/* Support */}
//           <div className="bg-[#001F5B] text-white rounded-3xl p-12 text-center">
//             <h3 className="text-3xl font-bold mb-6">Need Assistance?</h3>
//             <p className="text-xl mb-8">We're here 24/7 for your pension, health, and membership queries.</p>
//             <a href="tel:+23412777700" className="text-4xl font-bold text-[#E30613] hover:text-white transition block mb-4">
//               +234 1 277 7700
//             </a>
//             <p className="text-lg opacity-90">
//               Or email: <a href="mailto:retirees.support@exxonmobil.ng" className="text-[#E30613] hover:text-white">retirees.support@exxonmobil.ng</a>
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;
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
      fullname: stored.user.fullname || "EMRAN Member",
      email: stored.user.email || "No email available",
      staffId: stored.user.id || "N/A",
      retirementYear: stored.user.retirementYear || "N/A",
      profilePhoto: stored.user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.user.fullname || 'U')}&background=001F5B&color=fff&size=128`,
      duesStatus: stored.user.duesStatus || "Pending Verification",
      unreadMessages: stored.user.unreadMessages || 0,
      notifications: stored.user.notifications || 0,
      upcomingEvents: stored.user.upcomingEvents || 0,
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
          <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl">
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