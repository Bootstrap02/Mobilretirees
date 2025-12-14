// pages/Support.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Support = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) navigate('/signin');
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001F5B] text-center mb-12">
            We're Here to Help
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
              <div className="text-6xl mb-6">📞</div>
              <h3 className="text-3xl font-bold text-[#001F5B] mb-4">Call Us</h3>
              <p className="text-xl text-gray-700 mb-6">
                Dedicated support line available 24/7
              </p>
              <a
                href="tel:+23412777700"
                className="block text-4xl font-bold text-[#E30613] hover:text-[#ff1a2e] transition mb-2"
              >
                +234 1 277 7700
              </a>
              <p className="text-gray-600">Lagos Office</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
              <div className="text-6xl mb-6">✉️</div>
              <h3 className="text-3xl font-bold text-[#001F5B] mb-4">Email Us</h3>
              <p className="text-xl text-gray-700 mb-6">
                Get a response within 24 hours
              </p>
              <a
                href="mailto:retirees.support@exxonmobil.ng"
                className="block text-2xl font-bold text-[#001F5B] hover:text-[#E30613] transition"
              >
                retirees.support@exxonmobil.ng
              </a>
            </div>
          </div>

          <div className="bg-[#001F5B] text-white rounded-3xl p-10 text-center">
            <h3 className="text-3xl font-bold mb-6">Office Visit</h3>
            <p className="text-xl mb-4">
              ExxonMobil Retirees Welfare Office
            </p>
            <p className="text-lg opacity-90 mb-8">
              26 Acacia Drive, Osborne Foreshore Estate Phase 2,<br />
              Ikoyi, Lagos
            </p>
            <p className="text-lg">
              Monday – Friday: 9:00 AM – 4:00 PM
            </p>
          </div>

          <div className="mt-16 bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency?</h3>
            <p className="text-xl text-red-700">
              For urgent medical or pension issues outside office hours,<br />
              call the 24/7 hotline immediately.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;