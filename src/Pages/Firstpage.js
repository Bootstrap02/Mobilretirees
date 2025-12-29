// pages/Homepage.jsx — BEAUTIFIED VERSION
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import heroImage from '../assets/exxonmobil-logo-white.jpg';
import cacCertificate from '../assets/cac-certificate.jpg';

const Homepage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      {/* Hero Section - Premium Glow & Animations */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#001F5B] via-[#001845] to-[#0A3D6B] overflow-hidden">
        <Header />

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#E30613]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E30613]/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text - Elegant Fade In */}
          <div className="text-white text-center lg:text-left max-w-2xl animate-on-scroll">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 drop-shadow-2xl">
              Welcome Home,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] to-[#ff4444]">EMRAN Family</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed opacity-90">
              ExxonMobil Retirees Association of Nigeria – Advancing welfare, unity, and comradeship for all retirees.
            </p>
            <p className="text-lg text-gray-300 mb-12">
              Incorporated under CAMA 2020 • Reg. No. 153528 • Serving you since 2020
            </p>

            {/* Premium Buttons with Shine & Pulse */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
              {userData ? (
                <button
                  onClick={() => navigate('/dashboard')}
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

          {/* Hero Image - Gentle Zoom */}
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

        {/* Premium Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F8F9FA" d="M0 120L48 130C96 140 192 160 288 155C384 150 480 120 576 115C672 110 768 130 864 140C960 150 1056 150 1152 145C1248 140 1344 130 1392 125L1440 120V220H1392C1344 220 1248 220 1152 220C1056 220 960 220 864 220C768 220 672 220 576 220C480 220 384 220 288 220C192 220 96 220 48 220H0V120Z"/>
          </svg>
        </div>
      </div>

      {/* Features - Card Lift & Glow */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-5xl font-bold text-[#001F5B] mb-6">Our Core Pillars</h2>
          <p className="text-2xl text-gray-600 mb-20">From EMRAN Constitution – Built for You</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "₦", title: "Pension Advocacy", desc: "Maximum benefits, investment income, and terminal payments." },
              { icon: "❤️", title: "Health & Welfare", desc: "Medical support, death benefits, and family care." },
              { icon: "👥", title: "Community", desc: "Events, meetings, and lifelong comradeship." }
            ].map((item, i) => (
              <div key={i} className="group bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[#E30613] to-[#c20511] rounded-full flex items-center justify-center mx-auto mb-8 text-5xl text-white shadow-lg group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-[#001F5B] mb-6">{item.title}</h3>
                <p className="text-gray-600 text-lg mb-8">{item.desc}</p>
                <span className="text-[#E30613] font-bold text-lg hover:underline cursor-pointer">Learn More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Premium Certificate */}
      <section className="py-24 bg-[#001F5B] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-5xl font-bold mb-10">Officially Registered & Trusted</h2>
          <p className="text-2xl mb-12 opacity-90">Incorporated under CAMA 2020 • Reg. No. 153528</p>
          
          <div className="relative max-w-4xl mx-auto group">
            <img 
              src={cacCertificate}
              alt="Official CAC Certificate"
              className="w-full rounded-3xl shadow-2xl border-8 border-[#E30613]/50 object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#E30613]/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <p className="mt-12 text-2xl opacity-90">Proudly serving ExxonMobil retirees since 2020</p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;