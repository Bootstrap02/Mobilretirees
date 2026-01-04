// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import exxonLogo from '../assets/exxonmobil-logo-white.jpg'; // White logo on transparent

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isLoggedIn = !!userData;

  // Scroll effect: shrink header + add shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.clear(); // Or selectively clear
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Desktop Header */}
<header className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
  scrolled 
    ? 'bg-white shadow-lg py-3' 
    : 'bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] py-5'
}`}>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/">
              <img 
                src={exxonLogo} 
                alt="ExxonMobil Nigeria Retirees" 
                className="h-12 md:h-14 drop-shadow-md transition-all"
              />
            </NavLink>
            <div className="ml-4 hidden lg:block">
              <h1 className={`font-bold text-lg tracking-tight ${scrolled ? 'text-[#001F5B]' : 'text-white'}`}>
                Retirees Portal
              </h1>
              <p className={`text-xs ${scrolled ? 'text-[#E30613]' : 'text-gray-200'} opacity-90`}>
                Welcome Home, Family
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition ${scrolled || isActive ? 'text-[#E30613]' : 'text-white'} hover:text-[#E30613]`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/benefits" 
              className={({ isActive }) => 
                `font-medium transition ${scrolled || isActive ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613]`
              }
            >
              Benefits
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                `font-medium transition ${scrolled || isActive ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613]`
              }
            >
              Resources
            </NavLink>
            <NavLink 
              to="/newsevents" 
              className={({ isActive }) => 
                `font-medium transition ${scrolled || isActive ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613]`
              }
            >
              News & Events
            </NavLink>
            <NavLink 
              to="/support" 
              className={({ isActive }) => 
                `font-medium transition ${scrolled || isActive ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613]`
              }
            >
              Support
            </NavLink>
          </nav>

          {/* Right Side: Auth + Icons */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="relative">
              <FiBell className={`text-2xl ${scrolled ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613] transition`} />
              <span className="absolute -top-1 -right-1 bg-[#E30613] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 bg-[#E30613] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#c20511] transition shadow-md"
                >
                  <FiUser /> My Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:text-[#E30613] transition"
                >
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/signin')}
                  className="px-6 py-2.5 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-[#001F5B] transition"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-6 py-2.5 bg-[#E30613] text-white rounded-full font-medium hover:bg-[#c20511] transition shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#001F5B] z-40 lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <NavLink to="/">
            <img src={exxonLogo} alt="ExxonMobil" className="h-11" />
          </NavLink>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-3xl"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#001F5B] z-50 pt-20 px-6">
            <nav className="space-y-6 text-xl">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block text-white py-3 border-b border-gray-700">
                Home
              </NavLink>
              <NavLink to="/benefits" onClick={() => setMobileMenuOpen(false)} className="block text-white py-3 border-b border-gray-700">
                Benefits
              </NavLink>
              <NavLink to="/resources" onClick={() => setMobileMenuOpen(false)} className="block text-white py-3 border-b border-gray-700">
                Resources
              </NavLink>
              <NavLink to="/newsevents" onClick={() => setMobileMenuOpen(false)} className="block text-white py-3 border-b border-gray-700">
                News & Events
              </NavLink>
              <NavLink to="/support" onClick={() => setMobileMenuOpen(false)} className="block text-white py-3 border-b border-gray-700">
                Support
              </NavLink>

              <div className="pt-8 space-y-4">
                {isLoggedIn ? (
                  <>
                    <button className="w-full bg-[#E30613] text-white py-4 rounded-xl font-bold text-lg">
                      My Dashboard
                    </button>
                    <button onClick={handleLogout} className="w-full text-white py-3 text-center border border-white rounded-xl">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate('/signin'); setMobileMenuOpen(false); }} className="w-full bg-white text-[#001F5B] py-4 rounded-xl font-bold text-lg">
                      Sign In
                    </button>
                    <button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }} className="w-full bg-[#E30613] text-white py-4 rounded-xl font-bold text-lg">
                      Register
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Header;
// components/Header.jsx — FINAL & FIXED
// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
// import exxonLogo from '../assets/exxonmobil-logo-white.jpg';

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const userData = JSON.parse(localStorage.getItem('userData'));
//   const isLoggedIn = !!userData;

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//     window.location.reload();
//   };

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/benefits", label: "Benefits" },
//     { to: "/resources", label: "Resources" },
//     { to: "/newsevents", label: "News & Events" },
//     { to: "/community", label: "Giving Back" },
//     { to: "/spotlight", label: "Retiree Spotlight" },
//     { to: "/support", label: "Support" },
//   ];

//   return (
//     <>
//       {/* Desktop Header */}
//       <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled ? 'bg-white shadow-2xl py-3' : 'bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] py-5'
//       }`}>
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <NavLink to="/" className="flex items-center gap-4 group">
//             <img src={exxonLogo} alt="EMRAN" className="h-14 transition-transform group-hover:scale-110" />
//             <div>
//               <h1 className={`font-bold text-2xl ${scrolled ? 'text-[#001F5B]' : 'text-white'}`}>
//                 EMRAN
//               </h1>
//               <p className={`text-sm ${scrolled ? 'text-[#E30613]' : 'text-gray-200'}`}>Retirees Portal</p>
//             </div>
//           </NavLink>

//           <nav className="flex items-center space-x-10">
//             {navLinks.map(link => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `font-medium text-lg transition-all hover:text-[#E30613] ${
//                     isActive ? 'text-[#E30613] font-bold underline decoration-2' : scrolled ? 'text-[#001F5B]' : 'text-white'
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="flex items-center gap-6">
//             <button className="relative">
//               <FiBell className={`text-2xl ${scrolled ? 'text-[#001F5B]' : 'text-white'} hover:text-[#E30613]`} />
//               <span className="absolute -top-1 -right-1 bg-[#E30613] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                 3
//               </span>
//             </button>

//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">
//                 <button 
//                   onClick={() => navigate('/dashboard')}
//                   className="flex items-center gap-2 bg-[#E30613] hover:bg-[#c20511] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-[#E30613]/50 transition transform hover:scale-105"
//                 >
//                   <FiUser /> Dashboard
//                 </button>
//                 <button onClick={handleLogout} className="text-white hover:text-[#E30613]">
//                   <FiLogOut className="text-2xl" />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex gap-4">
//                 <NavLink to="/signin" className="px-6 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#001F5B] transition">
//                   Sign In
//                 </NavLink>
//                 <NavLink to="/signup" className="px-6 py-3 bg-[#E30613] hover:bg-[#c20511] text-white rounded-full font-bold shadow-lg transition transform hover:scale-105">
//                   Join EMRAN
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Header */}
//       <header className="fixed top-0 left-0 right-0 bg-[#001F5B] z-50 lg:hidden shadow-lg">
//         <div className="flex items-center justify-between px-5 py-4">
//           <NavLink to="/">
//             <img src={exxonLogo} alt="EMRAN" className="h-12" />
//           </NavLink>
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-3xl">
//             {mobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {mobileMenuOpen && (
//           <div className="fixed inset-0 bg-[#001F5B] z-50 pt-20 px-6 overflow-y-auto">
//             <nav className="space-y-4 pb-20">
//               {navLinks.map(link => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block text-white text-xl font-medium py-4 border-b border-gray-700 hover:text-[#E30613]"
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}

//               <div className="pt-8 space-y-4">
//                 {isLoggedIn ? (
//                   <>
//                     <button 
//                       onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
//                       className="w-full bg-[#E30613] text-white py-5 rounded-xl font-bold text-xl"
//                     >
//                       My Dashboard
//                     </button>
//                     <button onClick={handleLogout} className="w-full bg-white text-[#001F5B] py-5 rounded-xl font-bold text-xl">
//                       Sign Out
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => { navigate('/signin'); setMobileMenuOpen(false); }} className="w-full bg-white text-[#001F5B] py-5 rounded-xl font-bold text-xl">
//                       Sign In
//                     </button>
//                     <button onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }} className="w-full bg-[#E30613] text-white py-5 rounded-xl font-bold text-xl">
//                       Join EMRAN
//                     </button>
//                   </>
//                 )}
//               </div>
//             </nav>
//           </div>
//         )}
//       </header>

//       <div className="h-20 lg:h-24"></div>
//     </>
//   );
// };

// export default Header;