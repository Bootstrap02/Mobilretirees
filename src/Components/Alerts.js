// src/components/AlertModal.jsx
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

const AlertModal = ({ alert }) => { // accept array
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenEMRANAlert');
    if (!hasSeen ) {
      setIsVisible(true);
      localStorage.setItem('hasSeenEMRANAlert', 'true');
    }
  }, [alert]);

  if (!isVisible ) return null;


  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 animate-fadeIn"
      onClick={() => setIsVisible(false)}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚠️</div>
            <h2 className="text-2xl font-bold">Important Alert</h2>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-[#E30613] transition text-3xl"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <h3 className="text-3xl font-bold text-[#001F5B] mb-6">
            {alert.title || "Welcome to EMRAN"}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {alert.content || "As a newly registered association under CAC Reg. No. 153528, we are excited to have you here..."}
          </p>

          <button 
            onClick={() => setIsVisible(false)}
            className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
          >
            Got it, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;