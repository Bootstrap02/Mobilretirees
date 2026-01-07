// pages/Support.jsx — WITH "SEND US A MESSAGE" FORM
import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You will connect this to your API
    console.log('Form submitted:', { name, email, subject, message });
    setSubmitted(true);
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] mb-8">
              We're Here to Help
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Get support for pension, medical, membership, or any retiree concerns.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl transition">
              <div className="text-7xl mb-8">📞</div>
              <h3 className="text-3xl font-bold text-[#001F5B] mb-6">Call Us</h3>
              <p className="text-xl text-gray-700 mb-8">
                24/7 dedicated support line
              </p>
              <a 
                href="tel:+23412777700"
                className="text-2xl font-bold text-[#E30613] hover:text-[#c20511] transition block mb-4"
              >
                +234 1 277 7700
              </a>
              <p className="text-gray-600">Lagos Office</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl transition">
              <div className="text-7xl mb-8">✉️</div>
              <h3 className="text-3xl font-bold text-[#001F5B] mb-6">Email Us</h3>
              <p className="text-xl text-gray-700 mb-8">
                Response within 24 hours
              </p>
              <a 
                href="mailto:retirees.support@exxonmobil.ng"
                className="text-xl font-bold text-[#001F5B] hover:text-[#E30613] transition block"
              >
                retirees.support@exxonmobil.ng
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center hover:shadow-3xl transition">
              <div className="text-7xl mb-8">📍</div>
              <h3 className="text-3xl font-bold text-[#001F5B] mb-6">Visit Us</h3>
              <p className="text-xl text-gray-700 mb-8">
                Mon – Fri: 9:00 AM – 4:00 PM
              </p>
              <p className="text-lg text-gray-700">
                26 Acacia Drive<br />
                Osborne Foreshore Estate Phase 2<br />
                Ikoyi, Lagos
              </p>
            </div>
          </div>

          {/* SEND US A MESSAGE FORM – CENTERED & PROMINENT */}
          <section className="mb-20">
            <h2 className="text-5xl font-bold text-[#001F5B] text-center mb-16">
              Send Us a Message
            </h2>
            <div className="max-w-4xl mx-auto">
              {submitted ? (
                <div className="bg-green-50 border-4 border-green-300 rounded-3xl p-16 text-center">
                  <div className="text-8xl mb-8">✅</div>
                  <h3 className="text-4xl font-bold text-green-800 mb-6">
                    Thank You!
                  </h3>
                  <p className="text-2xl text-green-700">
                    Your message has been sent. Our team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-16 space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <input 
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-8 py-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition"
                      required
                    />
                    <input 
                      type="email"
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-8 py-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition"
                      required
                    />
                  </div>
                  <input 
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-8 py-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition"
                    required
                  />
                  <textarea 
                    placeholder="Your Message (pension, medical, membership, etc.)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="8"
                    className="w-full px-8 py-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] transition resize-none"
                    required
                  />
                  <div className="text-center">
                    <button 
                      type="submit"
                      className="inline-flex items-center gap-4 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-2xl px-20 py-8 rounded-full shadow-2xl transition transform hover:scale-110"
                    >
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* Emergency */}
          <div className="bg-red-50 border-4 border-red-300 rounded-3xl p-16 text-center">
            <h3 className="text-4xl font-bold text-red-800 mb-8">Emergency Support</h3>
            <p className="text-2xl text-red-700 mb-8">
              For urgent medical or pension issues outside office hours
            </p>
            <a 
              href="tel:+23412777700"
              className="text-5xl font-bold text-red-800 hover:text-red-900 transition"
            >
              Call +234 1 277 7700 Immediately
            </a>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;