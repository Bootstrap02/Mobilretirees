
// pages/NewsEvents.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const API = 'https://campusbuy-backend-nkmx.onrender.com/mobilcreatenewsevents';

const CATEGORY_CONFIG = {
  birthday:  { label: 'Birthday',      emoji: '🎂', color: '#F59E0B', bg: '#FEF3C7' },
  wedding:   { label: 'Wedding',        emoji: '💍', color: '#EC4899', bg: '#FDF2F8' },
  funeral:   { label: 'Funeral/Burial', emoji: '🕊️', color: '#6B7280', bg: '#F3F4F6' },
  obituary:  { label: 'Obituary',       emoji: '🕯️', color: '#374151', bg: '#F9FAFB' },
  event:     { label: 'Event',          emoji: '📅', color: '#3B82F6', bg: '#EFF6FF' },
  custom:    { label: 'Announcement',   emoji: '📢', color: '#001F5B', bg: '#EEF2FA' },
  general:   { label: 'News',           emoji: '📰', color: '#001F5B', bg: '#EEF2FA' },
};
const getCat = (cat) => CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.general;

// ── IMAGE SLIDER ─────────────────────────────────────────────────────────────
// ── IMAGE SLIDER ─────────────────────────────────────────────────────────────
const ImageSlider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const resumeTimer = useRef(null);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!images || images.length <= 1 || lightbox || paused) return;
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images, lightbox, paused]);

  // Temporarily pause auto-advance after manual interaction, then resume
  const pauseThenResume = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 5000);
  };

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  if (!images || images.length === 0) return null;

  const prev = (e) => { e?.stopPropagation(); pauseThenResume(); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e?.stopPropagation(); pauseThenResume(); setCurrent(i => (i + 1) % images.length); };
  const goTo = (i) => { pauseThenResume(); setCurrent(i); };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { pauseThenResume(); diff > 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden rounded-3xl mb-4 bg-gray-100 select-none shadow-lg ring-1 ring-black/5"
        style={{ aspectRatio: '4/3' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setLightbox(true)}
      >
        {/* Crossfading images, stacked */}
        <div className="relative w-full h-full cursor-pointer">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'scale(1.02)' : 'scale(1.08)',
              }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          ))}
          {/* Bolder gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10 pointer-events-none" />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition z-10 backdrop-blur-sm"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition z-10 backdrop-blur-sm"
            >
              <FiChevronRight className="text-xl" />
            </button>

            {/* Bigger, bolder dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className={`rounded-full transition-all duration-300 shadow ${
                    i === current ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 backdrop-blur-sm">
              {current + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/30 text-xl font-bold z-10">
            x
          </button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 text-white bg-white/20 rounded-full p-3 hover:bg-white/30 z-10">
                <FiChevronLeft className="text-2xl" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 text-white bg-white/20 rounded-full p-3 hover:bg-white/30 z-10">
                <FiChevronRight className="text-2xl" />
              </button>
            </>
          )}
          <img
            src={images[current]}
            alt={`${title} ${current + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
          {images.length > 1 && (
            <p className="absolute bottom-4 text-white/60 text-sm">{current + 1} / {images.length}</p>
          )}
        </div>
      )}
    </>
  );
};
                


// ── News Card ────────────────────────────────────────────────────────────────
const NewsCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const catInfo = getCat(item.category || item.type || 'general');

  // Support single image (item.image) or array (item.images)
  const images = item.images?.length ? item.images : item.image ? [item.image] : [];

  const body   = item.body || item.content || item.description || '';
  const isLong = body.length > 280;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Category + date row */}
      <div className="px-6 pt-5 pb-3 flex items-center gap-2 flex-wrap">
        <span className="text-xl">{catInfo.emoji}</span>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ color: catInfo.color, background: catInfo.bg }}>
          {catInfo.label}
        </span>
        {(item.eventDate || item.date || item.createdAt) && (
          <span className="ml-auto text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
            <FiCalendar />
            {new Date(item.eventDate || item.date || item.createdAt)
              .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}
      </div>

      {/* Image slider */}
      {images.length > 0 && (
        <div className="px-6">
          <ImageSlider images={images} title={item.title} />
        </div>
      )}

      {/* Text content */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-extrabold text-[#001F5B] mb-3 leading-tight">{item.title}</h2>
        {body && (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {isLong && !expanded ? body.substring(0, 280) + '...' : body}
          </p>
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

// ── Main Page ────────────────────────────────────────────────────────────────
const NewsEvents = () => {
  const navigate = useNavigate();
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [filter,  setFilter]  = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }

    const load = async () => {
      try {
        const res = await axios.get(API);
        const data = res.data.newsEvents || res.data.newsevents || res.data || [];
        const sorted = [...data].sort((a, b) =>
          new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0));
        setItems(sorted);
        localStorage.setItem('newsevents', JSON.stringify(sorted));
      } catch {
        const cached = JSON.parse(localStorage.getItem('newsevents') || '[]');
        setItems(cached);
        if (!cached.length) setError('Could not load news. Check your connection.');
      } finally { setLoading(false); }
    };
    load();

    // Listen for REFRESH_NEWSEVENTS message from service worker
    // This fires when user taps a push notification and the page is already open
    const handleSwMessage = (event) => {
      if (event.data?.type === 'REFRESH_NEWSEVENTS') {
        setLoading(true);
        load();
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSwMessage);
    return () => navigator.serviceWorker?.removeEventListener('message', handleSwMessage);
  }, [navigate]);

  const categories = ['all', ...Object.keys(CATEGORY_CONFIG)];
  const filtered   = filter === 'all'
    ? items
    : items.filter(item => (item.category || item.type || 'general') === filter);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-2">News & Events</h1>
            <p className="text-gray-500 text-lg">Stay updated with the latest from EMRAN</p>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => {
              const info   = cat === 'all' ? { label: 'All', emoji: '📋' } : getCat(cat);
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

          {loading ? (
            <div className="text-center py-20 text-[#001F5B] text-xl animate-pulse">Loading...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-5 text-center font-medium">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
              <div className="text-7xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">
                {filter === 'all' ? 'No posts yet' : `No ${getCat(filter).label} posts yet`}
              </h3>
              <p className="text-gray-500">Check back later for updates from EMRAN.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((item, i) => <NewsCard key={item._id || i} item={item} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsEvents;
