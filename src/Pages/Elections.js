
// pages/ElectionsPage.jsx  — Member-facing elections list: vote + view results
// FIX: previously fetched a single election via GET /active. Now fetches
// every election via GET /all so members can see and act on President,
// Financial Secretary, Treasurer, etc. all at once, each as its own card.
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { FiCheckCircle, FiAward, FiLoader, FiBarChart2, FiCalendar, FiChevronDown } from 'react-icons/fi';

const API = 'https://campusbuy-backend-nkmx.onrender.com/mobilcreateelection';

const statusBadge = (status) => {
  const map = {
    upcoming:         { label: 'Upcoming',         cls: 'bg-blue-100 text-blue-700' },
    active:           { label: 'Voting Open',       cls: 'bg-green-100 text-green-700' },
    ended:            { label: 'Voting Closed',     cls: 'bg-gray-100 text-gray-600' },
    results_declared: { label: 'Results Declared',  cls: 'bg-purple-100 text-purple-700' },
  };
  const s = map[status] || { label: status, cls: 'bg-gray-100 text-gray-600' };
  return <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${s.cls}`}>{s.label}</span>;
};

const Avatar = ({ c, size = 'w-10 h-10 sm:w-12 sm:h-12' }) =>
  c.photo
    ? <img src={c.photo} alt={c.fullName} className={`${size} rounded-full object-cover border border-gray-200 flex-shrink-0`} />
    : <div className={`${size} rounded-full bg-[#001F5B]/10 flex items-center justify-center font-bold text-[#001F5B] flex-shrink-0 text-sm sm:text-base`}>
        {c.fullName.charAt(0)}
      </div>;

// ── One election card: handles its own vote/results state ──────────────────
const ElectionCard = ({ election, userId, defaultOpen }) => {
  const [open,     setOpen]     = useState(defaultOpen);
  const [hasVoted, setHasVoted] = useState(false);
  const [checked,  setChecked]  = useState(false);
  const [voting,   setVoting]   = useState('');
  const [msg,      setMsg]      = useState({ type: '', text: '' });

  useEffect(() => {
    if (election.status !== 'active' || !userId) { setChecked(true); return; }
    axios.get(`${API}/${election._id}/has-voted/${userId}`)
      .then(res => setHasVoted(res.data.hasVoted))
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [election._id, election.status, userId]);

  const castVote = async (positionId, candidateId, candidateName) => {
    if (!userId) return;
    if (!window.confirm(`Confirm your vote for ${candidateName}? This cannot be changed.`)) return;
    setVoting(candidateId);
    try {
      await axios.post(`${API}/${election._id}/vote`, { userId, positionId, candidateId });
      setHasVoted(true);
      setMsg({ type: 'success', text: `Your vote for ${candidateName} has been recorded!` });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to cast vote.' });
      if (err.response?.data?.alreadyVoted) setHasVoted(true);
    } finally {
      setVoting('');
    }
  };

  // For results_declared elections, the full election doc already carries
  // each candidate's voteCount, so results are computed right here rather
  // than needing a second network call.
  const standingsByPosition = election.status === 'results_declared'
    ? election.positions.map(pos => ({
        position: pos.title,
        standings: [...pos.candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0)),
      }))
    : null;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-5 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-base sm:text-xl font-extrabold text-[#001F5B] truncate">{election.title}</h2>
            {statusBadge(election.status)}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1.5">
            <FiCalendar className="flex-shrink-0" />
            {new Date(election.startDate).toLocaleString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
            {election.status === 'active' && checked && hasVoted && (
              <span className="ml-2 text-green-600 font-semibold flex items-center gap-1"><FiCheckCircle /> Voted</span>
            )}
          </p>
        </div>
        <FiChevronDown className={`text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 sm:px-6 pb-6 border-t border-gray-100 pt-4">
          {msg.text && (
            <div className={`mb-5 px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {msg.type === 'success' ? <FiCheckCircle className="flex-shrink-0" /> : '⚠️'} {msg.text}
            </div>
          )}

          {/* ACTIVE + not voted: ballot */}
          {election.status === 'active' && checked && !hasVoted && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-amber-800 text-xs sm:text-sm font-medium">
                ⚠️ You can only vote once per election. Choose carefully — your vote cannot be changed.
              </div>
              {election.positions.map(pos => (
                <div key={pos._id}>
                  <h3 className="text-sm sm:text-base font-bold text-[#001F5B] mb-3 flex items-center gap-2">
                    <span className="text-[#E30613]">🗳️</span> {pos.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pos.candidates.map(c => (
                      <div key={c._id} className="border-2 border-gray-100 rounded-2xl p-4 flex flex-col hover:border-[#001F5B]/30 transition">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar c={c} />
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm">{c.fullName}</p>
                            {c.manifesto && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{c.manifesto}</p>}
                          </div>
                        </div>
                        <button disabled={!!voting}
                          onClick={() => castVote(pos._id, c._id, c.fullName)}
                          className="mt-auto w-full py-2.5 rounded-xl text-white font-bold text-sm transition flex items-center justify-center gap-2"
                          style={{ background: voting === c._id ? '#9CA3AF' : '#E30613' }}>
                          {voting === c._id ? <><FiLoader className="animate-spin" /> Casting...</> : 'Vote'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ACTIVE + already voted */}
          {election.status === 'active' && checked && hasVoted && (
            <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-4 flex items-center gap-3">
              <FiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
              <div>
                <p className="text-green-800 font-bold text-sm">Your vote has been recorded!</p>
                <p className="text-green-700/70 text-xs">Thank you for participating in this election.</p>
              </div>
            </div>
          )}

          {/* UPCOMING: preview only */}
          {election.status === 'upcoming' && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-gray-500">Voting hasn't opened yet. Here's who's running:</p>
              {election.positions.map(pos => (
                <div key={pos._id}>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 border-b pb-1.5">{pos.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pos.candidates.map(c => (
                      <div key={c._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Avatar c={c} size="w-9 h-9" />
                        <p className="font-semibold text-gray-900 text-sm truncate">{c.fullName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ENDED, awaiting results */}
          {election.status === 'ended' && (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-gray-600 font-semibold text-sm">Voting has ended — results are being tallied.</p>
            </div>
          )}

          {/* RESULTS DECLARED */}
          {election.status === 'results_declared' && standingsByPosition && (
            <div className="space-y-6">
              {standingsByPosition.map((r, ri) => {
                const total = r.standings.reduce((s, c) => s + (c.voteCount || 0), 0);
                return (
                  <div key={ri}>
                    <h4 className="text-sm sm:text-base font-bold text-[#001F5B] mb-3 flex items-center gap-2">
                      <FiBarChart2 /> {r.position}
                    </h4>
                    <div className="space-y-2.5">
                      {r.standings.map((c, ci) => {
                        const pct = total > 0 ? Math.round(((c.voteCount || 0) / total) * 100) : 0;
                        const isWinner = ci === 0;
                        return (
                          <div key={c._id} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${
                            isWinner ? 'border-[#E30613]/40 bg-red-50' : 'border-gray-100 bg-gray-50'
                          }`}>
                            <Avatar c={c} size="w-9 h-9" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1 gap-2">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {isWinner && <FiAward className="text-[#E30613] flex-shrink-0 text-sm" />}
                                  <span className={`font-bold truncate text-sm ${isWinner ? 'text-[#001F5B]' : 'text-gray-700'}`}>{c.fullName}</span>
                                  {isWinner && <span className="text-[10px] font-bold bg-[#E30613] text-white px-1.5 py-0.5 rounded-full flex-shrink-0">WINNER</span>}
                                </div>
                                <span className="text-xs font-semibold text-gray-500 flex-shrink-0">{c.voteCount || 0} ({pct}%)</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700"
                                  style={{ width: `${pct}%`, background: isWinner ? '#E30613' : '#001F5B' }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main page: fetches every election ───────────────────────────────────────
const ElectionsPage = () => {
  const navigate  = useNavigate();
  const [userData,  setUserData]  = useState(null);
  const [elections, setElections] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }
    setUserData(stored);
  }, [navigate]);

  const loadElections = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setElections(res.data.elections || []);
    } catch (err) {
      console.error('Load error:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadElections(); }, [loadElections]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-xl sm:text-2xl text-[#001F5B] animate-pulse">Loading elections...</div>
        </div>
        <Footer />
      </>
    );
  }

  // Show the most relevant elections first: open for voting, then upcoming,
  // then results just declared, then old/ended ones last.
  const rank = { active: 0, upcoming: 1, results_declared: 2, ended: 3 };
  const sorted = [...elections].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 pb-16 sm:pb-20 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#001F5B] mb-2">EMRAN Elections</h1>
            <p className="text-gray-500 text-base sm:text-lg">Your vote matters. Cast it securely below.</p>
          </div>

          {sorted.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 sm:p-16 text-center">
              <div className="text-6xl sm:text-7xl mb-4">🗳️</div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#001F5B] mb-3">No Elections Yet</h2>
              <p className="text-gray-500 text-base sm:text-lg">There are no elections at this time. Check back later.</p>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              {sorted.map((el, i) => (
                <ElectionCard key={el._id} election={el} userId={userData?._id} defaultOpen={i === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ElectionsPage;
