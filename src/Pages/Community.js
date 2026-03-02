import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Images
import schoolDonation from '../assets/address-map.jpg';
import medicalOutreach from '../assets/money-laundering-certificate.jpg';
import teachingClass from '../assets/pension.jpg';

const Community = () => {

  const allUsers = JSON.parse(localStorage.getItem('allusers')) || [];
  const allOfficials = JSON.parse(localStorage.getItem('allofficials')) || [];

  // =============================
  // OFFICIALS HIERARCHY ORDER
  // =============================
  const hierarchy = [
    "President",
    "Vice President",
    "General Secretary",
    "Assistant Secretary",
    "Treasurer",
    "Financial Secretary",
    "Public Relations Officer",
    "Welfare Officer",
    "Ex-Officio"
  ];

  // =============================
  // SORTED OFFICIALS (BY RANK)
  // =============================
  const officials = allOfficials
    .map(official => ({
      fullname: official.fullname,
      position: official.position,
      photo:
        official.image?.[0] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          official.fullname
        )}&background=001F5B&color=fff&size=256`,
      desc: official.bio || "Serving with dedication"
    }))
    .sort((a, b) => {
      const rankA = hierarchy.indexOf(a.position);
      const rankB = hierarchy.indexOf(b.position);

      return (rankA === -1 ? 999 : rankA) - (rankB === -1 ? 999 : rankB);
    });

  // =============================
  // SORTED MEMBERS (ALPHABETICAL)
  // =============================
  const members = allUsers
      .map(user => ({
      fullname: user.fullname,
      photo:
        user.image?.[0] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.fullname
        )}&background=001F5B&color=fff&size=128`
    }))
    .sort((a, b) =>
      a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase())
    );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* HERO */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#001F5B] mb-6">
              EMRAN Community
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Giving back through education, health, and mentorship — while celebrating our leadership and members.
            </p>
          </div>

          {/* COMMUNITY IMPACT */}
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
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">
                    Education Support
                  </h3>
                  <p className="text-gray-700">
                    Donations of books, uniforms, and scholarships across Nigeria.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <img
                  src={medicalOutreach}
                  alt="Medical outreach"
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">
                    Health Outreach
                  </h3>
                  <p className="text-gray-700">
                    Free screenings and health education in rural communities.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <img
                  src={teachingClass}
                  alt="Teaching class"
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-4">
                    Knowledge Transfer
                  </h3>
                  <p className="text-gray-700">
                    Retirees mentoring students in STEM and career guidance.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* OFFICIALS */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-16">
              Our Leadership
            </h2>

            {officials.length === 0 ? (
              <p className="text-center text-gray-600 text-xl">
                No officials listed yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10 ">
                {officials.map((official, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition transform hover:-translate-y-3"
                  >
                    <img
                      src={official.photo}
                      alt={official.fullname}
                      className="w-40 h-40 max-lg:w-40 mx-auto rounded-full object-cover border-4 border-[#E30613] mb-6 shadow-xl"
                      onError={(e) =>
                        (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          official.fullname
                        )}&background=001F5B&color=fff&size=256`)
                      }
                    />
                    <h3 className="text-2xl font-bold text-[#001F5B] mb-2">
                      {official.fullname}
                    </h3>
                    <p className="text-xl text-[#E30613] font-semibold mb-4">
                      {official.position}
                    </p>
                    <p className="text-gray-700 italic">
                      {official.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* MEMBERS */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-16">
              Our Members
            </h2>

            {members.length === 0 ? (
              <p className="text-center text-gray-600 text-xl">
                No members with assigned positions yet.
              </p>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-8 ">
                {members.map((member, i) => (
                  <div key={i} className="text-center group">
                    <img
                      src={member.photo}
                      alt={member.fullname}
                      className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-gray-200 shadow-lg group-hover:border-[#E30613] group-hover:scale-110 transition"
                      onError={(e) =>
                        (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.fullname
                        )}&background=001F5B&color=fff&size=128`)
                      }
                    />
                    <p className="mt-4 text-sm font-medium text-[#001F5B] group-hover:text-[#E30613] transition">
                      {member.fullname}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* BACK BUTTON */}
          <div className="text-center">
            <NavLink
              to="/"
              className="inline-flex items-center gap-3 bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-105"
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