
import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { faqCategories } from './Questions';

// ─── Animated Chevron ────────────────────────────────────────────────────────
const Chevron = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      flexShrink: 0,
    }}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Single FAQ Item ──────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid #e8ecf4',
        animationDelay: `${index * 40}ms`,
      }}
      className="faq-item"
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: open ? '#E30613' : '#001F5B',
          transition: 'color 0.25s ease',
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(15px, 2vw, 17px)',
            fontWeight: 600,
            lineHeight: 1.45,
            flex: 1,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: open ? '#E30613' : '#001F5B',
            transition: 'color 0.25s ease',
            paddingTop: '2px',
          }}
        >
          <Chevron open={open} />
        </span>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 'clamp(14px, 1.8vw, 15.5px)',
              color: '#4a5568',
              lineHeight: 1.85,
              paddingBottom: '24px',
              paddingRight: '36px',
              margin: 0,
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main FAQ Page ────────────────────────────────────────────────────────────
const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allFaqs = useMemo(
    () =>
      faqCategories.flatMap(cat =>
        cat.faqs.map(faq => ({ ...faq, category: cat.id, label: cat.label, icon: cat.icon }))
      ),
    []
  );

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && activeCategory === 'all') return null; // show by category
    return allFaqs.filter(faq => {
      const matchCat = activeCategory === 'all' || faq.category === activeCategory;
      const matchSearch = !q || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, activeCategory, allFaqs]);

  const displayCategories =
    activeCategory === 'all'
      ? faqCategories
      : faqCategories.filter(c => c.id === activeCategory);

  const totalCount = faqCategories.reduce((s, c) => s + c.faqs.length, 0);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        .faq-item { animation: fadeSlideUp 0.45s ease both; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cat-pill {
          transition: all 0.22s ease;
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .cat-pill:hover { transform: translateY(-2px); }

        .search-input:focus { outline: none; box-shadow: 0 0 0 3px rgba(227,6,19,0.15); }

        .stat-card {
          animation: fadeSlideUp 0.5s ease both;
        }

        .section-card {
          animation: fadeSlideUp 0.45s ease both;
        }

        mark {
          background: rgba(227,6,19,0.15);
          color: inherit;
          border-radius: 3px;
          padding: 0 2px;
        }
      `}</style>

      <Header />

      <main style={{ minHeight: '100vh', background: '#f7f8fc', paddingTop: '96px', paddingBottom: '80px' }}>

        {/* ── Hero Banner ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #001F5B 0%, #003494 60%, #001035 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(48px,8vw,88px) 24px clamp(56px,9vw,96px)',
            textAlign: 'center',
          }}
        >
          {/* decorative rings */}
          {[280, 420, 560].map((size, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: size,
                height: size,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.06)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* red accent line */}
          <div
            style={{
              width: 56,
              height: 4,
              background: '#E30613',
              borderRadius: 2,
              margin: '0 auto 20px',
            }}
          />

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 16px',
              letterSpacing: '-0.5px',
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 560,
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about EMRAN — membership, welfare, governance, and more.
          </p>

          {/* Search bar */}
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,31,91,0.5)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search questions…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
              style={{
                width: '100%',
                padding: '16px 20px 16px 50px',
                borderRadius: 50,
                border: 'none',
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                background: '#fff',
                color: '#001F5B',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#e8ecf4',
                  border: 'none',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#001F5B',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

          {/* ── Stats row ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              margin: '-28px 0 40px',
            }}
          >
            {[
              { value: faqCategories.length, label: 'Categories' },
              { value: totalCount, label: 'Questions' },
              { value: '2024', label: 'Edition' },
            ].map((s, i) => (
              <div
                key={i}
                className="stat-card"
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '20px 16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(0,31,91,0.09)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: 700,
                    color: '#E30613',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: '#7a8499',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Category pills ── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 40,
            }}
          >
            <button
              className="cat-pill"
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '9px 20px',
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: 600,
                background: activeCategory === 'all' ? '#001F5B' : '#fff',
                color: activeCategory === 'all' ? '#fff' : '#001F5B',
                boxShadow: activeCategory === 'all'
                  ? '0 4px 16px rgba(0,31,91,0.25)'
                  : '0 2px 8px rgba(0,31,91,0.08)',
              }}
            >
              All Topics
            </button>
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                className="cat-pill"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '9px 20px',
                  borderRadius: 50,
                  fontSize: 13.5,
                  fontWeight: 600,
                  background: activeCategory === cat.id ? '#001F5B' : '#fff',
                  color: activeCategory === cat.id ? '#fff' : '#001F5B',
                  boxShadow: activeCategory === cat.id
                    ? '0 4px 16px rgba(0,31,91,0.25)'
                    : '0 2px 8px rgba(0,31,91,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* ── Search results mode ── */}
          {filteredFaqs !== null && (
            <div>
              {filteredFaqs.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '64px 24px',
                    background: '#fff',
                    borderRadius: 20,
                    boxShadow: '0 4px 24px rgba(0,31,91,0.07)',
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 22,
                      color: '#001F5B',
                      marginBottom: 8,
                    }}
                  >
                    No results found
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#7a8499', fontSize: 15 }}>
                    Try a different keyword or browse by category above.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '8px 32px',
                    boxShadow: '0 4px 24px rgba(0,31,91,0.07)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: '#7a8499',
                      padding: '20px 0 4px',
                      margin: 0,
                    }}
                  >
                    {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
                  </p>
                  {filteredFaqs.map((faq, i) => (
                    <div key={i}>
                      {/* tiny category badge */}
                      {i === 0 || filteredFaqs[i - 1].category !== faq.category ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: 'rgba(227,6,19,0.08)',
                            color: '#E30613',
                            borderRadius: 50,
                            padding: '4px 12px',
                            fontSize: 11.5,
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            marginTop: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                          }}
                        >
                          {faq.icon} {faq.label}
                        </div>
                      ) : null}
                      <FaqItem q={faq.q} a={faq.a} index={i} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Category sections mode ── */}
          {filteredFaqs === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {displayCategories.map((cat, ci) => (
                <div
                  key={cat.id}
                  className="section-card"
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,31,91,0.07)',
                    animationDelay: `${ci * 60}ms`,
                  }}
                >
                  {/* Section header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '22px 32px',
                      borderBottom: '2px solid #f0f3fa',
                      background: 'linear-gradient(90deg, rgba(0,31,91,0.03) 0%, transparent 100%)',
                    }}
                  >
                    <span style={{ fontSize: 26 }}>{cat.icon}</span>
                    <div>
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 'clamp(18px, 2.5vw, 22px)',
                          fontWeight: 700,
                          color: '#001F5B',
                          margin: 0,
                        }}
                      >
                        {cat.label}
                      </h2>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: '#7a8499',
                          margin: '2px 0 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.07em',
                        }}
                      >
                        {cat.faqs.length} question{cat.faqs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {/* accent stripe */}
                    <div
                      style={{
                        marginLeft: 'auto',
                        width: 4,
                        height: 36,
                        background: '#E30613',
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* FAQ items */}
                  <div style={{ padding: '0 32px' }}>
                    {cat.faqs.map((faq, fi) => (
                      <FaqItem key={fi} q={faq.q} a={faq.a} index={fi} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Contact CTA ── */}
          <div
            style={{
              marginTop: 56,
              background: 'linear-gradient(135deg, #001F5B 0%, #002d80 100%)',
              borderRadius: 24,
              padding: 'clamp(32px,5vw,48px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(227,6,19,0.1)',
                pointerEvents: 'none',
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 10,
              }}
            >
              Still have questions?
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 10px',
              }}
            >
              We're here to help
            </h3>
            <p
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                color: 'rgba(255,255,255,0.65)',
                margin: '0 0 28px',
              }}
            >
              Reach the EMRAN Secretariat at No. 26 Acacia Drive, Osborne Foreshore Estate Phase 2, Ikoyi, Lagos.
            </p>
            <NavLink
              to="/support"
              style={{
                display: 'inline-block',
                background: '#E30613',
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 36px',
                borderRadius: 50,
                textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(227,6,19,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(227,6,19,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(227,6,19,0.35)';
              }}
            >
              Contact Us →
            </NavLink>
          </div>

          {/* ── Back link ── */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <NavLink
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#001F5B',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              ← Back to Home
            </NavLink>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
