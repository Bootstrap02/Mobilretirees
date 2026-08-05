<section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#001F5B] mb-4">
              News & Recent Events
            </h2>
            <p className="text-xl text-gray-600">
              Highlights from recent EMRAN activities and engagements
            </p>
          </div>
    {featuredNews && loading ? (
  <div className="relative group animate-fadeInUp bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
    {/* Image with hover effect */}
    <div className="relative overflow-hidden">
      <img 
        src={featuredNews.image[0]} 
        alt={featuredNews.title} 
        className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    {/* Content */}
    <div className="p-8 sm:p-12">
      {/* Title */}
      <h3 className="text-3xl font-extrabold text-[#001F5B] mb-4 leading-tight group-hover:text-[#E30613] transition-colors duration-300">
        {featuredNews.title}
      </h3>

      {/* Body */}
      <p className="text-lg text-gray-700 mb-6 leading-relaxed line-clamp-4">
        {featuredNews.body}
      </p>

      {/* Read More Button */}
      <button 
        onClick={() => navigate('/newsevents')}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E30613] text-white font-bold text-base shadow-md hover:bg-[#c20511] hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Read More <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  </div>
): (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-[#001F5B] mb-4">No Recent News</h3>
        <p className="text-xl text-gray-600">
          Check back soon for updates from EMRAN activities and engagements.
          cedar toa
          
        </p>
      </div>
    )}
        </div>
      </section>