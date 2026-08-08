// pages/NewsEvents.jsx — UPDATED WITH TEMPLATE RENDERING
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import NewsEventTemplateRenderer from '../Components/NewsEventTemplateRenderer';

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
            {/* FEATURED EVENT */}
            <div className="mb-10 sm:mb-14">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                {featured.image && featured.image.length > 0 && (
                  <img 
                    src={featured.image[0]} 
                    alt={featured.title} 
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                  <span className="bg-[#E30613] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 inline-block">
                    FEATURED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="text-base sm:text-lg opacity-90 line-clamp-3">
                    {featured.body}
                  </p>
                </div>
              </div>
            </div>

            {/* OTHER ITEMS - Using Template Renderer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {items.slice(1).map(item => (
                <div key={item._id} className="block group">
                  <NewsEventTemplateRenderer newsEvent={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/Large View (hidden on max-lg) */}
          <div className="hidden lg:block">
            {/* FEATURED – BOLD & IMPRESSIVE */}
            <div className="mb-20">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform duration-500 hover:scale-105">
                {featured.image && featured.image.length > 0 && (
                  <img src={featured.image[0]} alt={featured.title} className="w-full h-96 object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                  <span className="bg-[#E30613] px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">FEATURED</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{featured.title}</h2>
                  <p className="text-xl opacity-90">{featured.body}</p>
                </div>
              </div>
            </div>

            {/* OTHER ITEMS - Using Template Renderer */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.slice(1).map(item => (
                <div key={item._id} className="block group">
                  <NewsEventTemplateRenderer newsEvent={item} />
                </div>
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