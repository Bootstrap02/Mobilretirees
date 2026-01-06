// // pages/Benefits.jsx
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import { BigLoader } from '../Modals/Loaders';

// const Benefits = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     if (!userData) {
//       navigate('/signin');
//     }
//   }, [navigate]);

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-bold text-[#001F5B] text-center mb-4">
//             Your Retiree Benefits
//           </h1>
//           <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
//             Comprehensive post-retirement support designed to honor your service to ExxonMobil Nigeria
//           </p>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//             {[
//               {
//                 title: "Pension Payments",
//                 desc: "Monthly pension disbursed on the 25th of every month directly to your registered bank account.",
//                 amount: "₦485,000/month",
//                 status: "Active",
//                 icon: "💰",
//               },
//               {
//                 title: "Medical Coverage",
//                 desc: "Gold Retiree Medical Plan covering you and your immediate family at top-tier hospitals nationwide.",
//                 coverage: "Family Cover • Inpatient & Outpatient",
//                 status: "Active",
//                 icon: "🏥",
//               },
//               {
//                 title: "Death Benefit",
//                 desc: "Lump sum payment to nominated beneficiaries in the event of your passing.",
//                 amount: "₦500,000",
//                 status: "Eligible",
//                 icon: "🛡️",
//               },
//               {
//                 title: "Annual Wellness Allowance",
//                 desc: "Reimbursement for medical check-ups, glasses, dental care, and fitness programs.",
//                 amount: "Up to ₦150,000/year",
//                 status: "Available",
//                 icon: "❤️",
//               },
//               {
//                 title: "Housing Support",
//                 desc: "One-time settlement allowance paid at retirement (already received).",
//                 amount: "Received in 2018",
//                 status: "Completed",
//                 icon: "🏠",
//               },
//               {
//                 title: "EMRAN Membership",
//                 desc: "Lifetime membership in ExxonMobil Retirees Association of Nigeria with dues fully sponsored.",
//                 status: "Paid until Dec 2026",
//                 icon: "🎖️",
//               },
//             ].map((benefit, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
//               >
//                 <div className="text-6xl mb-6">{benefit.icon}</div>
//                 <h3 className="text-2xl font-bold text-[#001F5B] mb-3">{benefit.title}</h3>
//                 <p className="text-gray-700 mb-6">{benefit.desc}</p>
//                 {benefit.amount && (
//                   <p className="text-3xl font-bold text-[#E30613] mb-2">{benefit.amount}</p>
//                 )}
//                 {benefit.coverage && (
//                   <p className="text-lg font-medium text-gray-800 mb-2">{benefit.coverage}</p>
//                 )}
//                 <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
//                   benefit.status.includes('Active') || benefit.status.includes('Eligible')
//                     ? 'bg-green-100 text-green-800'
//                     : benefit.status.includes('Completed')
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   {benefit.status}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 text-center">
//             <h2 className="text-3xl font-bold mb-4">Need to Update Beneficiaries?</h2>
//             <p className="text-xl mb-8">Ensure your family is protected. Update your nomination form today.</p>
//             <button className="bg-[#E30613] hover:bg-[#c20511] px-8 py-4 rounded-xl font-bold text-lg transition">
//               Download Nomination Form
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Benefits;
// pages/Benefits.jsx — PUBLIC & INFORMATIVE (No Personal Info)
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import emranLogo from '../assets/exxonmobil-logo-white.jpg'; // ← Your rebuilt logo here
import constitutionCover from '../assets/constitution-cover.png'; // Page 1 of constitution
import cacCertificate from '../assets/cac-certificate.jpg'; // CAC cert
import pensionIcon from '../assets/pension-icon.png'; // Optional icons (search free ones)
import medicalIcon from '../assets/medical-icon.webp';
import deathIcon from '../assets/death-icon.jpg';
import communityIcon from '../assets/community-icon.webp';

const Benefits = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Section */}
          <div className="text-center mb-20">
            <img src={emranLogo} alt="FOGAEC - EMRAN Partner" className="h-32 mx-auto mb-8" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] mb-6">
              EMRAN Retiree Benefits
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Comprehensive support honoring your dedicated service to ExxonMobil Nigeria. 
              All information below is general — personalized details are available securely in your member dashboard.
            </p>
          </div>

          {/* Pension Benefits */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-2xl p-12">
              <div>
                <img src={pensionIcon} alt="Pension" className="w-full rounded-2xl shadow-xl" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#001F5B] mb-6">Pension Benefits</h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  ExxonMobil Nigeria retirees benefit from a robust defined benefit pension plan, providing reliable monthly income in retirement. Payments are typically made on the 25th of each month via direct bank transfer.
                </p>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Calculated based on years of service and final salary
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Includes potential inflation adjustments and investment growth sharing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    One-time terminal gratuity upon retirement
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    EMRAN advocates for timely payments and fair reviews
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Medical Benefits */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-2xl p-12">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold text-[#001F5B] mb-6">Medical Benefits</h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Comprehensive healthcare coverage ensures peace of mind for retirees and their families through partnerships with leading Nigerian HMOs.
                </p>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Inpatient and outpatient treatment
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Family coverage (spouse + dependents)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Access to top hospitals nationwide
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Preventive care and chronic disease management
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    EMRAN assists with claim disputes and coverage queries
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src={medicalIcon} alt="Medical Coverage" className="w-full rounded-2xl shadow-xl" />
              </div>
            </div>
          </section>

          {/* Death Benefits */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-2xl p-12">
              <div>
                <img src={deathIcon} alt="Death Benefits" className="w-full rounded-2xl shadow-xl" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#001F5B] mb-6">Death Benefits</h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  As stated in the EMRAN Constitution (Section 18), compassionate financial support is provided to families upon a member's passing.
                </p>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Lump-sum payment to nominated beneficiaries
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Often supplemented by ExxonMobil group life insurance
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Continued pension portion for surviving spouse
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    EMRAN coordinates memorial support
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Community & Welfare */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-2xl p-12">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold text-[#001F5B] mb-6">Community & Welfare Support</h2>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  EMRAN's core mission is to foster unity, social interaction, and ongoing welfare beyond financial benefits.
                </p>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Regular meetings, reunions, and virtual events
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Emergency welfare fund for members in need
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Advocacy on behalf of retirees with ExxonMobil
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E30613] font-bold">•</span>
                    Online platform for connection and resources
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img src={communityIcon} alt="Community Support" className="w-full rounded-2xl shadow-xl" />
              </div>
            </div>
          </section>

          {/* Official Documents */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Official Foundation</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <img src={constitutionCover} alt="EMRAN Constitution" className="w-full rounded-2xl mb-6" />
                <h3 className="text-2xl font-bold text-[#001F5B] mb-4">EMRAN Constitution</h3>
                <p className="text-gray-700">Our guiding document ensuring welfare, unity, and transparency</p>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <img src={cacCertificate} alt="CAC Certificate" className="w-full rounded-2xl mb-6" />
                <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Official Registration</h3>
                <p className="text-gray-700">Incorporated under CAMA 2020 • Registration No. 153528</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-16 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Access Your Benefits?</h2>
            <p className="text-2xl mb-12 opacity-90">
              Log in to your secure dashboard for personalized pension, medical, and welfare information.
            </p>
            <button 
              onClick={() => window.location.href = '/signin'}
              className="bg-[#E30613] hover:bg-[#c20511] px-16 py-8 rounded-full text-2xl font-bold shadow-2xl transition transform hover:scale-110"
            >
              Sign In to Member Portal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Benefits;