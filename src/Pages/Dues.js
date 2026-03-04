// pages/Dues.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { FiLoader, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

export const Dues = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userData'));

      if (!storedUser) {
        navigate('/signin');
        return;
      }
      setId(storedUser._id)
      const duesMap = storedUser.dues || {};
      const registrationData = storedUser.registration || {};
      const currentYear = new Date().getFullYear().toString();

      const duesArray = Object.entries(duesMap).map(([year, data]) => ({
        year,
        amount: data.amount || 0,
        date: data.updatedAt
          ? new Date(data.updatedAt).toLocaleDateString()
          : data.dueDate
            ? new Date(data.dueDate).toLocaleDateString()
            : '—',
        status: data.payment ? 'Paid' : 'Unpaid',
        payment: data.payment,
        dueDate: data.dueDate,
      }));

      duesArray.sort((a, b) => Number(b.year) - Number(a.year));

      const paidYears = duesArray.filter(d => d.payment);
      const latestPaid = paidYears.length > 0 ? paidYears[0] : null;

      const currentYearData = duesMap[currentYear];

      const status =
        currentYearData && currentYearData.payment
          ? 'Paid'
          : 'Unpaid';

      const currentExpiry =
        latestPaid && latestPaid.dueDate
          ? new Date(latestPaid.dueDate).toDateString()
          : 'Not Available';

      const nextYear = (parseInt(currentYear) + 1).toString();
      const nextAmount = currentYearData?.amount || 40000;

      setUser({
        fullname: storedUser.fullname,
        registration: {
          status: registrationData.payment ? 'Paid' : 'Unpaid',
          amount: registrationData.amount || 0,
          date: registrationData.updatedAt
            ? new Date(registrationData.updatedAt).toLocaleDateString()
            : '—'
        },
        dues: {
          status,
          currentExpiry,
          history: duesArray,
          nextYear,
          nextAmount: `₦${Number(nextAmount).toLocaleString()}`
        }
      });

      setLoading(false);
    } catch (error) {
      navigate('/signin');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-3xl font-bold text-[#001F5B] animate-pulse">
          Loading dues information...
        </div>
      </div>
    );
  }

  const handlePayNext = () => {
    navigate(`/duespayment/${id}`)
  };
  const backToDashboard = () => {
    navigate(`/dashboard/${id}`)
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
           {/* Registration Fee */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border-t-8 border-[#001F5B]">
            <h2 className="text-3xl font-bold text-center mb-8">Registration Fee</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-lg font-semibold">Status</p>
                <p className={`text-2xl font-bold ${
                  user.registration.status === 'Paid'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}>
                  {user.registration.status}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Amount</p>
                <p className="text-2xl font-bold">
                  ₦{Number(user.registration.amount).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Date</p>
                <p className="text-xl">{user.registration.date}</p>
              </div>
            </div>
          </div>

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
            <h2 className="text-4xl font-bold text-[#001F5B] mb-8 text-center">
              Current Dues Status
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-center">
              <div className={`p-8 rounded-2xl shadow-lg ${
                user.dues.status === 'Paid'
                  ? 'bg-green-50'
                  : 'bg-red-50'
              }`}>
                <h3 className="text-2xl font-bold mb-4">Status</h3>
                <p className={`text-4xl font-extrabold ${
                  user.dues.status === 'Paid'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}>
                  {user.dues.status}
                </p>
              </div>

              <div className="p-8 bg-yellow-50 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                  Expiry Date
                </h3>
                <p className="text-4xl font-extrabold text-yellow-700">
                  {user.dues.currentExpiry}
                </p>
              </div>
            </div>
          </div>

          {/* Dues History */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-[#001F5B] text-center mb-12">
              Payment History
            </h2>
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
                        <td className="p-6 text-lg font-medium">
                          {entry.year}
                        </td>
                        <td className="p-6 text-lg">
                          ₦{Number(entry.amount).toLocaleString()}
                        </td>
                        <td className="p-6 text-lg">
                          {entry.date}
                        </td>
                        <td className="p-6">
                          <span
                            className={`px-6 py-3 rounded-full font-bold text-lg ${
                              entry.status === 'Paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
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
            <h2 className="text-4xl font-bold mb-8">
              Pay Your {user.dues.nextYear} Dues
            </h2>
            <p className="text-2xl mb-6 opacity-90">
              Annual Membership: {user.dues.nextAmount}
            </p>
            <p className="text-xl mb-12 opacity-90">
              Secure your membership and continue enjoying EMRAN benefits.
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
            <button
              onClick={backToDashboard}
              className="inline-flex items-center gap-4 text-[#E30613] font-bold text-2xl hover:underline"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export  const DuesPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(()=>{
     const storedUser = JSON.parse(localStorage.getItem('userData'));

      if (!storedUser) {
        navigate('/signin');
        return;
      }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim() || token.length !== 6 || !/^\d{6}$/.test(token)) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit code' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/confirmpayment/${id}`,
        { token: token.trim(),  year: true }
      );

      setMessage({
        type: 'success',
        text: response.data.message || 'Payment confirmation submitted successfully.'
      });

      setToken('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit confirmation.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F5B] via-[#001845] to-[#0A3D6B] text-white py-12 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-white hover:underline"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Annual Membership Dues Payment
          </h1>
          <p className="text-xl opacity-90">
            Please transfer your dues to the account below.
          </p>
        </div>

        {/* Bank Details */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 mb-12 border border-white/20">
          <p className="text-xl mb-3"><strong>Bank:</strong> UBA</p>
          <p className="text-xl mb-3"><strong>Account Name:</strong> EXXONMOBIL RETIREES ASSOCIATION OF NIGERIA</p>
          <p className="text-xl mb-6"><strong>Account Number:</strong> 1028320811</p>
          <p className="opacity-90">
            After making your transfer, enter the last 6 digits of your transaction reference below.
          </p>
        </div>

        {/* Confirmation Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">

            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit reference"
              className="w-full px-6 py-5 text-3xl font-mono text-center bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:border-[#E30613]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl transition ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#E30613] hover:bg-[#c20511]'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin inline mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle className="inline mr-2" />
                  Confirm Payment
                </>
              )}
            </button>

            {message.text && (
              <div
                className={`mt-6 p-5 rounded-xl text-center ${
                  message.type === 'success'
                    ? 'bg-green-600/20 border border-green-400 text-green-200'
                    : 'bg-red-600/20 border border-red-400 text-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

