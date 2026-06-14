// pages/AboutUs.jsx — MOBILE FIXED
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import emranLogo        from '../assets/exxonmobil-logo-white.jpg';
import president        from '../assets/president.jpg';
import constitutionCover from '../assets/constitution-cover.png';
import constitutionTOC  from '../assets/constitution-toc.jpg';
import cacCertificate   from '../assets/cac-certificate.jpg';
import tinCertificate   from '../assets/tin-certificate.jpg';
import trusteesGroup    from '../assets/community-icon.webp';
import historicalPhoto1 from '../assets/death-icon2.jpeg';
import historicalPhoto2 from '../assets/medical-icon.webp';
import addressMap       from '../assets/address-map.jpg';
import constitution     from '../assets/emran-rules.pdf';

const AboutUs = () => {
  return (
    <>
      <style>{`
        /* Prevent horizontal overflow globally on this page */
        .about-page { overflow-x: hidden; }
        .about-page img { max-width: 100%; height: auto; }

        /* President card responsive */
        @media (max-width: 768px) {
          .president-grid { grid-template-columns: 1fr !important; text-align: center; }
          .president-grid .president-text { order: 2; }
          .president-grid .president-img  { order: 1; }
          .president-img img { width: 180px !important; height: 180px !important; }
          .president-quote { font-size: 16px !important; }
          .president-name  { font-size: 22px !important; }
          .president-title { font-size: 28px !important; }
        }

        /* History grid */
        @media (max-width: 768px) {
          .history-grid { grid-template-columns: 1fr !important; }
          .history-photos { grid-template-columns: 1fr 1fr; margin-top: 24px; }
        }

        /* Certificate grid */
        @media (max-width: 768px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }

        /* Constitution grid */
        @media (max-width: 768px) {
          .constitution-grid { grid-template-columns: 1fr !important; }
        }

        /* Membership grid */
        @media (max-width: 768px) {
          .membership-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }

        /* Address grid */
        @media (max-width: 768px) {
          .address-grid { grid-template-columns: 1fr !important; }
        }

        /* Section padding on mobile */
        @media (max-width: 640px) {
          .section-pad { padding: 32px 16px !important; }
          .hero-section { padding: 24px 16px 48px !important; }
        }
      `}</style>

      <Header />
      <div className="about-page min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── Hero ── */}
          <div className="hero-section text-center mb-16 px-4">
            <img src={emranLogo} alt="EMRAN Logo"
              className="mx-auto mb-8 drop-shadow-2xl"
              style={{ height: 'clamp(80px, 15vw, 180px)', width: 'auto', objectFit: 'contain' }} />
            <h1 className="font-extrabold text-[#001F5B] mb-6"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}>
              About EMRAN
            </h1>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(15px, 2.5vw, 22px)' }}>
              ExxonMobil Retirees Association of Nigeria — A legacy of unity, welfare, and community impact since 2020.
            </p>
          </div>

          {/* ── President Card ── */}
          <section className="mb-16 section-pad px-2 sm:px-0">
            <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] rounded-3xl shadow-2xl overflow-hidden">
              <div className="president-grid p-6 sm:p-10 lg:p-16"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,4vw,48px)', alignItems: 'center' }}>
                <div className="president-text text-white">
                  <h2 className="president-title font-extrabold mb-4"
                    style={{ fontSize: 'clamp(22px, 4vw, 44px)' }}>
                    Message from the President
                  </h2>
                  <h3 className="president-name font-bold mb-6 text-yellow-400"
                    style={{ fontSize: 'clamp(18px, 3vw, 30px)' }}>
                    Adebiyi Aderinto
                  </h3>
                  <p className="president-quote leading-relaxed mb-6"
                    style={{ fontSize: 'clamp(14px, 2vw, 20px)', opacity: 0.92 }}>
                    "Fellow retirees, EMRAN is our shared home — built on the foundation of service, excellence, and family.
                    Together, we ensure no member is left behind in retirement.
                    Through advocacy, welfare support, and community spirit, we honor our ExxonMobil legacy while building a brighter future."
                  </p>
                  <p style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', opacity: 0.8, fontStyle: 'italic' }}>
                    — Adebiyi Aderinto, President, EMRAN
                  </p>
                </div>
                <div className="president-img flex justify-center">
                  <img src={president} alt="Adebiyi Aderinto - EMRAN President"
                    style={{ width: 'clamp(140px,22vw,340px)', height: 'clamp(140px,22vw,340px)', objectFit: 'cover', borderRadius: '50%', border: '6px solid #fff', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=President'} />
                </div>
              </div>
            </div>
          </section>

          {/* ── History ── */}
          <section className="mb-16 section-pad px-2 sm:px-0">
            <h2 className="font-bold text-[#001F5B] text-center mb-10"
              style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}>Our History</h2>
            <div className="history-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,3vw,48px)', alignItems: 'center' }}>
              <div>
                {[
                  "EMRAN was founded in 2020 by dedicated former employees of ExxonMobil Upstream Affiliates in Nigeria. Recognizing the need for continued support, camaraderie, and advocacy after retirement, a group of retirees came together to establish a formal association.",
                  "Originally registered as \"Mobil Producing Nigeria (ExxonMobil) Retirees Association\", the name was officially changed to EMRAN on September 20, 2024, reflecting the company's evolution while preserving our shared heritage.",
                  "Today, EMRAN proudly serves hundreds of retirees across Nigeria, providing welfare support, social connection, and collective representation with ExxonMobil management."
                ].map((text, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-5"
                    style={{ fontSize: 'clamp(14px,2vw,19px)' }}>{text}</p>
                ))}
              </div>
              <div className="history-photos" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <img src={historicalPhoto1} alt="Early EMRAN" className="rounded-2xl shadow-xl w-full" />
                <img src={historicalPhoto2} alt="Retirees" className="rounded-2xl shadow-xl w-full mt-8" />
              </div>
            </div>
          </section>

          {/* ── Constitution ── */}
          <section className="mb-16 bg-white rounded-3xl shadow-2xl section-pad px-6 sm:px-12 lg:px-16">
            <h2 className="font-bold text-[#001F5B] text-center mb-12"
              style={{ fontSize: 'clamp(22px,4vw,44px)' }}>Our Constitution</h2>
            <div className="constitution-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,3vw,64px)', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <img src={constitutionCover} alt="Constitution Cover" className="rounded-3xl shadow-2xl w-full" />
                <img src={constitutionTOC}   alt="Table of Contents"  className="rounded-3xl shadow-2xl w-full" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p className="text-gray-700 italic leading-relaxed"
                  style={{ fontSize: 'clamp(14px,2vw,20px)' }}>
                  "We, the members of ExxonMobil Retirees Association of Nigeria... do hereby make, enact and give to ourselves this Constitution."
                </p>
                <p className="text-gray-700" style={{ fontSize: 'clamp(13px,1.8vw,18px)' }}>
                  Our Constitution is the foundation of EMRAN — ensuring transparent governance, member welfare, and democratic leadership.
                </p>
                <a href={constitution} download="EMRAN-Constitution.pdf"
                  className="inline-flex items-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold rounded-full shadow-2xl transition transform hover:scale-105 self-start"
                  style={{ padding: 'clamp(12px,2vw,20px) clamp(20px,4vw,48px)', fontSize: 'clamp(14px,2vw,20px)' }}>
                  <svg style={{ width:'clamp(18px,3vw,32px)', height:'clamp(18px,3vw,32px)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </section>

          {/* ── Certificates ── */}
          <section className="mb-16 section-pad px-2 sm:px-0">
            <h2 className="font-bold text-[#001F5B] text-center mb-10"
              style={{ fontSize: 'clamp(22px,4vw,40px)' }}>Official Status &amp; Certifications</h2>
            <div className="cert-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(16px,3vw,48px)' }}>
              {[
                { title:'Corporate Affairs Commission', img:cacCertificate, alt:'CAC Certificate', desc:<>Registration No. 153528<br/>Incorporated: November 9, 2020<br/>Certified: February 6, 2025</> },
                { title:'Tax Identification Number', img:tinCertificate, alt:'TIN Certificate', desc:'Fully compliant with Federal Inland Revenue Service (FIRS) requirements for non-profit associations.' },
              ].map((c,i) => (
                <div key={i} className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
                  <h3 className="font-bold text-[#001F5B] mb-5" style={{ fontSize:'clamp(16px,2.5vw,22px)' }}>{c.title}</h3>
                  <img src={c.img} alt={c.alt} className="rounded-2xl shadow-xl mb-5 mx-auto w-full max-w-xs" />
                  <p className="text-gray-700" style={{ fontSize:'clamp(13px,1.8vw,17px)' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Membership ── */}
          <section className="mb-16 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl section-pad px-6 sm:px-12 lg:px-16">
            <h2 className="font-bold text-center mb-10" style={{ fontSize:'clamp(22px,4vw,40px)' }}>Join EMRAN Today</h2>
            <div className="membership-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(12px,3vw,48px)', textAlign:'center' }}>
              {[
                { val:'₦20,000', label:'One-Time Registration Fee' },
                { val:'₦40,000', label:'Annual Membership Dues' },
                { val:'Lifetime Benefits', label:'Welfare, Advocacy, Community' },
              ].map((m,i) => (
                <div key={i}>
                  <p className="font-bold mb-2" style={{ fontSize:'clamp(22px,4vw,44px)' }}>{m.val}</p>
                  <p style={{ fontSize:'clamp(13px,2vw,20px)', opacity:0.85 }}>{m.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="https://forms.gle/yPtQegLynybAECMC9" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold rounded-full shadow-2xl transition transform hover:scale-105"
                style={{ padding:'clamp(12px,2vw,20px) clamp(24px,5vw,56px)', fontSize:'clamp(14px,2vw,20px)' }}>
                Complete Membership Form
              </a>
            </div>
          </section>

          {/* ── Leadership ── */}
          <section className="mb-16 section-pad px-2 sm:px-0">
            <h2 className="font-bold text-[#001F5B] text-center mb-10" style={{ fontSize:'clamp(22px,4vw,40px)' }}>Our Leadership</h2>
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 text-center">
              <img src={trusteesGroup} alt="EMRAN Trustees" className="max-w-3xl mx-auto rounded-2xl shadow-xl mb-6 w-full" />
              <p className="text-gray-700 max-w-3xl mx-auto" style={{ fontSize:'clamp(14px,2vw,19px)' }}>
                Guided by experienced trustees and an elected executive committee, EMRAN leadership ensures transparent governance and member-focused decisions.
              </p>
            </div>
          </section>

          {/* ── Address ── */}
          <section className="mb-16 section-pad px-2 sm:px-0">
            <h2 className="font-bold text-[#001F5B] text-center mb-10" style={{ fontSize:'clamp(22px,4vw,40px)' }}>Visit Us</h2>
            <div className="address-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(16px,3vw,48px)' }}>
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                <h3 className="font-bold text-[#001F5B] mb-4" style={{ fontSize:'clamp(16px,2.5vw,22px)' }}>Headquarters</h3>
                <p className="text-gray-700" style={{ fontSize:'clamp(14px,2vw,19px)', lineHeight:1.8 }}>
                  No. 26 Acacia Drive<br/>Osborne Foreshore Estate Phase 2<br/>Ikoyi, Lagos, Nigeria
                </p>
              </div>
              <img src={addressMap} alt="EMRAN Location Map" className="rounded-3xl shadow-2xl w-full" />
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="text-center pb-4">
            <NavLink to="/"
              className="inline-flex items-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold rounded-full shadow-2xl transition transform hover:scale-105"
              style={{ padding:'clamp(12px,2vw,18px) clamp(24px,5vw,48px)', fontSize:'clamp(14px,2vw,19px)' }}>
              ← Back to Home
            </NavLink>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
