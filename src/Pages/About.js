import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Placeholders — Replace with your real images
import emranLogo from '../assets/exxonmobil-logo-white.jpg'; // Your rebuilt logo
import constitutionCover from '../assets/constitution-cover.png'; // Page 1 of constitution
import constitutionTOC from '../assets/constitution-toc.jpg'; // Table of contents page
import cacCertificate from '../assets/cac-certificate.jpg'; // CAC cert
import tinCertificate from '../assets/tin-certificate.jpg'; // Tax ID cert (add yours)
import trusteesGroup from '../assets/community-icon.webp'; // Group photo of trustees
import historicalPhoto1 from '../assets/death-icon2.jpeg'; // Old ExxonMobil retiree event
import historicalPhoto2 from '../assets/medical-icon.webp'; // Another historical image
import addressMap from '../assets/address-map.jpg'; // Screenshot of location
import constitution from '../assets/emran-constitution.pdf'

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero with Logo */}
          <div className="text-center mb-20">
            <img src={emranLogo} alt="FOGAEC - EMRAN Partner" className="h-60 mx-auto mb-8 drop-shadow-2xl" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] mb-6">
              About EMRAN
            </h1>
            <p className="text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              ExxonMobil Retirees Association of Nigeria — A legacy of unity, welfare, and community impact since 2020.
            </p>
          </div>

          {/* History Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Our History</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  EMRAN was founded in 2020 by dedicated former employees of ExxonMobil Upstream Affiliates in Nigeria. 
                  Recognizing the need for continued support, camaraderie, and advocacy after retirement, a group of retirees came together to establish a formal association.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Originally registered as "Mobil Producing Nigeria (ExxonMobil) Retirees Association", the name was officially changed to EMRAN on September 20, 2024, reflecting the company's evolution while preserving our shared heritage.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Today, EMRAN proudly serves hundreds of retirees across Nigeria, providing welfare support, social connection, and collective representation with ExxonMobil management.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <img src={historicalPhoto1} alt="Early EMRAN gathering" className="rounded-2xl shadow-xl" />
                <img src={historicalPhoto2} alt="Retirees at ExxonMobil event" className="rounded-2xl shadow-xl mt-12" />
              </div>
            </div>
          </section>

          {/* Constitution */}
<section className="mb-24 bg-white rounded-3xl shadow-2xl p-16">
  <h2 className="text-5xl font-bold text-[#001F5B] text-center mb-16">Our Constitution</h2>
  <div className="grid md:grid-cols-2 gap-20 items-center">
    <div className="space-y-12">
      <img 
        src={constitutionCover} 
        alt="Constitution Cover" 
        className="rounded-3xl shadow-2xl w-full"
      />
      <img 
        src={constitutionTOC} 
        alt="Table of Contents" 
        className="rounded-3xl shadow-2xl w-full"
      />
    </div>
    <div className="flex flex-col justify-center space-y-10">
      <p className="text-2xl text-gray-700 italic leading-relaxed">
        "We, the members of ExxonMobil Retirees Association of Nigeria... do hereby make, enact and give to ourselves this Constitution."
      </p>
      <p className="text-xl text-gray-700 mb-10">
        Our Constitution is the foundation of EMRAN — ensuring transparent governance, member welfare, and democratic leadership.
      </p>
      
      {/* DOWNLOAD BUTTON - FIXED */}
      <a 
        href={constitution}
        download="EMRAN-Constitution.pdf"
        className="inline-flex items-center gap-4 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 self-start"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Full Constitution (PDF)
      </a>
    </div>
  </div>
</section>

          {/* Official Registration & Certificates */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Official Status & Certifications</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-[#001F5B] mb-6">Corporate Affairs Commission</h3>
                <img src={cacCertificate} alt="CAC Certificate" className="rounded-2xl shadow-xl mb-6 mx-auto" />
                <p className="text-lg text-gray-700">
                  Registration No. 153528<br />
                  Incorporated: November 9, 2020<br />
                  Certified: February 6, 2025
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-[#001F5B] mb-6">Tax Identification Number</h3>
                <img src={tinCertificate} alt="TIN Certificate" className="rounded-2xl shadow-xl mb-6 mx-auto" />
                <p className="text-lg text-gray-700">
                  Fully compliant with Federal Inland Revenue Service (FIRS) requirements for non-profit associations.
                </p>
              </div>
            </div>
          </section>

          {/* Membership & Registration */}
          <section className="mb-24 bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-16">
            <h2 className="text-4xl font-bold text-center mb-12">Join EMRAN Today</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <p className="text-5xl font-bold mb-4">₦20,000</p>
                <p className="text-2xl">One-Time Registration Fee</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-4">₦40,000</p>
                <p className="text-2xl">Annual Membership Dues</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-4">Lifetime Benefits</p>
                <p className="text-xl">Welfare, Advocacy, Community</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <a 
                href="https://forms.gle/yPtQegLynybAECMC9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110"
              >
                Complete Membership Form
              </a>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Our Leadership</h2>
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <img src={trusteesGroup} alt="EMRAN Trustees & Executive" className="max-w-4xl mx-auto rounded-2xl shadow-xl mb-8" />
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Guided by experienced trustees and an elected executive committee, EMRAN leadership ensures transparent governance and member-focused decisions.
              </p>
            </div>
          </section>

          {/* Address */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Visit Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Headquarters</h3>
                <p className="text-xl text-gray-700">
                  No. 26 Acacia Drive<br />
                  Osborne Foreshore Estate Phase 2<br />
                  Ikoyi, Lagos, Nigeria
                </p>
              </div>
              <div>
                <img src={addressMap} alt="EMRAN Location Map" className="rounded-3xl shadow-2xl w-full" />
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <NavLink 
              to="/"
              className="inline-flex items-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110"
            >
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