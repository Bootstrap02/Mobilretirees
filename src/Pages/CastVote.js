import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const API_URL = (process.env.REACT_APP_API || 'http://localhost:3000') + '/mobilcreatecandidates';

const getCandidates = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// const castVote = async (candidateId, userId) => {
//   if (!userId) throw new Error('User not authenticated');
//   const res = await axios.post(`${API_URL}/${userId}/vote`, { candidateId });
//   return res.data;
// };

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (err) {
      console.error('Failed to fetch candidates', err);
      alert('Failed to load candidates');
    }
  };

  const grouped = candidates.reduce((acc, candidate) => {
    acc[candidate.office] = acc[candidate.office] || [];
    acc[candidate.office].push(candidate);
    return acc;
  }, {});

  const handleSelect = (office, candidateId) => {
    setSelected(prev => ({ ...prev, [office]: candidateId }));
  };

  const handleSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    const userId = userData?._id;
    if (!userId) { alert('Please sign in to vote'); navigate('/signin'); return; }

    // Build array of selected candidate IDs
    const candidateIds = Object.keys(selected).map(office => selected[office]).filter(Boolean);

    if (candidateIds.length === 0) {
      if (!window.confirm('You have not selected any candidates. Submit anyway?')) return;
    }

    setLoading(true);

    try {
      // Use new bulk endpoint
      await axios.post(`${API_URL}/${userId}/votes`, { candidateIds });

      alert('All votes submitted successfully.');
      navigate('/electionresults');
    } catch (err) {
      console.error('Bulk vote submission failed', err);
      alert(err.response?.data?.message || err.message || 'Voting failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-[80px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Cast Your Votes</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b">Office</th>
                <th className="py-3 px-4 border-b">Choose Candidate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(grouped).length === 0 && (
                <tr><td colSpan={2} className="py-6 px-4 text-center">No candidates available.</td></tr>
              )}

              {Object.keys(grouped).map((office) => (
                <tr key={office} className="align-top">
                  <td className="py-4 px-4 border-b align-top font-semibold">{office}</td>
                  <td className="py-4 px-4 border-b">
                    <select
                      value={selected[office] || ''}
                      onChange={(e) => handleSelect(office, e.target.value)}
                      className="w-full border rounded-lg p-3"
                    >
                      <option value="">-- Select a candidate --</option>
                      {grouped[office].map((c) => (
                        <option key={c._id} value={c._id}>{c.fullName}{c.manifesto ? ` — ${c.manifesto}` : ''}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#E30613] text-white py-3 px-6 rounded-xl hover:bg-[#c20511] disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Votes'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CastVote;
