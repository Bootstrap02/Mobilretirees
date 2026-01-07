// pages/NewsDetail.jsx
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Same data — later from API
const allItems = [ /* same featured + items array from above */ ];

const NewsDetail = () => {
  const { id } = useParams();
  const item = allItems.find(i => i.id === parseInt(id));

  if (!item) return <div className="text-center py-20 text-3xl">News not found</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <NavLink to="/news-events" className="text-[#E30613] font-bold mb-8 inline-block hover:underline">
            ← Back to News & Events
          </NavLink>

          <img src={item.image} alt={item.title} className="w-full h-96 object-cover rounded-3xl shadow-2xl mb-12" />

          <h1 className="text-5xl font-extrabold text-[#001F5B] mb-6">{item.title}</h1>
          <p className="text-xl text-gray-600 mb-12">
            {item.date} {item.location ? `• ${item.location}` : ''}
          </p>

          <div className="prose prose-xl max-w-none text-gray-700">
            <p><strong>Full Description:</strong> {item.desc}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              EMRAN continues to advocate for retiree welfare and community building.
            </p>
            {/* Add more detailed content from API later */}
          </div>

          <div className="mt-16 text-center">
            <NavLink 
              to="/news-events"
              className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110 inline-block"
            >
              Back to All News & Events
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;