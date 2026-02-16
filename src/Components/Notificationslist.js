// src/components/NotificationsList.jsx (updated)
import React from 'react';
import { useNavigate } from 'react-router-dom'; // NEW
import { FiX, FiBell } from 'react-icons/fi';

const NotificationsList = ({ isOpen, onClose, notifications = [] }) => {
  const navigate = useNavigate(); // NEW


 

  const handleNotificationClick = (id) => {
    navigate(`/notifications/${id}`); // Navigate to detail page
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FiBell className="text-3xl" />
            <h2 className="text-2xl font-bold">Notifications</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-[#E30613] transition text-3xl">
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FiBell className="text-7xl mx-auto mb-6 opacity-40" />
              <p className="text-2xl">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-5">
              {notifications.map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif._id)}
                  className={`p-6 rounded-2xl border-l-4 transition-all duration-300 cursor-pointer hover:shadow-lg
                     'bg-red-50 border-[#E30613] shadow-md'
                  }`}
                >
                  <h3 className={`font-bold text-xl 'text-[#001F5B]'}`}>
                    {notif.title}
                  </h3>
                  <p className="text-gray-700 mt-2 line-clamp-2">{notif.content}</p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>{notif.timestamps}</span>
                  
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-5 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-[#001F5B] hover:bg-[#001845] text-white px-10 py-4 rounded-xl font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;