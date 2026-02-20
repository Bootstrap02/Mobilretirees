// pages/NewsDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from "axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`https://campusbuy-backend-nkmx.onrender.com/mobilcreatenewsevents/${id}`);
        const newsData = res.data.newsEvent;
        setNews(newsData);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]); // dependency on id — re-fetch if id changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl text-gray-600 animate-pulse">Loading news details...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-6">News Not Found</h1>
        <p className="text-xl text-gray-700 mb-8 text-center">{error || 'The requested news could not be found.'}</p>
        <NavLink 
          to="/newsevents"
          className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-12 py-5 rounded-full shadow-xl transition transform hover:scale-105"
        >
          Back to News & Events
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <NavLink 
            to="/newsevents"
            className="text-[#E30613] font-bold text-lg mb-8 inline-block hover:underline flex items-center gap-2"
          >
            ← Back to News & Events
          </NavLink>

          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={news.image?.[0] || 'https://via.placeholder.com/800x500?text=News+Image'}
              alt={news.title || 'News Image'}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl shadow-2xl"
              onError={(e) => e.target.src = 'https://via.placeholder.com/800x500?text=News+Image'}
            />
          </div>

          {/* Title & Date */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#001F5B] mb-6 leading-tight">
            {news.title || 'Untitled News'}
          </h1>

          <p className="text-xl text-gray-600 mb-12">
  {news.createdAt 
    ? new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        timeZoneName: 'short' 
      }).format(new Date(news.createdAt)) 
    : 'Date not available'}
</p>

          {/* Content */}
          <div className="prose prose-lg sm:prose-xl max-w-none text-gray-700 leading-relaxed">
            <p><strong>Full Description:</strong></p>
            <p>{news.body || news.desc || 'No detailed description available.'}</p>
          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
            <NavLink 
              to="/newsevents"
              className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110 inline-block"
            >
              Back to All News & Events
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;