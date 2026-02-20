// pages/NewsEvents.jsx — CLEANED & FIXED VERSION
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const NewsEvents = () => {
  const [featured, setFeatured] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedNewsEvents = JSON.parse(localStorage.getItem('newsevents')) || [];

      if (storedNewsEvents.length > 0) {
        setFeatured(storedNewsEvents[0]);
        setItems(storedNewsEvents);
      } else {
        setError('No news or events available');
      }
    } catch (err) {
      console.error('Error loading news events:', err);
      setError('Failed to load news/events');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading news & events...</p>
      </div>
    );
  }

  if (error || !featured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error || 'No News or Events Available'}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] text-center mb-16">
            News & Events
          </h1>

          {/* Mobile View (hidden on lg and above) */}
          <div className="hidden max-lg:block px-4 sm:px-6">
            {/* FEATURED – BOLD & IMPRESSIVE – mobile reduced */}
            <NavLink to={`/news/${featured._id}`} className="block mb-10 sm:mb-14">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-xl transition-transform duration-300">
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                  <span className="bg-[#E30613] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 inline-block">
                    FEATURED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="text-base sm:text-lg mb-2 line-clamp-1">
                    {featured.timestamps} • 
                  </p>
                  <p className="text-base sm:text-lg opacity-90 line-clamp-3">
                    {featured.body}
                  </p>
                </div>
              </div>
            </NavLink>

            {/* OTHER ITEMS – Small Cards – 1 column on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {items.map(item => (
                <NavLink key={item._id} to={`/news/${item._id}`} className="block group">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 sm:duration-500"
                    />
                    <div className="p-4 sm:p-5">
                      <span className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2 block">
                        {item.timestamps}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#001F5B] mb-2 sm:mb-3 group-hover:text-[#E30613] transition line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 line-clamp-2 sm:line-clamp-3">
                        {item.body}
                      </p>
                      <span className="text-[#E30613] font-bold text-sm sm:text-base mt-2 sm:mt-3 inline-block group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop/Large View (hidden on max-lg) */}
          <div className="hidden lg:block">
            {/* FEATURED – BOLD & IMPRESSIVE */}
            <NavLink to={`/news/${featured._id}`} className="block mb-20">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform duration-500 hover:scale-105">
                <img src={featured.image} alt={featured.title} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                  <span className="bg-[#E30613] px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">FEATURED</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{featured.title}</h2>
                  <p className="text-2xl mb-2">{featured.timestamps} • {featured.location}</p>
                  <p className="text-xl opacity-90">{featured.body}</p>
                </div>
              </div>
            </NavLink>

            {/* OTHER ITEMS – Google-Style Small Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.map(item => (
                <NavLink key={item._id} to={`/news/${item._id}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-6">
                      <span className="text-sm text-gray-500 mb-2 block">{item.timestamps}</span>
                      <h3 className="text-xl font-bold text-[#001F5B] mb-3 group-hover:text-[#E30613] transition">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 line-clamp-3">{item.body}</p>
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
      </div>
      <Footer />
    </>
  );
};

export default NewsEvents;