// pages/Homepage.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import exxonLogo from '../assets/exxonmobil-logo-white.png';
import heroImage from '../assets/exxonmobil-logo-white.png'; // Add a beautiful photo of smiling Nigerian retirees

const Homepage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] overflow-hidden">
        <Header />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#E30613] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E30613] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between">
          {/* Left: Text */}
          <div className="text-white max-w-2xl text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Welcome Home,<br />
              <span className="text-[#E30613]">ExxonMobil Family</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
              Your lifelong partner in retirement. Access your pension, health benefits, 
              community updates, and support — all in one secure place.
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

          {/* Right: Hero Image */}
          <div className="mt-16 lg:mt-0 lg:w-1/2">
            <img
              src={heroImage}
              alt="Happy ExxonMobil Nigeria Retirees"
              className="rounded-3xl shadow-2xl border-8 border-white/20"
            />
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F8F9FA" d="M0 100L60 120C120 140 240 180 360 170C480 160 600 100 720 90C840 80 960 120 1080 140C1200 160 1320 160 1380 160L1440 160V200H1380C1320 200 1200 200 1080 200C960 200 840 200 720 200C600 200 480 200 360 200C240 200 120 200 60 200H0V100Z"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#001F5B] mb-4">
            Everything You Need, In One Place
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Secure. Simple. Built for you.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">₦</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Pension & Payments</h3>
              <p className="text-gray-600">
                View your monthly pension, payment history, and next payment date.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">Heart</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Health Benefits</h3>
              <p className="text-gray-600">
                Access your medical plan, find hospitals, and track claims.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
              <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">People</span>
              </div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Community</h3>
              <p className="text-gray-600">
                Stay connected with events, news, and fellow retirees across Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#001F5B] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Trusted by Thousands of Retirees</h2>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            <img src={exxonLogo} alt="ExxonMobil" className="h-16 opacity-80" />
            <div className="text-6xl font-bold text-[#E30613]">50+</div>
            <p className="text-2xl">Years of Service to Nigeria</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;