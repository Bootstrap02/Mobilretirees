// pages/ElectionsPage.jsx  — Member-facing voting + results page
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { FiCheckCircle, FiAward, FiLoader, FiBarChart2, FiCalendar } from 'react-icons/fi';

const API = 'https://campusbuy-backend-nkmx.onrender.com/mobilcreateelection';

const statusBadge = (status) => {
  const map = {
    upcoming:         { label: 'Upcoming',         cls: 'bg-blue-100 text-blue-700' },
    active:           { label: 'Voting Open',       cls: 'bg-green-100 text-green-700' },
    ended:            { label: 'Voting Closed',     cls: 'bg-gray-100 text-gray-600' },
    results_declared: { label: 'Results Declared',  cls: 'bg-purple-100 text-purple-700' },
  };
  const s = map[status] || { label: status, cls: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.cls}`}>{s.label}</span>
  );
};

const ElectionsPage = () => {
  const navigate  = useNavigate();
  const [userData, setUserData] = useState(null);
  const [election, setElection] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results,  setResults]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [voting,   setVoting]   = useState(''); // candidateId currently being voted
  const [msg,      setMsg]      = useState({ type: '', text: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }
    setUserData(stored);
  }, [navigate]);

  const loadElection = useCallback(async (userId) => {
    try {
      const res = await axios.get(`${API}/active`);
      const el  = res.data.election;
      setElection(el);

      if (!el) { setLoading(false); return; }

      // Check if this user has already voted
      const votedRes = await axios.get(`${API}/${el._id}/has-voted/${userId}`);
      setHasVoted(votedRes.data.hasVoted);

      // Load results if declared
      if (el.status === 'results_declared') {
        const resRes = await axios.get(`${API}/${el._id}/results`);
        setResults(resRes.data.results);
      }
    } catch (err) {
      console.error('Load error:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userData?._id) loadElection(userData._id);
  }, [userData, loadElection]);

  const castVote = async (positionId, candidateId, candidateName) => {
    if (!election || !userData?._id) return;
    if (!window.confirm(`Confirm your vote for ${candidateName}? This cannot be changed.`)) return;

    setVoting(candidateId);
    try {
      await axios.post(`${API}/${election._id}/vote`, {
        userId:      userData._id,
        positionId,
        candidateId,
      });
      setHasVoted(true);
      setMsg({ type: 'success', text: `Your vote for ${candidateName} has been recorded! Thank you for participating.` });
      // Refresh election to get updated counts
      loadElection(userData._id);
    } catch (err) {
      const serverMsg = err.response?.data?.message || 'Failed to cast vote. Please try again.';
      setMsg({ type: 'error', text: serverMsg });
      if (err.response?.data?.alreadyVoted) setHasVoted(true);
    } finally {
      setVoting('');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-2xl text-[#001F5B] animate-pulse">Loading election...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-2">EMRAN Elections</h1>
            <p className="text-gray-500 text-lg">Your vote matters. Cast it securely below.</p>
          </div>

          {/* Feedback message */}
          {msg.text && (
            <div className={`mb-8 px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 ${
              msg.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {msg.type === 'success' ? <FiCheckCircle className="text-2xl flex-shrink-0" /> : '⚠️'}
              {msg.text}
            </div>
          )}

          {/* No election */}
          {!election && (
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
              <div className="text-7xl mb-4">🗳️</div>
              <h2 className="text-2xl font-bold text-[#001F5B] mb-3">No Active Elections</h2>
              <p className="text-gray-500 text-lg">There are no elections open for voting at this time. Check back later.</p>
            </div>
          )}

          {election && (
            <div className="space-y-8">
              {/* Election info card */}
              <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{election.title}</h2>
                    {election.description && (
                      <p className="text-white/80 text-base mb-3">{election.description}</p>
                    )}
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <FiCalendar />
                      Started: {new Date(election.startDate).toLocaleString('en-GB', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                    </p>
                  </div>
                  <div>{statusBadge(election.status)}</div>
                </div>

                {/* Voted banner */}
                {hasVoted && election.status === 'active' && (
                  <div className="mt-5 bg-green-500/20 border border-green-400/40 rounded-2xl px-5 py-4 flex items-center gap-3">
                    <FiCheckCircle className="text-green-300 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold">Your vote has been recorded!</p>
                      <p className="text-white/70 text-sm">You have successfully voted in this election. Thank you for participating.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── ACTIVE ELECTION — show ballot if not yet voted ── */}
              {election.status === 'active' && !hasVoted && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-amber-800 text-sm font-medium">
                    ⚠️ You can only vote <strong>once</strong> per election. Once your vote is cast for a position, it cannot be changed. Please choose carefully.
                  </div>

                  {election.positions.map((pos) => (
                    <div key={pos._id} className="bg-white rounded-3xl shadow-lg p-8">
                      <h3 className="text-xl font-extrabold text-[#001F5B] mb-6 flex items-center gap-2">
                        <span className="text-[#E30613]">🗳️</span> {pos.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pos.candidates.map((c) => (
                          <div key={c._id}
                            className="border-2 border-gray-100 rounded-2xl p-5 flex flex-col hover:border-[#001F5B]/30 transition">
                            <div className="flex items-center gap-4 mb-4">
                              {c.photo
                                ? <img src={c.photo} alt={c.fullName} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex-shrink-0" />
                                : <div className="w-14 h-14 rounded-full bg-[#001F5B]/10 flex items-center justify-center text-xl font-bold text-[#001F5B] flex-shrink-0">
                                    {c.fullName.charAt(0)}
                                  </div>
                              }
                              <div>
                                <p className="font-bold text-gray-900">{c.fullName}</p>
                                {c.manifesto && <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{c.manifesto}</p>}
                              </div>
                            </div>
                            <button
                              disabled={!!voting}
                              onClick={() => castVote(pos._id, c._id, c.fullName)}
                              className="mt-auto w-full py-3 rounded-xl text-white font-bold text-sm transition flex items-center justify-center gap-2"
                              style={{ background: voting === c._id ? '#9CA3AF' : '#E30613' }}>
                              {voting === c._id
                                ? <><FiLoader className="animate-spin" /> Casting Vote...</>
                                : 'Vote for this Candidate'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── UPCOMING — show candidates preview ── */}
              {election.status === 'upcoming' && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-[#001F5B] mb-6">Election Preview — Candidates</h3>
                  {election.positions.map((pos) => (
                    <div key={pos._id} className="mb-8">
                      <h4 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">{pos.title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pos.candidates.map((c) => (
                          <div key={c._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            {c.photo
                              ? <img src={c.photo} alt={c.fullName} className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                              : <div className="w-12 h-12 rounded-full bg-[#001F5B]/10 flex items-center justify-center font-bold text-[#001F5B] flex-shrink-0">
                                  {c.fullName.charAt(0)}
                                </div>
                            }
                            <div>
                              <p className="font-bold text-gray-900">{c.fullName}</p>
                              {c.manifesto && <p className="text-xs text-gray-500 mt-0.5">{c.manifesto}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── RESULTS DECLARED ── */}
              {election.status === 'results_declared' && results && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-extrabold text-[#001F5B] mb-8 flex items-center gap-3">
                    <FiAward className="text-[#E30613] text-3xl" /> Official Election Results
                  </h3>
                  {results.map((r, ri) => (
                    <div key={ri} className="mb-10">
                      <h4 className="text-lg font-bold text-[#001F5B] mb-4 flex items-center gap-2">
                        <FiBarChart2 /> {r.position}
                      </h4>
                      <div className="space-y-3">
                        {r.standings.map((s, si) => {
                          const total = r.standings.reduce((x, y) => x + y.votes, 0);
                          const pct   = total > 0 ? Math.round((s.votes / total) * 100) : 0;
                          const isWinner = si === 0;
                          return (
                            <div key={si} className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                              isWinner ? 'border-[#E30613]/40 bg-red-50' : 'border-gray-100 bg-gray-50'
                            }`}>
                              {s.photo
                                ? <img src={s.photo} alt={s.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow flex-shrink-0" />
                                : <div className="w-12 h-12 rounded-full bg-[#001F5B]/10 flex items-center justify-center font-bold text-[#001F5B] flex-shrink-0 text-lg">
                                    {s.name.charAt(0)}
                                  </div>
                              }
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5 gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    {isWinner && <FiAward className="text-[#E30613] flex-shrink-0" />}
                                    <span className={`font-bold truncate ${isWinner ? 'text-[#001F5B]' : 'text-gray-700'}`}>{s.name}</span>
                                    {isWinner && <span className="text-xs font-bold bg-[#E30613] text-white px-2 py-0.5 rounded-full flex-shrink-0">WINNER</span>}
                                  </div>
                                  <span className="text-sm font-semibold text-gray-500 flex-shrink-0">{s.votes} votes ({pct}%)</span>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%`, background: isWinner ? '#E30613' : '#001F5B' }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── VOTING ENDED, RESULTS PENDING ── */}
              {election.status === 'ended' && (
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="text-2xl font-bold text-[#001F5B] mb-3">Voting has ended</h3>
                  <p className="text-gray-500">Results are being tallied and will be announced shortly. Check back soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ElectionsPage;

