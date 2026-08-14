// pages/NewsEvents.jsx — User-facing news & events page
// Handles: single image, multiple images (up to 4), all template categories
// Each card shows category badge, title, date, and image gallery

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const API = 'https://campusbuy-backend-nkmx.onrender.com/mobilcreatenewsevents';

// Category badge config
const CATEGORY_CONFIG = {
  birthday:  { label: 'Birthday',       emoji: '🎂', color: '#F59E0B', bg: '#FEF3C7' },
  wedding:   { label: 'Wedding',         emoji: '💍', color: '#EC4899', bg: '#FDF2F8' },
  funeral:   { label: 'Funeral/Burial',  emoji: '🕊️', color: '#6B7280', bg: '#F3F4F6' },
  obituary:  { label: 'Obituary',        emoji: '🕯️', color: '#374151', bg: '#F9FAFB' },
  event:     { label: 'Event',           emoji: '📅', color: '#3B82F6', bg: '#EFF6FF' },
  custom:    { label: 'Announcement',    emoji: '📢', color: '#001F5B', bg: '#EEF2FA' },
  general:   { label: 'News',            emoji: '📰', color: '#001F5B', bg: '#EEF2FA' },
};

const getCategoryInfo = (cat) =>
  CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.general;

// ── Image Gallery (handles 1–4 images) ─────────────────────────────────────
const ImageGallery = ({ images, title }) => {
  const [lightbox, setLightbox] = useState(null); // index of open image

  if (!images || images.length === 0) return null;

  const single = images.length === 1;
  const two    = images.length === 2;
  const three  = images.length === 3;
  const four   = images.length >= 4;

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox(i => (i - 1 + images.length) % images.length);
  const nextImg = () => setLightbox(i => (i + 1) % images.length);

  return (
    <>
      {/* Grid layout based on count */}
      <div className={`w-full rounded-2xl overflow-hidden mb-4 ${
        single ? '' :
        two    ? 'grid grid-cols-2 gap-1' :
        three  ? 'grid grid-cols-2 gap-1' :
                 'grid grid-cols-2 gap-1'
      }`}>
        {images.slice(0, 4).map((img, idx) => (
          <div key={idx}
            onClick={() => openLightbox(idx)}
            className={`relative overflow-hidden bg-gray-100 cursor-pointer group ${
              single         ? 'w-full h-56'         :
              two            ? 'h-44'                :
              three && idx===0 ? 'col-span-2 h-44'  :
              three          ? 'h-40'                :
              four && idx===0 ? 'col-span-2 h-44'   :
                               'h-36'
            }`}>
            <img src={img} alt={`${title} ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={e => { e.target.style.display = 'none'; }}
            />
            {/* Show "+N more" overlay on last visible image if >4 */}
            {images.length > 4 && idx === 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-xl">+{images.length - 4} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition z-10">
            <FiX className="text-2xl" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-4 text-white bg-white/20 rounded-full p-3 hover:bg-white/30 transition z-10">
            <FiChevronLeft className="text-2xl" />
          </button>
          <img src={images[lightbox]} alt={`${title} ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl" />
          <button onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-4 text-white bg-white/20 rounded-full p-3 hover:bg-white/30 transition z-10">
            <FiChevronRight className="text-2xl" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

// ── Single News/Event card ───────────────────────────────────────────────────
const NewsCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const catInfo = getCategoryInfo(item.category || item.type || 'general');

  // Support both single image (item.image) and multiple (item.images array)
  const images = item.images?.length
    ? item.images
    : item.image
      ? [item.image]
      : [];

  const body = item.body || item.content || item.description || '';
  const isLong = body.length > 280;

  const fmtDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Category badge */}
      <div className="px-6 pt-5 pb-2 flex items-center gap-2">
        <span className="text-xl">{catInfo.emoji}</span>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ color: catInfo.color, background: catInfo.bg }}>
          {catInfo.label}
        </span>
        {(item.eventDate || item.date || item.createdAt) && (
          <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
            <FiCalendar className="flex-shrink-0" />
            {fmtDate(item.eventDate || item.date || item.createdAt)}
          </span>
        )}
      </div>

      {/* Image gallery */}
      {images.length > 0 && (
        <div className="px-6">
          <ImageGallery images={images} title={item.title} />
        </div>
      )}

      {/* Content */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-extrabold text-[#001F5B] mb-3 leading-tight">{item.title}</h2>

        {body && (
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {isLong && !expanded
              ? body.substring(0, 280) + '...'
              : body}
          </div>
        )}

        {isLong && (
          <button onClick={() => setExpanded(x => !x)}
            className="mt-2 text-sm font-semibold text-[#E30613] hover:underline">
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Main NewsEvents page ─────────────────────────────────────────────────────
const NewsEvents = () => {
  const navigate = useNavigate();
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [filter,   setFilter]   = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }

    const load = async () => {
      try {
        const res = await axios.get(`${API}`);
        const data = res.data.newsEvents || res.data.newsevents || res.data || [];
        console.log(data)
        // Sort newest first
        const sorted = [...data].sort((a, b) =>
          new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0));
        setItems(sorted);
        // Cache locally
        localStorage.setItem('newsevents', JSON.stringify(sorted));
      } catch (err) {
        // Fall back to cached data
        const cached = JSON.parse(localStorage.getItem('newsevents')) || [];
        setItems(cached);
        if (!cached.length) setError('Could not load news. Check your connection.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const categories = ['all', ...Object.keys(CATEGORY_CONFIG)];
  const filtered = filter === 'all'
    ? items
    : items.filter(item => (item.category || item.type || 'general') === filter);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-2">
              News & Events
            </h1>
            <p className="text-gray-500 text-lg">Stay updated with the latest from EMRAN</p>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {categories.map(cat => {
              const info = cat === 'all' ? { label: 'All', emoji: '📋' } : getCategoryInfo(cat);
              const active = filter === cat;
              return (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition flex-shrink-0 ${
                    active
                      ? 'bg-[#001F5B] text-white shadow'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#001F5B]/30'
                  }`}>
                  <span>{info.emoji}</span>
                  <span>{info.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-20 text-[#001F5B] text-xl animate-pulse">
              Loading news & events...
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-5 text-center font-medium">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
              <div className="text-7xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">
                {filter === 'all' ? 'No posts yet' : `No ${getCategoryInfo(filter).label} posts yet`}
              </h3>
              <p className="text-gray-500">Check back later for updates from EMRAN.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((item, i) => (
                <NewsCard key={item._id || i} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsEvents;

