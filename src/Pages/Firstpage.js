// pages/Homepage.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import heroImage from '../assets/retirees-hero.png'; // Replace with actual retiree group photo
import cacCertificate from '../assets/cac-certificate.jpg'; // Add the CAC certificate image

const Homepage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <>
      {/* Hero Section - Fixed Mobile Stack, No Overflow */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] overflow-hidden">
        <Header />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#E30613] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E30613] rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Section - Added Details from Constitution */}
          <div className="text-white text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Welcome Home,<br />
              <span className="text-[#E30613]">EMRAN Family</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 leading-relaxed">
              ExxonMobil Retirees Association of Nigeria (EMRAN) – Advancing Retirees Welfare. 
              Established to promote peaceful coexistence, social interaction, and welfare among retirees of ExxonMobil Upstream Affiliates in Nigeria.
            </p>
            <p className="text-base text-gray-300 mb-10">
              Incorporated under CAMA 2020 (Reg. No. 153528). Join us for comradeship, advocacy with ExxonMobil, and maximum pension benefits.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              {userData ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
                >
                  Go to My Dashboard
                </button>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transition transform hover:scale-105 text-center"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-white text-[#001F5B] font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:bg-gray-100 transition transform hover:scale-105 text-center"
                  >
                    Create Account
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Hero Image - Responsive */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <img
              src={heroImage}
              alt="ExxonMobil Nigeria Retirees"
              className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white/30 object-cover"
            />
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F8F9FA" d="M0 100L60 120C120 140 240 180 360 170C480 160 600 100 720 90C840 80 960 120 1080 140C1200 160 1320 160 1380 160L1440 160V180H0Z"/>
          </svg>
        </div>
      </div>

      {/* Features Section - Added More Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#001F5B] mb-4">Our Core Pillars</h2>
          <p className="text-xl text-gray-600 mb-16">
            Based on EMRAN Constitution: Welfare, Advocacy, and Community for ExxonMobil Retirees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">₦</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Pension Advocacy</h3>
              <p className="text-gray-600 mb-4">
                Ensure maximum benefits from Pension Funds, including investment incomes and terminal payments.
              </p>
              <NavLink to="/pension" className="text-[#E30613] font-bold hover:underline">
                Learn More
              </NavLink>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Health & Welfare</h3>
              <p className="text-gray-600 mb-4">
                Access medical plans, welfare support, and death benefits for members and spouses.
              </p>
              <NavLink to="/health" className="text-[#E30613] font-bold hover:underline">
                Learn More
              </NavLink>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Community & Events</h3>
              <p className="text-gray-600 mb-4">
                Promote comradeship with local/international retirees through meetings, events, and online platforms.
              </p>
              <NavLink to="/events" className="text-[#E30613] font-bold hover:underline">
                Learn More
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Added CAC Certificate */}
      <section className="py-20 bg-[#001F5B] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Officially Registered & Trusted</h2>
          <p className="text-xl mb-8">Incorporated under CAMA 2020 (Reg. No. 153528)</p>
         <img 
  src={cacCertificate}
  alt="CAC Certificate - EMRAN Registration No. 153528"
  className="w-full max-w-sm sm:max-w-md mx-auto rounded-xl shadow-xl border-4 border-[#E30613] object-contain"
/>
          <p className="mt-6 text-lg opacity-80">Serving ExxonMobil retirees since 2020</p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;