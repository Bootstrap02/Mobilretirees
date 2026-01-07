import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiDownload, FiFileText, FiExternalLink } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

// YOUR REAL PDFs
import faqsDocs from '../assets/faqs-doc.pdf';
import nicPension from '../assets/nic-pension.pdf';
import pensionFundRules from '../assets/pension-funds-rules.pdf';
import circularOnRor from '../assets/circular-on-ror.pdf';
import constitution from '../assets/emran-rules.pdf';
import pension from "../assets/pension.jpg";
import pencom from "../assets/pencom.jpg";
import faqs from "../assets/faqs.jpg";
import pensionrules from "../assets/pension-rules.jpg";

// Images for cards
import constitutionCover from '../assets/constitution-cover.png';
import cacCert from '../assets/cac-certificate.jpg';

const Resources = () => {
  const resources = [
    {
      title: "EMRAN Constitution & Rules",
      desc: "The official governing document of ExxonMobil Retirees Association of Nigeria (EMRAN). Outlines membership, governance, benefits, and welfare provisions.",
      pdf: constitution,
      image: constitutionCover,
      size: "2.4 MB"
    },
    {
      title: "FAQs for Retirees",
      desc: "Frequently asked questions covering pension, medical benefits, membership, and common retiree concerns.",
      pdf: faqsDocs,
      image: faqs,
      size: "1.1 MB"
    },
    {
      title: "NIC Pension Guidelines",
      desc: "National Insurance Commission guidelines relevant to insurance and retirement planning in Nigeria.",
      pdf: nicPension,
      image: pension,
      size: "3.8 MB"
    },
    {
      title: "Pension Fund Rules & Regulations",
      desc: "Comprehensive rules governing pension fund administration in Nigeria under PENCOM.",
      pdf: pensionFundRules,
      image: pensionrules,
      size: "5.2 MB"
    },
    {
      title: "PENCOM Circular on Rate of Return",
      desc: "Official circular on Time-Weighted Rate of Return (TWRR) methodology for closed pension schemes.",
      pdf: circularOnRor,
      image: pencom,
      size: "980 KB"
    },
    {
      title: "CAC Certificate of Incorporation",
      desc: "Official registration document confirming EMRAN's legal status under CAMA 2020 (Reg. No. 153528).",
      image: cacCert,
      link: "https://your-site.com/cac-certificate.jpg", // Or make PDF if needed
      size: "Image"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] mb-8">
              Resource Center
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Essential documents, guidelines, and official resources for EMRAN members and ExxonMobil Nigeria retirees.
            </p>
          </div>

          {/* Resource Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {resources.map((resource, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
                <div className="h-80 overflow-hidden">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <FiFileText className="text-4xl text-[#E30613]" />
                    <div>
                      <h3 className="text-3xl font-bold text-[#001F5B]">{resource.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{resource.size}</p>
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    {resource.desc}
                  </p>
                  {resource.pdf ? (
                    <a 
                      href={resource.pdf}
                      download
                      className="inline-flex items-center gap-4 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition transform hover:scale-110"
                    >
                      <FiDownload className="text-3xl" />
                      Download PDF
                    </a>
                  ) : (
                    <a 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition transform hover:scale-110"
                    >
                      <FiExternalLink className="text-3xl" />
                      View Document
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* External Links Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">
              Useful External Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "National Pension Commission (PENCOM)", url: "https://www.pencom.gov.ng", desc: "Official regulator of pensions in Nigeria" },
                { name: "ExxonMobil Family Portal", url: "https://www.exxonmobilfamily.com", desc: "Global retiree benefits and resources" },
                { name: "PENGASSAN", url: "https://pengassan.org", desc: "Petroleum and Natural Gas Senior Staff Association" },
                { name: "Nigeria Union of Pensioners", url: "https://nup.org.ng", desc: "National body representing all pensioners" },
              ].map((link, i) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition text-center group"
                >
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4 group-hover:text-[#E30613] transition">
                    {link.name}
                  </h3>
                  <p className="text-gray-700 mb-6">{link.desc}</p>
                  <span className="text-[#E30613] font-bold flex items-center justify-center gap-2">
                    Visit Site <FiExternalLink />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-8">
              Need help accessing these resources?
            </p>
            <NavLink 
              to="/support"
              className="inline-block bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110"
            >
              Contact Support Team
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;