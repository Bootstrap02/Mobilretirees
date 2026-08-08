import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const API_URL = (process.env.REACT_APP_API || 'http://localhost:3000') + '/mobilcreatecandidates';

// Get all candidates
const getCandidates = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Cast vote
const castVote = async (candidateId, userId) => {
  if (!userId) throw new Error('User not authenticated');
  const res = await axios.post(`${API_URL}/${userId}/vote`, { candidateId });
  return res.data;
};

// Get results
const getResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};


export const VotingDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData')) || null;
  const userId = userData?._id;
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  // Group by office
  const grouped = candidates.reduce((acc, candidate) => {
    acc[candidate.office] = acc[candidate.office] || [];
    acc[candidate.office].push(candidate);
    return acc;
  }, {});

  const handleSelect = (office, candidateId) => {
    setSelected({ ...selected, [office]: candidateId });
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert('Please sign in to vote');
      return;
    }
    setLoading(true);
    try {
      for (let office in selected) {
        await castVote(selected[office], userId);
      }

      alert("Vote submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Voting failed");
    }
    setLoading(false);
  };

  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto p-6 mt-[80px]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        EMRAN Executive Voting
      </h1>

      {Object.keys(grouped).map((office) => (
        <div key={office} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{office}</h2>

          <div>
            <select
              value={selected[office] || ''}
              onChange={(e) => handleSelect(office, e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">-- Select a candidate --</option>
              {grouped[office].map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.fullName}{candidate.manifesto ? ` — ${candidate.manifesto}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/electionresults')}
          className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-xl mt-6 hover:bg-gray-300"
        >
          View Results
        </button>
        <button
          onClick={() => navigate('/elections/cast')}
          className="w-1/2 bg-blue-600 text-white py-3 rounded-xl mt-6 hover:bg-blue-700"
        >
          Cast Vote
        </button>
      </div>
    </div>
     <Footer/>
    </>
  );
};
export const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const data = await getResults();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 w-full px-4 mt-24">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-5">

          <h1 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-3">
            Election Results
          </h1>

          {results.length === 0 ? (
            <p className="text-gray-500 text-sm">No results available yet.</p>
          ) : (
            <div className="space-y-3">
              {results.map((r, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {r.office}
                    </p>
                    <p className="text-sm text-gray-600">
                      {r.candidate}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-blue-600">
                    {r.totalVotes}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Provide a default export so App.js can import the page as 'Elections'
export default VotingDashboard;