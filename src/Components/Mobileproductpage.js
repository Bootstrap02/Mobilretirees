import React from 'react';



const NewsEvents =({featuredNews})=>{
  return(
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
      {featuredNews ? (
          <div className="relative group animate-on-scroll">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#E30613] to-[#ff4444] rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <img
                src={featuredNews.image?.[0] ||  heroImage}
                alt="Recent EMRAN Event"
                className="w-full h-full object-cover"
              />

              <div className="p-10 lg:p-14">
                <span className="inline-block mb-6 px-4 py-1 rounded-full bg-[#E30613]/10 text-[#E30613] font-bold text-sm">
                  MOST RECENT EVENT
                </span>

                <h3 className="text-3xl lg:text-4xl font-extrabold text-[#001F5B] mb-6">
                 {featuredNews.title || "EMRAN General Meeting & Welfare Briefing"} 
                </h3>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {featuredNews.body || "Members gathered for discussions on association updates, welfare structure reviews, and upcoming engagement plans."}
                </p>

                <button
                  onClick={() => navigate('/newsevents')}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E30613] to-[#c20511] text-white font-bold text-lg shadow-xl hover:scale-105 transition"
                >
                  Get More Information
                  <span className="group-hover:translate-x-1 transition">→</span>
                </button>
              </div>
            </div>
          </div>
         ): (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-[#001F5B] mb-4">No Recent News</h3>
        <p className="text-xl text-gray-600">
          Check back soon for updates from EMRAN activities and engagements.
        </p>
      </div>
    )}
        </div>
      </section>
  )
}
export default NewsEvents