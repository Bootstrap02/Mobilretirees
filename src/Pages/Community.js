// // pages/Community.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import schoolDonation from '../assets/exxonmobil-logo-white.jpg'; // Add photos
// import medicalOutreach from '../assets/exxonmobil-logo-white.jpg';
// import teachingClass from '../assets/exxonmobil-logo-white.jpg';
// import president from '../assets/president.jpg';

// const Community = () => {
//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-6">

//           {/* Hero */}
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold text-[#001F5B] mb-6">
//               Giving Back to Our Community
//             </h1>
//             <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
//               EMRAN retirees continue to make positive impact across Nigeria through education, health, and community support.
//             </p>
//           </div>

//           {/* Intro */}
//           <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 text-center">
//             <p className="text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
//               As proud former ExxonMobil employees, we believe in using our experience, resources, and time to uplift communities. 
//               From donating to schools to providing free mentoring and medical outreach, EMRAN members are committed to giving back.
//             </p>
//           </div>

//           {/* Gallery Grid */}
//           <div className="grid md:grid-cols-3 gap-10 mb-16">
//             {/* School Donation */}
//             <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
//               <img 
//                 src={schoolDonation} 
//                 alt="EMRAN donates books and supplies to local school"
//                 className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Education Support</h3>
//                 <p className="text-gray-700 mb-6">
//                   EMRAN members donated learning materials, uniforms, and scholarships to underprivileged students in Lagos and Rivers State.
//                 </p>
//                 <span className="text-[#E30613] font-bold">2025 Initiative →</span>
//               </div>
//             </div>

//             {/* Medical Outreach */}
//             <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
//               <img 
//                 src={medicalOutreach} 
//                 alt="Free medical checkup by EMRAN retirees"
//                 className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Health Outreach</h3>
//                 <p className="text-gray-700 mb-6">
//                   Partnered with local clinics to provide free blood pressure checks, diabetes screening, and health education in rural communities.
//                 </p>
//                 <span className="text-[#E30613] font-bold">Annual Program →</span>
//               </div>
//             </div>

//             {/* Retirees Teaching */}
//             <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
//               <img 
//                 src={teachingClass} 
//                 alt="Retiree mentoring students"
//                 className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Knowledge Transfer</h3>
//                 <p className="text-gray-700 mb-6">
//                   Experienced EMRAN members volunteer to teach STEM subjects and career guidance in secondary schools.
//                 </p>
//                 <span className="text-[#E30613] font-bold">Ongoing Mentorship →</span>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center">
//             <h2 className="text-4xl font-bold mb-6">Join Our Impact</h2>
//             <p className="text-xl mb-8 opacity-90">
//               Have a community project or story to share? Let us celebrate it together.
//             </p>
//             <NavLink 
//               to="/contact"
//               className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
//             >
//               Submit Your Story
//             </NavLink>
//           </div>

//           {/* Back Button */}
//           <div className="text-center mt-12">
//             <NavLink 
//               to="/"
//               className="inline-flex items-center gap-3 text-[#E30613] font-bold text-xl hover:underline"
//             >
//               ← Back to Home
//             </NavLink>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Community;
// pages/Community.jsx — FINAL WITH OFFICIALS & MEMBERS
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Your real images
import schoolDonation from '../assets/address-map.jpg'; // Replace with real
import medicalOutreach from '../assets/money-laundering-certificate.jpg';
import teachingClass from '../assets/pension.jpg';
import presidentPhoto from '../assets/president.jpg';

// Dummy member photos (replace with real member photos later)

import member6 from '../assets/medical-icon.webp'; // Big featured
import member4 from '../assets/death-icon.jpg';
import member5 from '../assets/death-icon2.jpeg';
import member1 from '../assets/exxonmobil-logo-white.jpg';
import member2 from '../assets/money-laundering-certificate.jpg';
import member3 from '../assets/Group 232.png';
const Community = () => {
  // OFFICIALS ARRAY
  const officials = [
    {
      name: "Adebiyi Aderinto",
      role: "President",
      photo: presidentPhoto,
      desc: "Leading EMRAN with vision and dedication"
    },
    {
      name: "Gloria Essien",
      role: "Secretary",
      photo: member2, // Replace
      desc: "Managing records and communications"
    },
    {
      name: "Victor Oyovo",
      role: "Treasurer",
      photo: member3,
      desc: "Overseeing financial transparency"
    },
    {
      name: "Chibuzo Ekpo",
      role: "Welfare Officer",
      photo: member4,
      desc: "Coordinating member support programs"
    },
    {
      name: "Raheem Musah",
      role: "Public Relations Officer",
      photo: member5,
      desc: "Bridging EMRAN with community and media"
    }
  ];

  // MEMBERS ARRAY (Alphabetical)
  const members = [
    { name: "Adebayo Johnson", photo: member1 },
    { name: "Chinwe Okeke", photo: member2 },
    { name: "Emeka Nwosu", photo: member3 },
    { name: "Fatima Yusuf", photo: member4 },
    { name: "Grace Adeyemi", photo: member5 },
    { name: "Ibrahim Musa", photo: member6 },
    { name: "Juliet Okafor", photo: member1 },
    { name: "Kingsley Eze", photo: member2 },
    { name: "Linda Obi", photo: member3 },
    { name: "Mohammed Ali", photo: member4 }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#001F5B] mb-6">
              EMRAN Community
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Giving back through education, health, and mentorship — while celebrating our leadership and members.
            </p>
          </div>

          {/* Community Impact Gallery */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">
              Our Community Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <img 
                  src={schoolDonation} 
                  alt="School donation"
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Education Support</h3>
                  <p className="text-gray-700">Donations of books, uniforms, and scholarships across Nigeria.</p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <img 
                  src={medicalOutreach} 
                  alt="Medical outreach"
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Health Outreach</h3>
                  <p className="text-gray-700">Free screenings and health education in rural communities.</p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <img 
                  src={teachingClass} 
                  alt="Teaching class"
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">Knowledge Transfer</h3>
                  <p className="text-gray-700">Retirees mentoring students in STEM and career guidance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* OFFICIALS SECTION */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-16">
              Our Leadership
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10">
              {officials.map((official, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition transform hover:-translate-y-4">
                  <img 
                    src={official.photo} 
                    alt={official.name}
                    className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#E30613] mb-6 shadow-xl"
                  />
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-2">{official.name}</h3>
                  <p className="text-xl text-[#E30613] font-semibold mb-4">{official.role}</p>
                  <p className="text-gray-700 italic">{official.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MEMBERS SECTION */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-16">
              Our Members
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
              {members.map((member, i) => (
                <div key={i} className="text-center group">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-gray-200 shadow-lg group-hover:border-[#E30613] group-hover:scale-110 transition"
                  />
                  <p className="mt-4 text-sm font-medium text-[#001F5B] group-hover:text-[#E30613] transition">
                    {member.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Back Button */}
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

export default Community;