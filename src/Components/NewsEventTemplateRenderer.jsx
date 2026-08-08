// src/Components/NewsEventTemplateRenderer.jsx
import React from 'react';

const NewsEventTemplateRenderer = ({ newsEvent }) => {
  const getTemplateStyles = (templateType) => {
    const styles = {
      birthday: {
        bgGradient: 'from-yellow-50 to-orange-50',
        accentColor: 'text-yellow-600',
        borderColor: 'border-yellow-300',
        badge: 'bg-yellow-200 text-yellow-800',
        icon: '🎂',
      },
      funeral: {
        bgGradient: 'from-gray-50 to-slate-50',
        accentColor: 'text-gray-600',
        borderColor: 'border-gray-300',
        badge: 'bg-gray-200 text-gray-800',
        icon: '🕊️',
      },
      wedding: {
        bgGradient: 'from-pink-50 to-red-50',
        accentColor: 'text-red-600',
        borderColor: 'border-pink-300',
        badge: 'bg-pink-200 text-red-800',
        icon: '💒',
      },
      anniversary: {
        bgGradient: 'from-purple-50 to-pink-50',
        accentColor: 'text-purple-600',
        borderColor: 'border-purple-300',
        badge: 'bg-purple-200 text-purple-800',
        icon: '💝',
      },
      other: {
        bgGradient: 'from-blue-50 to-indigo-50',
        accentColor: 'text-blue-600',
        borderColor: 'border-blue-300',
        badge: 'bg-blue-200 text-blue-800',
        icon: '📰',
      },
    };

    return styles[templateType] || styles.other;
  };

  const style = getTemplateStyles(newsEvent.templateType || 'other');

  return (
    <div className={`bg-gradient-to-br ${style.bgGradient} rounded-3xl border-2 ${style.borderColor} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
      {/* Header with Badge and Icon */}
      <div className="p-6 md:p-8 border-b-2 border-opacity-30">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl md:text-4xl">{style.icon}</span>
          {newsEvent.templateType && (
            <span className={`inline-block ${style.badge} text-xs md:text-sm font-bold px-4 py-2 rounded-full capitalize`}>
              {newsEvent.templateType} Event
            </span>
          )}
        </div>
        <h3 className={`text-2xl md:text-3xl font-extrabold ${style.accentColor} mb-2`}>
          {newsEvent.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Main Description */}
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
          {newsEvent.body}
        </p>

        {/* Template Data Display */}
        {newsEvent.templateData && Object.keys(newsEvent.templateData).length > 0 && (
          <div className="bg-white bg-opacity-60 rounded-2xl p-4 md:p-6 mb-6">
            <h4 className="font-bold text-gray-800 mb-3">Event Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(newsEvent.templateData).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className={`text-sm font-semibold ${style.accentColor} capitalize`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-gray-700 font-medium text-lg mt-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Gallery */}
        {newsEvent.image && newsEvent.image.length > 0 && (
          <div className="mt-6">
            <h4 className="font-bold text-gray-800 mb-4">Gallery</h4>
            <div className={`grid gap-4 ${
              newsEvent.image.length === 1 ? 'grid-cols-1' :
              newsEvent.image.length === 2 ? 'grid-cols-2' :
              'grid-cols-2 md:grid-cols-3'
            }`}>
              {newsEvent.image.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`${newsEvent.title} ${idx + 1}`}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="mt-8 pt-6 border-t-2 border-opacity-30 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600">
          <span>📅 {new Date(newsEvent.createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
          <span className="mt-2 md:mt-0">⏱️ {new Date(newsEvent.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsEventTemplateRenderer;
