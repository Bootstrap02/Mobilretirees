// Pages/Dues.jsx — User-facing dues history with proper dates
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiCheckCircle, FiXCircle, FiCalendar, FiDollarSign } from 'react-icons/fi';

const fmtDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Dues = () => {
  const navigate = useNavigate();
  
  const [dues,         setDues]         = useState([]);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }
    

    // Build dues array from the Map object sorted newest first
    const duesMap = stored.dues || {};
    const duesArr = Object.entries(duesMap)
      .map(([year, data]) => ({ year, ...data }))
      .sort((a, b) => Number(b.year) - Number(a.year));
    setDues(duesArr);

    setRegistration(stored.registration || null);
  }, [navigate,]);

  const currentYear = new Date().getFullYear().toString();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#001F5B] mb-2">Dues & Payments</h1>
            <p className="text-gray-500">Your complete payment history with EMRAN</p>
          </div>

          {/* Registration fee card */}
          {registration && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#001F5B]/10 flex items-center justify-center flex-shrink-0">
                    <FiDollarSign className="text-[#001F5B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Registration Fee</p>
                    <p className="font-bold text-[#001F5B] text-lg">
                      {registration.amount ? `₦${Number(registration.amount).toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${
                    registration.payment
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {registration.payment
                      ? <><FiCheckCircle /> Paid</>
                      : <><FiXCircle /> Unpaid</>}
                  </span>
                  {registration.payment && registration.dueDate && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-end">
                      <FiCalendar className="flex-shrink-0" />
                      {fmtDate(registration.dueDate) || fmtDate(registration.updatedAt) || '—'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Annual dues list */}
          {dues.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center">
              <div className="text-5xl mb-3">📋</div>
              <p className="text-gray-500">No dues records found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dues.map(({ year, payment, amount, dueDate, updatedAt }) => {
                const isCurrentYear = year === currentYear;
                const isPaid        = payment === true;
                const dateStr       = fmtDate(dueDate) || fmtDate(updatedAt);

                return (
                  <div key={year}
                    className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
                      isPaid ? 'border-green-500' : 'border-red-400'
                    }`}>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          isPaid ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
                        }`}>
                          {year}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[#001F5B] text-lg">{year} Annual Dues</p>
                            {isCurrentYear && (
                              <span className="text-xs bg-[#001F5B] text-white px-2 py-0.5 rounded-full font-bold">
                                Current
                              </span>
                            )}
                          </div>
                          {amount > 0 && (
                            <p className="text-sm text-gray-500 mt-0.5">
                              ₦{Number(amount).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${
                          isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {isPaid ? <><FiCheckCircle /> Paid</> : <><FiXCircle /> Unpaid</>}
                        </span>
                        {isPaid && dateStr && (
                          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1 justify-end">
                            <FiCalendar className="flex-shrink-0" />
                            Paid on {dateStr}
                          </p>
                        )}
                        {!isPaid && (
                          <p className="text-xs text-gray-400 mt-1.5">Not yet paid</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact note */}
          <div className="mt-8 bg-[#001F5B]/5 border border-[#001F5B]/20 rounded-2xl px-6 py-5 text-center">
            <p className="text-sm text-gray-600">
              Payment records are updated by the EMRAN Secretariat.
              If you believe your payment status is incorrect, contact us at{' '}
              <a href="mailto:emranannuitants@gmail.com" className="text-[#E30613] font-semibold hover:underline">
                emranannuitants@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dues;

