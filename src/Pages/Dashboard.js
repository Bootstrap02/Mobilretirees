// // pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import constitutionPDF from '../assets/emran-constitution.pdf';
// import rulesPDF from '../assets/emran-rules.pdf';
// import associationPDF from '../assets/emran-association.pdf';
// import agm from '../assets/agm2026.pdf';
// import executives from '../assets/executives.pdf';
// import whatsapp_penalties from '../assets/whatsapp_penalties.pdf';
// import whatsapp_rules from '../assets/whatsapp_rules.pdf';
// import NotificationsList from '../Components/Notificationslist';
// import { FiUser, FiLogOut, FiDollarSign, FiBell, FiCalendar, FiFileText } from 'react-icons/fi';
// import cacCertificate from '../assets/cac-certificate.jpg';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [allNotifications, setAllNotifications] = useState();
//   const [notifications, setNotifications] = useState(false);
//   const [news, setNews] = useState();

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('userData'));
//     const notificationsData = JSON.parse(localStorage.getItem('notifications'));
//     const newsevents = JSON.parse(localStorage.getItem('newsevents'));

//     setAllNotifications(notificationsData);
//     setNews(newsevents?.length || 0);

//     if (!stored) {
//       navigate('/signin');
//       return;
//     }

//     const userData = {
//       fullname: stored.fullname || "EMRAN Member",
//       email: stored.email || "No email available",
//       staffId: stored._id || "N/A",
//       dateOfRetirement: stored.dateOfRetirement || "N/A",
//       profilePhoto: stored.image?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=128`,
//       duesStatus: stored.duesStatus || "Pending Verification",
//       unreadMessages: stored.messages || 0,
//       notifications: stored.notifications || 0,
//       upcomingEvents: stored.upcomingEvents || 0,
//       role: stored.role || "member",   // ← Added for election
//     };

//     setUser(userData);
//     setLoading(false);
//   }, [navigate]);

//   const openNotifications = () => setNotifications(true);
//   const closeNotifications = () => setNotifications(false);

//   // New function: Open Elections in new tab with parameters
//   const openElections = () => {
//     if (!user?.staffId) {
//       alert("User ID not found. Please login again.");
//       return;
//     }

//     const role = user.role || "member";
//     const electionUrl = `https://emranelections.site/user/ballot.php?id=${user.staffId}&role=${role}&email=${user.email}`;
//     console.log(electionUrl)
//     window.open(electionUrl, '_blank', 'noopener,noreferrer');
//   };

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

//           {/* Welcome Banner - Desktop */}
//           <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//               <div className="flex items-center gap-6">
//                 <img 
//                   src={user.profilePhoto} 
//                   alt={user.fullname} 
//                   className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
//                   onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`}
//                 />
//                 <div>
//                   <h1 className="text-4xl font-bold">Welcome, {user.fullname}</h1>
//                   <p className="text-xl opacity-90 mt-2">
//                     {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
//                     Retired {user.dateOfRetirement !== "N/A" ? user.dateOfRetirement : "Member"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <NavLink
//                   to={`/profile/${user.staffId}`}
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

//           {/* Welcome Banner - Mobile */}
//           <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
//             <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
//               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
//                 <img
//                   src={user.profilePhoto}
//                   alt={user.fullname}
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/80 shadow-lg"
//                   onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`}
//                 />
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user.fullname}</h1>
//                   <p className="text-base sm:text-lg opacity-90 mt-1">
//                     {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
//                     Retired {user.dateOfRetirement !== "N/A" ? user.dateOfRetirement : "Member"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 <NavLink
//                   to={`/profile/${user.staffId}`}
//                   className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none"
//                 >
//                   <FiUser className="text-xl" /> My Profile
//                 </NavLink>
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('userData');
//                     navigate('/signin');
//                   }}
//                   className="bg-red-600/80 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none"
//                 >
//                   <FiLogOut className="text-xl" /> Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Quick Status Cards */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {/* Dues Status */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiDollarSign className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Dues Status</h3>
//               <p className="text-xl font-medium text-green-600">{user.duesStatus}</p>
//               <NavLink to="/dues" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 View Details →
//               </NavLink>
//             </div>

//             {/* Notifications */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiBell className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Notifications</h3>
//               <p className="text-3xl font-bold text-gray-800">{user.notifications}</p>
//               <button onClick={openNotifications} className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 View All →
//               </button>
//             </div>

//             {/* Elections - New Button with parameters */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiFileText className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Elections</h3>
//               <p className="text-lg text-gray-600 mb-6">Cast your vote or view results</p>
              
//               <button
//                 onClick={openElections}
//                 className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg px-10 py-4 rounded-2xl transition transform hover:scale-105 w-full"
//               >
//                 Go to Elections →
//               </button>
//             </div>

//             {/* Messages
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiMessageSquare className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Messages</h3>
//               <p className="text-3xl font-bold text-gray-800">{user.unreadMessages}</p>
//               <NavLink to="/messages" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 Check Inbox →
//               </NavLink>
//             </div>
//              */}

//             {/* Upcoming Events */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
//               <FiCalendar className="text-6xl text-[#E30613] mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Upcoming Events</h3>
//               <p className="text-3xl font-bold text-gray-800">{news}</p>
//               <NavLink to="/newsevents" className="text-[#E30613] font-bold mt-4 block hover:underline">
//                 See Calendar →
//               </NavLink>
//             </div>
//           </div>

//           {/* Constitution & CAC Section */}
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//                        {/* CAC Certificate Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#E30613] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#E30613]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">CAC Certification</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official Corporate Affairs Commission certification confirming EMRAN’s legal registration status.
//                 </p>
//               </div>
//               <a
//                 href={cacCertificate}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Certificate
//               </a>
//             </div>
          
//           {/* Constitution Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">CAC-ABRIDGED CONSTITUTION</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official EMRAN Constitution document outlining governance, membership structure, and operational guidelines.
//                 </p>
//               </div>
//               <a
//                 href={constitutionPDF}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>
//             {/* Articles of Association Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">Articles of Association</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official Articles of Association of Exxommobil Retirees Association of Nigeria(EMRAN).
//                 </p>
//               </div>
//               <a
//                 href={associationPDF}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>
//             {/* Rules  Regulations Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">Rules and Regulations</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official Rules and Regulation of Exxonmobil Retirees Association of Nigeria(EMRAN).
//                 </p>
//               </div>
//               <a
//                 href={rulesPDF}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>
//             {/* AGM Card */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">AGM Attendees in 2026</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official EMRAN AGM Atendees in 2026.
//                 </p>
//               </div>
//               <a
//                 href={agm}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>
//             {/* 2026 Newly Elected Executives */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN Newly Elected Executives 2026</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   View the official EMRAN Newly Elected Executives in 2026.
//                 </p>
//               </div>
//               <a
//                 href={executives}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>

//             {/* 2026 Whatsapp Group Rules */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN Group Whatsapp Rules and Regulations</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   Rules and Regulations for Posting and Commenting on EMRAN Whatsapp Whatsapp.
//                 </p>
//               </div>
//               <a
//                 href={whatsapp_rules}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>

            
//             {/* 2026 Whatsapp Group Penalties */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <FiFileText className="text-4xl text-[#001F5B]" />
//                   <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN Group Whatsapp Penalties</h3>
//                 </div>
//                 <p className="text-gray-600 text-lg">
//                   Penalties for offences on EMRAN Whatsapp Group.
//                 </p>
//               </div>
//               <a
//                 href={whatsapp_penalties}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
//               >
//                 View Document
//               </a>
//             </div>

//           </div>

//           {/* Support Section */}
//           <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
//             <h3 className="text-4xl font-bold mb-6">Need Assistance?</h3>
//             <p className="text-2xl mb-8 opacity-90">
//               Our team is available 24/7 for your pension, health, dues, and membership queries.
//             </p>
//             <a 
//               href="tel:+23412777700"
//               className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-3xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 mb-8"
//             >
//               Call +234 1 277 7700
//             </a>
//             <p className="text-xl opacity-90">
//               Or email: <a href="mailto:emranwebmgt@gmail.com" className="text-[#E30613] hover:text-white underline">emranwebmgt@gmail.com</a>
//             </p>
//           </div>

//           <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
//             <h3 className="text-3xl font-bold mb-6">Need Assistance?</h3>
//             <p className="text-xl mb-8 opacity-90">
//               Our team is available 24/7 for your pension, health, dues, and membership queries.
//             </p>
//             <a 
//               href="tel:+23412777700"
//               className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-3xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 mb-8"
//             >
//               Call +234 906 941 2463
//             </a>
//             <p className="text-lg opacity-90">
//               Or email: <a href="mailto:emranwebmgt@gmail.com" className="text-[#E30613] hover:text-white underline">emranwebmgt@gmail.com</a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {notifications && <NotificationsList isOpen={openNotifications} onClose={closeNotifications} notifications={allNotifications} />}
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;
// pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import constitutionPDF from '../assets/emran-constitution.pdf';
import rulesPDF from '../assets/emran-rules.pdf';
import associationPDF from '../assets/emran-association.pdf';
import agm from '../assets/agm2026.pdf';
import executives from '../assets/executives.pdf';
import whatsapp_penalties from '../assets/whatsapp_penalties.pdf';
import whatsapp_rules from '../assets/whatsapp_rules.pdf';
import NotificationsList from '../Components/Notificationslist';
import { FiUser, FiLogOut, FiDollarSign, FiBell, FiCalendar, FiFileText } from 'react-icons/fi';
import cacCertificate from '../assets/cac-certificate.jpg';

/* ─────────────────────────────────────────────────────────────────────────
   PUSH NOTIFICATION HELPERS

   iPhone (iOS Safari) notes:
   - Push notifications on iOS Safari require iOS 16.4+ AND the site must be
     installed as a PWA (Add to Home Screen). Notification.requestPermission()
     will silently return 'denied' or be unavailable on plain Safari tabs.
   - We detect this and show a manual "Add to Home Screen" tip instead of
     the browser prompt, so iPhones don't get stuck in a silent failure loop.
   - Android Chrome, Samsung Internet, Firefox, Edge all support the Web
     Notifications API in-browser — they get the standard permission prompt.
   - We store the user's decision under 'emran_notif_permission' in
     localStorage so the prompt is never shown twice.
───────────────────────────────────────────────────────────────────────── */

const NOTIF_STORAGE_KEY = 'emran_notif_permission'; // 'granted' | 'denied' | 'ios_pwa_pending'

const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

const isPWA = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

const notificationsSupported = () => 'Notification' in window;

const sendTestNotification = () => {
  if (notificationsSupported() && Notification.permission === 'granted') {
    new Notification('EMRAN Portal', {
      body: 'You are now subscribed to EMRAN updates. Welcome!',
      icon: '/emran-icon.png',
    });
  }
};

const sendBrowserNotification = (title, body, icon = '/emran-icon.png') => {
  if (notificationsSupported() && Notification.permission === 'granted') {
    new Notification(title, { body, icon });
  }
};

// Expose globally so other parts of the app can fire notifications
window.emranNotify = sendBrowserNotification;

/* ─────────────────────────────────────────────────────────────────────── */

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState();
  const [notifications, setNotifications] = useState(false);
  const [news, setNews] = useState();

  /* ── Notification permission modal state ── */
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);
  const [notifBlocked, setNotifBlocked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    const notificationsData = JSON.parse(localStorage.getItem('notifications'));
    const newsevents = JSON.parse(localStorage.getItem('newsevents'));

    setAllNotifications(notificationsData);
    setNews(newsevents?.length || 0);

    if (!stored) {
      navigate('/signin');
      return;
    }

    const userData = {
      fullname: stored.fullname || "EMRAN Member",
      email: stored.email || "No email available",
      staffId: stored._id || "N/A",
      dateOfRetirement: stored.dateOfRetirement || "N/A",
      profilePhoto: stored.image?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=128`,
      duesStatus: stored.duesStatus || "Pending Verification",
      unreadMessages: stored.messages || 0,
      notifications: stored.notifications || 0,
      upcomingEvents: stored.upcomingEvents || 0,
      role: stored.role || "member",
    };

    setUser(userData);
    setLoading(false);
  }, [navigate]);

  /* ── Decide whether to show the notification permission prompt ── */
  useEffect(() => {
    if (loading) return; // wait until user loads

    const stored = localStorage.getItem(NOTIF_STORAGE_KEY);

    // Already answered — never ask again
    if (stored === 'granted' || stored === 'denied') return;

    // If the browser has already granted/denied at OS level, sync and skip
    if (notificationsSupported()) {
      if (Notification.permission === 'granted') {
        localStorage.setItem(NOTIF_STORAGE_KEY, 'granted');
        return;
      }
      if (Notification.permission === 'denied') {
        localStorage.setItem(NOTIF_STORAGE_KEY, 'denied');
        setNotifBlocked(true);
        return;
      }
    }

    // iOS in a plain Safari tab — can't get push without PWA install
    if (isIOS() && !isPWA()) {
      // Only show the iOS tip if they haven't been told yet
      if (stored !== 'ios_pwa_pending') {
        setShowIOSTip(true);
      }
      return;
    }

    // All other browsers — show EMRAN's own styled prompt
    if (notificationsSupported()) {
      setShowNotifModal(true);
    }
  }, [loading]);

  /* ── Handle user clicking "Allow" on our modal ── */
  const handleAllowNotifications = useCallback(async () => {
    setShowNotifModal(false);
    try {
      const permission = await Notification.requestPermission();
      localStorage.setItem(NOTIF_STORAGE_KEY, permission);
      if (permission === 'granted') {
        sendTestNotification();
      } else {
        setNotifBlocked(permission === 'denied');
      }
    } catch (err) {
      console.error('Notification permission error:', err);
    }
  }, []);

  /* ── Handle user clicking "Not now" ── */
  const handleDenyNotifications = useCallback(() => {
    setShowNotifModal(false);
    localStorage.setItem(NOTIF_STORAGE_KEY, 'denied');
  }, []);

  /* ── Dismiss the iOS tip ── */
  const handleDismissIOSTip = useCallback(() => {
    setShowIOSTip(false);
    localStorage.setItem(NOTIF_STORAGE_KEY, 'ios_pwa_pending');
  }, []);

  const openNotifications = () => setNotifications(true);
  const closeNotifications = () => setNotifications(false);

  const openElections = () => {
    if (!user?.staffId) {
      alert("User ID not found. Please login again.");
      return;
    }
    const role = user.role || "member";
    const electionUrl = `https://emranelections.site/user/ballot.php?id=${user.staffId}&role=${role}&email=${user.email}`;
    window.open(electionUrl, '_blank', 'noopener,noreferrer');
  };

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

      {/* ═══════════════════════════════════════════════════════════
          NOTIFICATION PERMISSION MODAL (Android / Desktop Chrome etc.)
          Shown once, never again after the user decides.
      ═══════════════════════════════════════════════════════════ */}
      {showNotifModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-[pop_0.3s_ease]">
            <div className="w-16 h-16 bg-[#E30613]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiBell className="text-4xl text-[#E30613]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#001F5B] mb-2">Stay in the loop</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              EMRAN would like to send you browser notifications for new announcements,
              welfare updates, news events, and important alerts — even when you're not
              on the site.
            </p>
            <button
              onClick={handleAllowNotifications}
              className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-3 rounded-xl text-sm transition mb-3 active:scale-95"
            >
              Allow Notifications
            </button>
            <button
              onClick={handleDenyNotifications}
              className="w-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-3 rounded-xl text-sm transition"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          iOS TIP MODAL
          Safari on iPhone can't show push notifications unless the
          site is added to the Home Screen as a PWA (iOS 16.4+).
          We explain this clearly so the user isn't confused by silence.
      ═══════════════════════════════════════════════════════════ */}
      {showIOSTip && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="w-16 h-16 bg-[#001F5B]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">📲</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#001F5B] mb-2">Enable notifications on iPhone</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              To receive EMRAN notifications on your iPhone, you need to add this site
              to your Home Screen first:
            </p>
            <ol className="text-left text-sm text-gray-600 space-y-2 mb-6 bg-gray-50 rounded-2xl px-5 py-4">
              <li><span className="font-bold text-[#001F5B]">1.</span> Tap the <span className="font-bold">Share</span> icon at the bottom of Safari (the box with an arrow)</li>
              <li><span className="font-bold text-[#001F5B]">2.</span> Scroll down and tap <span className="font-bold">"Add to Home Screen"</span></li>
              <li><span className="font-bold text-[#001F5B]">3.</span> Open EMRAN from your Home Screen — then notifications will be available</li>
            </ol>
            <p className="text-xs text-gray-400 mb-5">Requires iOS 16.4 or later.</p>
            <button
              onClick={handleDismissIOSTip}
              className="w-full bg-[#001F5B] hover:bg-[#003494] text-white font-bold py-3 rounded-xl text-sm transition active:scale-95"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Welcome Banner - Desktop */}
          <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl">
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
                    Retired {user.dateOfRetirement !== "N/A" ? user.dateOfRetirement : "Member"}
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

          {/* Welcome Banner - Mobile */}
          <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <img
                  src={user.profilePhoto}
                  alt={user.fullname}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/80 shadow-lg"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`}
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user.fullname}</h1>
                  <p className="text-base sm:text-lg opacity-90 mt-1">
                    {user.staffId !== "N/A" && `Staff ID: ${user.staffId} • `}
                    Retired {user.dateOfRetirement !== "N/A" ? user.dateOfRetirement : "Member"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <NavLink
                  to={`/profile/${user.staffId}`}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none"
                >
                  <FiUser className="text-xl" /> My Profile
                </NavLink>
                <button
                  onClick={() => {
                    localStorage.removeItem('userData');
                    navigate('/signin');
                  }}
                  className="bg-red-600/80 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none"
                >
                  <FiLogOut className="text-xl" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Quick Status Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Dues Status */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiDollarSign className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Dues Status</h3>
              <p className="text-xl font-medium text-green-600">{user.duesStatus}</p>
              <NavLink to="/dues" className="text-[#E30613] font-bold mt-4 block hover:underline">
                View Details →
              </NavLink>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiBell className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Notifications</h3>
              <p className="text-3xl font-bold text-gray-800">{user.notifications}</p>
              <button onClick={openNotifications} className="text-[#E30613] font-bold mt-4 block hover:underline">
                View All →
              </button>
            </div>

            {/* Elections */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiFileText className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Elections</h3>
              <p className="text-lg text-gray-600 mb-6">Cast your vote or view results</p>
              <button
                onClick={openElections}
                className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg px-10 py-4 rounded-2xl transition transform hover:scale-105 w-full"
              >
                Go to Elections →
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiCalendar className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Upcoming Events</h3>
              <p className="text-3xl font-bold text-gray-800">{news}</p>
              <NavLink to="/newsevents" className="text-[#E30613] font-bold mt-4 block hover:underline">
                See Calendar →
              </NavLink>
            </div>
          </div>

          {/* Blocked notification hint — shown only if user's browser has blocked it */}
          {notifBlocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3 text-sm text-yellow-800">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <p>
                Browser notifications are currently blocked for this site. To re-enable them, click the lock/info icon in your browser's address bar, find <strong>Notifications</strong>, and set it to <strong>Allow</strong>.
              </p>
            </div>
          )}

          {/* Constitution & CAC Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* CAC Certificate Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#E30613] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#E30613]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">CAC Certification</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official Corporate Affairs Commission certification confirming EMRAN's legal registration status.
                </p>
              </div>
              <a
                href={cacCertificate}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Certificate
              </a>
            </div>
          
            {/* Constitution Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">CAC-ABRIDGED CONSTITUTION</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official EMRAN Constitution document outlining governance, membership structure, and operational guidelines.
                </p>
              </div>
              <a
                href={constitutionPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* Articles of Association Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">Articles of Association</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official Articles of Association of ExxonMobil Retirees Association of Nigeria (EMRAN).
                </p>
              </div>
              <a
                href={associationPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* Rules & Regulations Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">Rules and Regulations</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official Rules and Regulations of ExxonMobil Retirees Association of Nigeria (EMRAN).
                </p>
              </div>
              <a
                href={rulesPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* AGM Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">AGM Attendees in 2026</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official EMRAN AGM Attendees in 2026.
                </p>
              </div>
              <a
                href={agm}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* 2026 Newly Elected Executives */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN Newly Elected Executives 2026</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  View the official EMRAN Newly Elected Executives in 2026.
                </p>
              </div>
              <a
                href={executives}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* WhatsApp Group Rules */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN WhatsApp Rules and Regulations</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Rules and Regulations for Posting and Commenting on EMRAN WhatsApp.
                </p>
              </div>
              <a
                href={whatsapp_rules}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>

            {/* WhatsApp Group Penalties */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-[#001F5B] hover:shadow-2xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <FiFileText className="text-4xl text-[#001F5B]" />
                  <h3 className="text-2xl font-bold text-[#001F5B]">EMRAN WhatsApp Penalties</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Penalties for offences on EMRAN WhatsApp Group.
                </p>
              </div>
              <a
                href={whatsapp_penalties}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] hover:from-[#0A3D6B] hover:to-[#001F5B] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                View Document
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
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
              Or email: <a href="mailto:emranwebmgt@gmail.com" className="text-[#E30613] hover:text-white underline">emranwebmgt@gmail.com</a>
            </p>
          </div>

          <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-6">Need Assistance?</h3>
            <p className="text-xl mb-8 opacity-90">
              Our team is available 24/7 for your pension, health, dues, and membership queries.
            </p>
            <a 
              href="tel:+2349069412463"
              className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-3xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 mb-8"
            >
              Call +234 906 941 2463
            </a>
            <p className="text-lg opacity-90">
              Or email: <a href="mailto:emranwebmgt@gmail.com" className="text-[#E30613] hover:text-white underline">emranwebmgt@gmail.com</a>
            </p>
          </div>

        </div>
      </div>

      {notifications && <NotificationsList isOpen={openNotifications} onClose={closeNotifications} notifications={allNotifications} />}
      <Footer />
    </>
  );
};

export default Dashboard;
