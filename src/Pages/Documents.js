// pages/Documents.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import constitutionPDF from '../assets/emran-constitution.pdf';
import rulesPDF from '../assets/emran-rules.pdf';
import associationPDF from '../assets/emran-association.pdf';
import agm from '../assets/agm2026.pdf';
import executives from '../assets/executives.pdf';
import whatsapp_penalties from '../assets/whatsapp_penalties.pdf';
import whatsapp_rules from '../assets/whatsapp_rules.pdf';
import retireesBenefit from '../assets/retiree_benefits_2026.pdf';
import annuitantsBenefits from '../assets/Annuitants-Benefits-2026.pdf';
import emranNHFRefundForm from '../assets/EMRAN-NHF-Refund-Form.pdf';
import nsitfRefundApplicationForm from '../assets/NSITF-Refund-Application-Form.pdf';
import retireesProviders from '../assets/retirees_providers_2026.xlsx';
import cacCertificate from '../assets/cac-certificate.jpg';
import { FiFileText, FiArrowLeft } from 'react-icons/fi';

// Add new documents here as they become available — just push a new
// { title, desc, href, color } object into this array (e.g. the NHF
// Refund Form and NSITF Refund Application Form once those files are
// uploaded to /assets).
const documentsList = [
  { title: 'CAC Certification', desc: "View the official Corporate Affairs Commission certification confirming EMRAN's legal registration status.", href: cacCertificate, color: '#E30613' },
  { title: 'CAC-ABRIDGED CONSTITUTION', desc: 'View the official EMRAN Constitution document outlining governance, membership structure, and operational guidelines.', href: constitutionPDF, color: '#001F5B' },
  { title: 'Articles of Association', desc: 'View the official Articles of Association of ExxonMobil Retirees Association of Nigeria (EMRAN).', href: associationPDF, color: '#001F5B' },
  { title: 'Rules and Regulations', desc: 'View the official Rules and Regulations of ExxonMobil Retirees Association of Nigeria (EMRAN).', href: rulesPDF, color: '#001F5B' },
  { title: 'AGM Attendees in 2026', desc: 'View the official EMRAN AGM Attendees in 2026.', href: agm, color: '#001F5B' },
  { title: 'EMRAN Newly Elected Executives 2026', desc: 'View the official EMRAN Newly Elected Executives in 2026.', href: executives, color: '#001F5B' },
  { title: 'EMRAN WhatsApp Rules and Regulations', desc: 'Rules and Regulations for Posting and Commenting on EMRAN WhatsApp.', href: whatsapp_rules, color: '#001F5B' },
  { title: 'EMRAN WhatsApp Penalties', desc: 'Penalties for offences on EMRAN WhatsApp Group.', href: whatsapp_penalties, color: '#001F5B' },
  { title: 'AXA MANSARD Medical Benefits 2026', desc: 'Retiree Benefits for EMRAN members 2026.', href: retireesBenefit, color: '#001F5B' },
  { title: 'AXA MANSARD Medical Providers 2026', desc: 'Medical Providers for EMRAN members 2026.', href: retireesProviders, color: '#001F5B' },
  { title: 'AXA MANSARD Annuitants Benefits 2026', desc: 'Annuitants Benefits for EMRAN members 2026.', href: annuitantsBenefits, color: '#001F5B' },
  { title: 'EMRAN NHF Refund Form', desc: 'EMRAN NHF Refund Form for EMRAN members.', href: emranNHFRefundForm, color: '#001F5B' },
  { title: 'NSITF Refund Application Form', desc: 'NSITF Refund Application Form for EMRAN members.', href: nsitfRefundApplicationForm, color: '#001F5B' },
];

const Documents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }

    setUser({
      fullname: stored.fullname || 'EMRAN Member',
      staffId:  stored._id      || 'N/A',
    });
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-[#001F5B]">Loading documents...</div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="mb-10">
            <NavLink to={`/dashboard/${user.staffId}`}
              className="inline-flex items-center gap-2 text-[#001F5B] font-semibold hover:text-[#E30613] transition mb-6">
              <FiArrowLeft /> Back to Dashboard
            </NavLink>
            <div className="flex items-center gap-4 mb-3">
              <FiFileText className="text-4xl text-[#E30613]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-[#001F5B]">Documents &amp; Resources</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Official EMRAN governance documents, meeting records, and member benefit resources — all in one place.
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {documentsList.map((doc, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition flex flex-col justify-between"
                style={{ borderTop: `8px solid ${doc.color}` }}>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <FiFileText className="text-4xl" style={{ color: doc.color }} />
                    <h3 className="text-2xl font-bold text-[#001F5B]">{doc.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{doc.desc}</p>
                </div>
                <a href={doc.href} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-3 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
                  style={{ background: `linear-gradient(to right, ${doc.color}, ${doc.color}cc)` }}>
                  View Document
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Documents;
