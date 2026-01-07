// pages/NewsEvents.jsx — DYNAMIC WITH IMAGES & CLICKABLE TO /news/:id
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import News from "./News";

// Import images from assets (add your real event/news photos)
import featuredEvent from '../assets/medical-icon.webp'; // Big featured
import event1 from '../assets/death-icon.jpg';
import event2 from '../assets/death-icon2.jpeg';
import news1 from '../assets/exxonmobil-logo-white.jpg';
import news2 from '../assets/money-laundering-certificate.jpg';
import news3 from '../assets/Group 232.png';

const NewsEvents = () => {
  // DYNAMIC DATA — Replace with API fetch later
  const featured = {
    id: 1,
    title: "EMRAN End-of-Year Get-Together 2025",
    date: "December 18, 2025",
    location: "Eko Hotel, Lagos",
    desc: "Annual fellowship dinner, awards, and celebration for all retirees.",
    image: featuredEvent
  };

  const items = [
    {
      id: 2,
      title: "November Pension Credited",
      date: "Nov 25, 2025",
      desc: "Monthly pension successfully paid. Contact support if not received.",
      image: news1,
      type: "news"
    },
    {
      id: 3,
      title: "New HMO Partnership",
      date: "Oct 2025",
      desc: "Expanded coverage with Reddington Hospital nationwide.",
      image: news2,
      type: "news"
    },
    {
      id: 4,
      title: "Christmas Party 2025",
      date: "Dec 18, 2025",
      desc: "Festive celebration with family and friends.",
      image: event1,
      type: "event"
    },
    {
      id: 5,
      title: "Health Talk: Hypertension",
      date: "Jan 15, 2026",
      desc: "Virtual session with medical experts.",
      image: event2,
      type: "event"
    },
    {
      id: 6,
      title: "PENGASSAN Pension Summit Update",
      date: "Dec 2025",
      desc: "Key resolutions for retiree pension improvements.",
      image: news3,
      type: "news"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] text-center mb-16">
            News & Events
          </h1>

          {/* FEATURED – BOLD & IMPRESSIVE */}
          <NavLink to={`/news/${featured.id}`} className="block mb-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform duration-500 hover:scale-105">
              <img src={featured.image} alt={featured.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-12 text-white">
                <span className="bg-[#E30613] px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">FEATURED</span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{featured.title}</h2>
                <p className="text-2xl mb-2">{featured.date} • {featured.location}</p>
                <p className="text-xl opacity-90">{featured.desc}</p>
              </div>
            </div>
          </NavLink>

          {/* OTHER ITEMS – Google-Style Small Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map(item => (
              <NavLink key={item.id} to={`/news/${item.id}`} className="block group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <span className="text-sm text-gray-500 mb-2 block">{item.date}</span>
                    <h3 className="text-xl font-bold text-[#001F5B] mb-3 group-hover:text-[#E30613] transition">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 line-clamp-3">{item.desc}</p>
                    <span className="text-[#E30613] font-bold mt-4 inline-block group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsEvents;