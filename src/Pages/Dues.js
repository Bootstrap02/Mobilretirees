// pages/Dues.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Dues = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (!storedUser) {
      navigate('/signin');
      return;
    }

    // Use real user data + dummy dues (replace with API)
    const dummyDues = {
      status: "Paid",
      currentExpiry: "December 31, 2026",
      history: [
        { year: "2026", amount: "₦40,000", date: "Jan 5, 2026", status: "Paid" },
        { year: "2025", amount: "₦40,000", date: "Dec 20, 2025", status: "Paid" },
        { year: "2024", amount: "₦40,000", date: "Nov 15, 2024", status: "Paid" }
      ],
      nextYear: "2027",
      nextAmount: "₦40,000"
    };

    setUser({
      fullname: storedUser.fullname,
      dues: dummyDues // From API later
    });
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-3xl font-bold text-[#001F5B] animate-pulse">Loading dues information...</div>
      </div>
    );
  }

  const handlePayNext = () => {
    // Direct to payment (you handle API/gateway)
    window.location.href = 'https://your-payment-gateway.com/pay-dues'; // Replace with real URL
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001F5B] mb-8">
              Membership Dues
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Manage your EMRAN dues payments, view history, and stay current with annual contributions.
            </p>
          </div>

          {/* Dues Status Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border-t-8 border-[#E30613]">
            <h2 className="text-4xl font-bold text-[#001F5B] mb-8 text-center">Current Dues Status</h2>
            <div className="grid md:grid-cols-2 gap-12 text-center">
              <div className="p-8 bg-green-50 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Status</h3>
                <p className="text-4xl font-extrabold text-green-700">{user.dues.status}</p>
              </div>
              <div className="p-8 bg-yellow-50 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">Expiry Date</h3>
                <p className="text-4xl font-extrabold text-yellow-700">{user.dues.currentExpiry}</p>
              </div>
            </div>
          </div>

          {/* Dues History */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">Payment History</h2>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-[#001F5B] text-white">
                    <tr>
                      <th className="p-6 text-left text-xl">Year</th>
                      <th className="p-6 text-left text-xl">Amount</th>
                      <th className="p-6 text-left text-xl">Date Paid</th>
                      <th className="p-6 text-left text-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.dues.history.map((entry, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50 transition">
                        <td className="p-6 text-lg font-medium">{entry.year}</td>
                        <td className="p-6 text-lg">{entry.amount}</td>
                        <td className="p-6 text-lg">{entry.date}</td>
                        <td className="p-6">
                          <span className={`px-6 py-3 rounded-full font-bold text-lg ${
                            entry.status === "Paid" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pay Next Year's Dues */}
          <div className="bg-gradient-to-r from-[#E30613] to-[#c20511] text-white rounded-3xl p-16 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-8">Pay Your {user.dues.nextYear} Dues</h2>
            <p className="text-2xl mb-6 opacity-90">
              Annual Membership: {user.dues.nextAmount}
            </p>
            <p className="text-xl mb-12 opacity-90">
              Secure your membership and continue enjoying EMRAN benefits. Pay now via our trusted gateway.
            </p>
            <button 
              onClick={handlePayNext}
              className="inline-block bg-white hover:bg-gray-100 text-[#E30613] font-bold text-2xl px-20 py-8 rounded-full shadow-2xl transition transform hover:scale-110"
            >
              Pay Now
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-16">
            <NavLink 
              to="/dashboard"
              className="inline-flex items-center gap-4 text-[#E30613] font-bold text-2xl hover:underline"
            >
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dues;