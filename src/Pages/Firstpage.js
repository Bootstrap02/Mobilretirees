
// pages/Homepage.jsx — FULL, UNCUT & FIXED DEPLOYMENT VERSION
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import heroImage from '../assets/exxonmobil-logo-white.jpg';
import cacCertificate from '../assets/cac-certificate.jpg';
import NotificationsList from '../Components/Notificationslist';
import AlertModal from '../Components/Alerts';
import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  
  // Safely grab local storage attributes once upfront globally for the component
  const userData = JSON.parse(localStorage.getItem('userData') || 'null');
  
  const [notifications, setNotifications] = useState(false);
  const [alerts, setAlerts] = useState(null); // Fallback to null instead of array to prevent ref comparisons loops
  const [allNotifications, setAllNotifications] = useState([]); // Safely default to an array

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('https://campusbuy-backend-nkmx.onrender.com/mobilcreatenotifications');
        const list = res.data.notifications || [];
        setAllNotifications(list);
        localStorage.setItem('notifications', JSON.stringify(list));
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };

    const fetchalerts = async () => {
      try {
        const res = await axios.get('https://campusbuy-backend-nkmx.onrender.com/mobilcreatealert');
        if (res.data.alerts && res.data.alerts.length > 0) {
          setAlerts(res.data.alerts[0]);
        }
      } catch (err) {
        console.error('Failed to load alerts:', err);
      }
    };

    const fetchnewsevents = async () => {
      try {
        const res = await axios.get('https://campusbuy-backend-nkmx.onrender.com/mobilcreatenewsevents');
        const newsList = res.data.newsEvent || [];
        localStorage.setItem('newsevents', JSON.stringify(newsList));
      } catch (err) {
        console.error('Failed to load new/events:', err);
      }
    };

    const fetchuser = async (id) => {
      try {
        const res = await axios.get(`https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/getuser/${id}`);
        const user = res.data.user || null;
        if (user) {
          localStorage.setItem('userData', JSON.stringify(user));
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    };

    // Triggering data fetch
    fetchnewsevents();
    fetchalerts();
    fetchNotifications();
    
    if (userData?._id) {
      fetchuser(userData._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNotifications = () => setNotifications(true);
  const closeNotifications = () => setNotifications(false);

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.animate-on-scroll')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#001F5B] via-[#001845] to-[#0A3D6B] overflow-hidden">
        {/* FIXED: Single unified layout declaration */}
        <Header 
          isOpen={openNotifications}
          notifications={allNotifications}
        />
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#E30613]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E30613]/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text */}
          <div className="text-white text-center lg:text-left max-w-2xl animate-on-scroll">
            <h1 className="text-[20px] sm:text-[15px] lg:text-[15px] font-extrabold leading-tight mb-8 drop-shadow-2xl">
              Welcome Home,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] to-[#ff4444]">
                EMRAN Family
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed opacity-90">
              ExxonMobil Retirees Association of Nigeria – Advancing welfare, unity,
              and comradeship for all retirees.
            </p>

            <p className="text-lg text-gray-300 mb-12">
              Incorporated under CAMA 2020 • Reg. No. 153528 • Serving you since 2020
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
              {userData ? (
                <button
                  onClick={() => navigate(`/dashboard/${userData._id}`)}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#E30613] to-[#c20511] text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[#E30613]/50"
                >
                  <span className="relative z-10">Go to My Dashboard</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </button>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="group relative overflow-hidden bg-gradient-to-r from-[#E30613] to-[#c20511] text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[#E30613]/50 text-center"
                  >
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="group relative bg-white text-[#001F5B] font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-gray-50 text-center border-4 border-[#E30613]/20"
                  >
                    Create Account
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 animate-on-scroll">
            <div className="relative group">
              <img
                src={heroImage}
                alt="EMRAN Family Gathering"
                className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white/40 object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 220">
            <path
              fill="#F8F9FA"
              d="M0 120L48 130C96 140 192 160 288 155C384 150 480 120 576 115C672 110 768 130 864 140C960 150 1056 150 1152 145C1248 140 1344 130 1392 125L1440 120V220H0V120Z"
            />
          </svg>
        </div>
      </div>

      {/* ================= CORE PILLARS SECTION ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-5xl font-bold text-[#001F5B] mb-6">Our Core Pillars</h2>
          <p className="text-2xl text-gray-600 mb-20">From EMRAN Constitution – Built for You</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "🏛️",
                title: "Who We Are",
                desc: "EMRAN is a registered association of ExxonMobil retirees, founded to preserve unity, dignity, and lifelong fellowship.",
                path: "/about",
              },
              {
                icon: "📜",
                title: "Our Purpose",
                desc: "To protect collective interests, promote mutual support, and maintain strong institutional continuity among members.",
                path: "/resources",
              },
              {
                icon: "🤝",
                title: "Our Community",
                desc: "A trusted network built on shared history, transparency, accountability, and mutual respect.",
                path: "/community",
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className="group cursor-pointer bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 focus:outline-none focus:ring-4 focus:ring-[#E30613]/30"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#E30613] to-[#c20511] rounded-full flex items-center justify-center mx-auto mb-8 text-5xl text-white shadow-lg group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-[#001F5B] mb-6">{item.title}</h3>
                <p className="text-gray-600 text-lg mb-8">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-[#E30613] font-bold text-lg group-hover:underline">
                  Learn More <span className="group-hover:translate-x-1 transition">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWS & EVENTS SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 animate-on-scroll">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-bold text-[#001F5B] mb-4">Latest News & Events</h2>
              <p className="text-2xl text-gray-600">Stay informed about upcoming milestones, welfare news, and updates</p>
            </div>
            <NavLink 
              to="/news" 
              className="text-xl font-bold text-[#E30613] hover:text-[#c20511] flex items-center gap-2 whitespace-nowrap group focus:outline-none focus:underline"
            >
              View All News <span className="group-hover:translate-x-2 transition">→</span>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                tag: "Welfare",
                tagColor: "bg-emerald-100 text-emerald-800",
                title: "Annual Medical Check-up Updates",
                desc: "Important health updates, partner clinic additions, and registration links for our comprehensive 2026 wellness packages.",
                date: "June 15, 2026",
                author: "Welfare Committee"
              },
              {
                tag: "Event",
                tagColor: "bg-blue-100 text-blue-800",
                title: "EMRAN Annual General Meeting",
                desc: "Join us for our upcoming general meeting. We will discuss foundational strategies, review budget distributions, and plan future growth frameworks.",
                date: "June 10, 2026",
                author: "Secretariat"
              },
              {
                tag: "Notice",
                tagColor: "bg-amber-100 text-amber-800",
                title: "New Digital Verification Portal Launch",
                desc: "A simplified, highly secure portal built from scratch to verify active profiles and maintain seamless connection across all network chains.",
                date: "May 28, 2026",
                author: "IT Support Team"
              }
            ].map((news, index) => (
              <article 
                key={index} 
                className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-2 group"
              >
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider ${news.tagColor}`}>
                      {news.tag}
                    </span>
                    <span className="text-sm font-medium text-gray-400">{news.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4 line-clamp-2 group-hover:text-[#E30613] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-grow line-clamp-3">
                    {news.desc}
                  </p>
                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-gray-500">By {news.author}</span>
                    <span className="text-[#E30613] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-[#001F5B] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-5xl font-bold mb-10">Officially Registered & Trusted</h2>
          <p className="text-2xl mb-12 opacity-90">Incorporated under CAMA 2020 • Reg. No. 153528</p>

          <div className="relative max-w-4xl mx-auto group">
            <img
              src={cacCertificate}
              alt="Official CAC Certificate"
              className="w-full rounded-3xl shadow-2xl border-8 border-white/20 object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <p className="mt-12 text-2xl opacity-90">Proudly serving ExxonMobil retirees since 2020</p>
        </div>
      </section>

      {notifications && (
        <NotificationsList 
          isOpen={notifications} 
          onClose={closeNotifications} 
          notifications={allNotifications}
        />
      )}
      
      {alerts && <AlertModal alert={alerts} />}
      <Footer />
    </>
  );
};

export default Homepage;
