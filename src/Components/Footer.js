// components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin,
  FiYoutube,
  FiChevronUp,
  FiHeart,
  FiBell,
  FiUser 
} from 'react-icons/fi';
import exxonLogoWhite from '../assets/exxonmobil-logo-white.jpg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Footer - Desktop & Tablet */}
      <footer className="bg-[#001F5B] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand & Welcome */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={exxonLogoWhite} alt="ExxonMobil Nigeria" className="h-16" />
              <div>
                <h3 className="font-bold text-xl">Retirees Portal</h3>
                <p className="text-sm opacity-90">Nigeria Chapter</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your lifelong partner in retirement. Access your pension, health benefits, community updates, and support — all in one secure place.
            </p>
            <p className="text-sm text-gray-400">
              Serving generations of dedicated ExxonMobil Nigeria retirees since 1969.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E30613]">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><NavLink to="/" className="hover:text-[#E30613] transition">Home</NavLink></li>
              <li><NavLink to="/benefits" className="hover:text-[#E30613] transition">My Benefits</NavLink></li>
              <li><NavLink to="/resources" className="hover:text-[#E30613] transition">Resources & Forms</NavLink></li>
              <li><NavLink to="/news" className="hover:text-[#E30613] transition">News & Events</NavLink></li>
              <li><NavLink to="/support" className="hover:text-[#E30613] transition">Support Center</NavLink></li>
              <li><NavLink to="/faqs" className="hover:text-[#E30613] transition">FAQs</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E30613]">Contact Us</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#E30613] mt-1" />
                <div>
                  <p className="font-medium">Lagos Office</p>
                  <p className="text-sm">Mobil House, 1 Lekki Expressway, Victoria Island, Lagos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-[#E30613]" />
                <div>
                  <p className="font-medium">Port Harcourt</p>
                  <p className="text-sm">ExxonMobil Complex, Aba Road, Rumuomasi</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-[#E30613]" />
                <p>+234 1 277 7700 | +234 803 123 4567 (Retirees Hotline)</p>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-[#E30613]" />
                <p>retirees.ng@exxonmobil.com</p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E30613]">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Get monthly updates on pension payments, health tips, and retiree events.
            </p>
          <form className="w-full max-w-xs mx-auto sm:mx-0 flex flex-col sm:flex-row gap-2 mb-8">
  <input 
    type="email" 
    placeholder="Email" 
    className="w-[60%] px-4 py-2 text-sm rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#E30613] transition"
  />
  <button className="w-[35%] px-3 py-1 bg-[#E30613] hover:bg-[#c20511] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap">
    Subscribe
  </button>
</form>

            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-[#E30613] transition"><FiFacebook /></a>
              <a href="#" className="hover:text-[#E30613] transition"><FiTwitter /></a>
              <a href="#" className="hover:text-[#E30613] transition"><FiLinkedin /></a>
              <a href="#" className="hover:text-[#E30613] transition"><FiYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} ExxonMobil Nigeria Retirees Club. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <NavLink to="/privacy" className="hover:text-white transition">Privacy Policy</NavLink>
              <NavLink to="/terms" className="hover:text-white transition">Terms of Use</NavLink>
              <NavLink to="/accessibility" className="hover:text-white transition">Accessibility</NavLink>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Fixed) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#001F5B] border-t border-gray-700 z-40">
        <div className="flex justify-around items-center py-3">
          <NavLink to="/" className="flex flex-col items-center text-white">
            <FiMapPin className="text-xl" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink to="/benefits" className="flex flex-col items-center text-white">
            <FiHeart className="text-xl" />
            <span className="text-xs mt-1">Benefits</span>
          </NavLink>
          <NavLink to="/news" className="flex flex-col items-center text-white">
            <FiBell className="text-xl" />
            <span className="text-xs mt-1">News</span>
          </NavLink>
          <NavLink to="/support" className="flex flex-col items-center text-white">
            <FiPhone className="text-xl" />
            <span className="text-xs mt-1">Support</span>
          </NavLink>
          <NavLink to="/dashboard" className="flex flex-col items-center text-white">
            <FiUser className="text-xl" />
            <span className="text-xs mt-1">Account</span>
          </NavLink>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-6 bg-[#E30613] text-white p-4 rounded-full shadow-2xl hover:bg-[#c20511] transition z-50 lg:bottom-8"
        aria-label="Back to top"
      >
        <FiChevronUp className="text-2xl" />
      </button>
    </>
  );
};

export default Footer;