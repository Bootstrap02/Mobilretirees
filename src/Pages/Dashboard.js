
// pages/Dashboard.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import NotificationsList from '../Components/Notificationslist';
import { FiUser, FiLogOut, FiDollarSign, FiBell, FiCalendar, FiFileText } from 'react-icons/fi';

// PDF and asset paths — using public folder paths instead of imports
// This prevents Safari from crashing on asset imports that may not exist
const DOCS = {
  constitution:      '/assets/emran-constitution.pdf',
  rules:             '/assets/emran-rules.pdf',
  association:       '/assets/emran-association.pdf',
  agm:               '/assets/agm2026.pdf',
  executives:        '/assets/executives.pdf',
  whatsapp_penalties:'/assets/whatsapp_penalties.pdf',
  whatsapp_rules:    '/assets/whatsapp_rules.pdf',
  cacCertificate:    '/assets/cac-certificate.jpg',
};

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────────────────────── */
const NOTIF_KEY = 'emran_notif_permission';
const PUSH_BASE = 'https://campusbuy-backend-nkmx.onrender.com/mobilcreatenotifications';

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const isPWA = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  !!window.navigator.standalone;

/* ─────────────────────────────────────────────────────────────────
   PUSH SUBSCRIPTION REGISTRATION
   Completely standalone function — no React hooks inside.
   Saves a PushSubscription to MongoDB so the backend can push
   to this specific browser at any time, even when it's closed.
────────────────────────────────────────────────────────────────── */
const registerPushSubscription = async (userId, log) => {
  const L = log || console.log;
  try {
    if (!('serviceWorker' in navigator)) {
      L('serviceWorker not supported in this browser');
      return false;
    }

    // Register the SW. It MUST be at /emran-sw.js in the /public folder.
    // If your build puts it elsewhere this will 404 silently.
    L('Registering service worker...');
    let reg;
    try {
      reg = await navigator.serviceWorker.register('/emran-sw.js');
    } catch (e) {
      L('SW register failed: ' + e.message +
        ' — ensure emran-sw.js is in /public and deployed');
      return false;
    }

    await navigator.serviceWorker.ready;
    L('SW ready ✓');

    // Fetch VAPID key from backend
    L('Fetching VAPID key...');
    let publicKey;
    try {
      const r = await fetch(`${PUSH_BASE}/push/vapid-key`);
      if (!r.ok) {
        L('VAPID fetch HTTP ' + r.status +
          ' — check route order in notificationRoutes.js and that VAPID_PUBLIC_KEY is set in .env');
        return false;
      }
      const json = await r.json();
      publicKey = json.publicKey;
      if (!publicKey) {
        L('VAPID_PUBLIC_KEY missing from server .env');
        return false;
      }
    } catch (e) {
      L('VAPID fetch error: ' + e.message);
      return false;
    }
    L('VAPID key received ✓');

    // Subscribe to push service (Google FCM / Mozilla / Apple)
    L('Subscribing to push service...');
    const toUint8 = (b64) => {
      const pad = '='.repeat((4 - b64.length % 4) % 4);
      const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
      return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
    };
    let sub;
    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: toUint8(publicKey),
      });
    } catch (e) {
      L('pushManager.subscribe failed: ' + e.message +
        ' — VAPID key mismatch or site not on HTTPS');
      return false;
    }
    L('Push subscribed ✓ endpoint: ' + sub.endpoint.slice(0, 50) + '...');

    // Save to MongoDB via backend
    L('Saving subscription to database...');
    try {
      const r = await fetch(`${PUSH_BASE}/push/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub, userId: userId || null }),
      });
      if (!r.ok) {
        L('Save subscription HTTP ' + r.status);
        return false;
      }
    } catch (e) {
      L('Save subscription error: ' + e.message);
      return false;
    }

    L('✅ Push subscription saved to DB — this browser will receive notifications');
    return true;
  } catch (e) {
    L('Unexpected error: ' + e.message);
    return false;
  }
};

/* ─────────────────────────────────────────────────────────────────
   DASHBOARD
────────────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const navigate = useNavigate();

  const [user,             setUser]             = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [allNotifications, setAllNotifications] = useState([]);
  const [showList,         setShowList]         = useState(false);
  const [news,             setNews]             = useState(0);

  // Push UI state
  const [showModal,    setShowModal]    = useState(false);
  const [showIOSTip,   setShowIOSTip]   = useState(false);
  const [notifBlocked, setNotifBlocked] = useState(false);

  // Diagnostic log — stored in a ref so it never triggers re-renders
  const diagRef = useRef([]);
  const [diagVisible, setDiagVisible] = useState(false);
  const [diagLines,   setDiagLines]   = useState([]);

  const log = useCallback((msg) => {
    console.log('[Push]', msg);
    diagRef.current = [...diagRef.current.slice(-12), msg];
    setDiagLines([...diagRef.current]);
  }, []);

  /* ── Load user data ── */
  useEffect(() => {
    const stored     = JSON.parse(localStorage.getItem('userData'));
    const notifData  = JSON.parse(localStorage.getItem('notifications')) || [];
    const newsevents = JSON.parse(localStorage.getItem('newsevents'))    || [];

    setAllNotifications(notifData);
    setNews(newsevents.length);

    if (!stored) { navigate('/signin'); return; }

    setUser({
      fullname:           stored.fullname      || 'EMRAN Member',
      email:              stored.email         || '',
      staffId:            stored._id           || 'N/A',
      dateOfRetirement:   stored.dateOfRetirement || 'N/A',
      profilePhoto:       stored.image?.[0]    ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=128`,
      duesStatus:         (() => {
        // Compute from actual dues Map — never fall back to 'Pending Verification'
        const currentYear = new Date().getFullYear().toString();
        const dues = stored.dues || {};
        const currentDues = dues[currentYear];
        if (currentDues?.payment === true) {
          return `Dues Paid (${currentYear})`;
        }
        // Check if any year is paid
        const paidYears = Object.entries(dues)
          .filter(([, d]) => d?.payment === true)
          .map(([y]) => y)
          .sort()
          .reverse();
        if (paidYears.length > 0) {
          return `Dues Paid (${paidYears[0]})`;
        }
        return 'Dues Unpaid';
      })(),
      notificationsCount: notifData.length,
      role:               stored.role          || 'member',
    });

    setLoading(false);
  }, [navigate]);

  /* ── Push eligibility check — runs once after user loads ──
     IMPORTANT: dependency array is [loading] only.
     Do NOT add `log` here — useCallback recreates it on every
     render which would cause this effect to loop infinitely,
     preventing setShowModal(true) from ever settling.          */
  useEffect(() => {
    if (loading) return;

    const stored  = JSON.parse(localStorage.getItem('userData'));
    const userId  = stored?._id || null;
    const flag    = localStorage.getItem(NOTIF_KEY);

    log('Checking push eligibility...');
    log('Browser Notification.permission: ' + (('Notification' in window) ? Notification.permission : 'unsupported'));
    log('localStorage flag: ' + (flag || 'none'));

    // No Notification API — very old browser or some embedded webviews
    if (!('Notification' in window)) {
      log('Notification API not available — skip');
      return;
    }

    // Already granted at OS level
    if (Notification.permission === 'granted') {
      log('Already granted — silently re-subscribing to ensure DB record exists');
      localStorage.setItem(NOTIF_KEY, 'granted');
      registerPushSubscription(userId, log);
      return;
    }

    // Blocked at OS level — user clicked "Block" on the browser prompt
    if (Notification.permission === 'denied') {
      log('Blocked at OS level — showing hint strip');
      localStorage.setItem(NOTIF_KEY, 'denied');
      setNotifBlocked(true);
      return;
    }

    // permission === 'default' from here on (never asked, or browser reset)

    // iOS plain Safari — needs PWA install first
    // Delay the tip by 2 seconds so the dashboard renders fully first
    // This prevents the white-screen effect on iPhone
    if (isIOS() && !isPWA()) {
      log('iOS plain Safari — will show Add to Home Screen tip after delay');
      if (flag !== 'ios_pwa_pending') {
        setTimeout(() => setShowIOSTip(true), 2000);
      }
      return;
    }

    // All clear — show EMRAN styled permission modal
    log('Showing notification permission modal');
    setShowModal(true);

  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── User clicks Allow ── */
  const handleAllow = useCallback(async () => {
    setShowModal(false);
    log('User clicked Allow — requesting OS permission...');

    const permission = await Notification.requestPermission();
    log('OS permission result: ' + permission);
    localStorage.setItem(NOTIF_KEY, permission);

    if (permission === 'granted') {
      // Immediate local notification so user sees it worked right away
      new Notification('EMRAN Portal 🔔', {
        body: 'Notifications enabled! You will be notified of all EMRAN updates.',
        icon: '/emran-icon.png',
      });
      const stored = JSON.parse(localStorage.getItem('userData'));
      await registerPushSubscription(stored?._id, log);
    } else {
      log('User blocked at OS level');
      setNotifBlocked(permission === 'denied');
    }
  }, [log]);

  /* ── User clicks Not Now — does NOT write to localStorage
     so the modal returns on next dashboard visit ── */
  const handleDeny = useCallback(() => {
    setShowModal(false);
    log('User chose Not Now — will ask again next visit');
  }, [log]);

  const handleDismissIOS = useCallback(() => {
    setShowIOSTip(false);
    localStorage.setItem(NOTIF_KEY, 'ios_pwa_pending');
  }, []);

  const openElections = () => {
    if (!user?.staffId) { alert('User ID not found. Please login again.'); return; }
    window.open(
      `https://emranelections.site/user/ballot.php?id=${user.staffId}&role=${user.role || 'member'}&email=${user.email}`,
      '_blank', 'noopener,noreferrer'
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-2xl text-[#001F5B]">Loading your dashboard...</div>
    </div>
  );

  return (
    <>
      <Header />

      {/* ══ NOTIFICATION PERMISSION MODAL ══════════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 bg-[#E30613]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiBell className="text-4xl text-[#E30613]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#001F5B] mb-2">Stay in the loop</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              EMRAN would like to send you browser notifications for new announcements,
              welfare updates, news events, and important alerts — even when you're
              not on the site.
            </p>
            <button onClick={handleAllow}
              className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-3 rounded-xl text-sm transition mb-3">
              Allow Notifications
            </button>
            <button onClick={handleDeny}
              className="w-full border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-3 rounded-xl text-sm transition">
              Not now
            </button>
          </div>
        </div>
      )}

      {/* ══ iOS ADD TO HOME SCREEN TIP ════════════════════════════ */}
      {showIOSTip && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto p-6 text-center">
            <span className="text-4xl">📲</span>
            <h2 className="text-lg font-extrabold text-[#001F5B] mt-3 mb-1">
              Enable notifications on iPhone
            </h2>
            <p className="text-gray-500 text-xs mb-3">
              Safari on iPhone requires the site to be installed as an app first:
            </p>
            <ol className="text-left text-xs text-gray-600 space-y-1.5 my-3 bg-gray-50 rounded-2xl px-4 py-3">
              <li><b className="text-[#001F5B]">1.</b> Tap the <b>Share</b> icon at the bottom of Safari</li>
              <li><b className="text-[#001F5B]">2.</b> Tap <b>"Add to Home Screen"</b></li>
              <li><b className="text-[#001F5B]">3.</b> Open EMRAN from your Home Screen</li>
            </ol>
            <p className="text-xs text-gray-400 mb-4">Requires iOS 16.4 or later</p>
            <button onClick={handleDismissIOS}
              className="w-full bg-[#001F5B] text-white font-bold py-3 rounded-xl text-sm">
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ══ DIAGNOSTIC PANEL — remove after push confirmed working ══ */}
          <div className="mb-4">
            <button
              onClick={() => setDiagVisible(v => !v)}
              className="text-xs text-gray-400 underline"
            >
              {diagVisible ? 'Hide' : 'Show'} push diagnostics
            </button>
            {diagVisible && diagLines.length > 0 && (
              <div className="mt-2 bg-gray-900 rounded-2xl p-4 font-mono text-xs">
                {diagLines.map((l, i) => (
                  <div key={i} className={
                    l.includes('✅') ? 'text-green-400' :
                    l.includes('failed') || l.includes('error') || l.includes('Error') ? 'text-red-400' :
                    l.includes('✓') ? 'text-green-300' :
                    'text-gray-300'
                  }>{l}</div>
                ))}
              </div>
            )}
          </div>

          {/* Welcome Banner - Desktop */}
          <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <img src={user.profilePhoto} alt={user.fullname}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  onError={e => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`} />
                <div>
                  <h1 className="text-4xl font-bold">Welcome, {user.fullname}</h1>
                  <p className="text-xl opacity-90 mt-2">
                    {user.staffId !== 'N/A' && `Staff ID: ${user.staffId} • `}
                    Retired {user.dateOfRetirement !== 'N/A' ? user.dateOfRetirement : 'Member'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink to={`/profile/${user.staffId}`}
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center">
                  <FiUser className="text-2xl" /> My Profile
                </NavLink>
                <button onClick={() => { localStorage.removeItem('userData'); navigate('/signin'); }}
                  className="bg-red-600/80 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-3 justify-center">
                  <FiLogOut className="text-2xl" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Banner - Mobile */}
          <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <img src={user.profilePhoto} alt={user.fullname}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/80 shadow-lg"
                  onError={e => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=001F5B&color=fff&size=128`} />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user.fullname}</h1>
                  <p className="text-base sm:text-lg opacity-90 mt-1">
                    {user.staffId !== 'N/A' && `Staff ID: ${user.staffId} • `}
                    Retired {user.dateOfRetirement !== 'N/A' ? user.dateOfRetirement : 'Member'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <NavLink to={`/profile/${user.staffId}`}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none">
                  <FiUser className="text-xl" /> My Profile
                </NavLink>
                <button onClick={() => { localStorage.removeItem('userData'); navigate('/signin'); }}
                  className="bg-red-600/80 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 flex-1 sm:flex-none">
                  <FiLogOut className="text-xl" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Quick Status Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiDollarSign className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Dues Status</h3>
              <p className={`text-xl font-medium ${user.duesStatus.includes('Paid') ? 'text-green-600' : 'text-red-500'}`}>
                {user.duesStatus}
              </p>
              <NavLink to="/dues" className="text-[#E30613] font-bold mt-4 block hover:underline">
                View Details →
              </NavLink>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiBell className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Notifications</h3>
              <p className="text-3xl font-bold text-gray-800">{user.notificationsCount}</p>
              <button onClick={() => setShowList(true)}
                className="text-[#E30613] font-bold mt-4 block hover:underline">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiFileText className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Elections</h3>
              <p className="text-lg text-gray-600 mb-6">Cast your vote or view results</p>
              <button onClick={openElections}
                className="bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-lg px-10 py-4 rounded-2xl transition transform hover:scale-105 w-full">
                Go to Elections →
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <FiCalendar className="text-6xl text-[#E30613] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-2">Upcoming Events</h3>
              <p className="text-3xl font-bold text-gray-800">{news}</p>
              <NavLink to="/newsevents" className="text-[#E30613] font-bold mt-4 block hover:underline">
                See Calendar →
              </NavLink>
            </div>
          </div>

          {/* Blocked notification hint */}
          {notifBlocked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3 text-sm text-yellow-800">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <p>
                Browser notifications are blocked. To re-enable: click the lock icon
                in your browser address bar → <strong>Notifications</strong> → set to <strong>Allow</strong>,
                then refresh the page.
              </p>
            </div>
          )}

          {/* Documents Card — links to dedicated Documents page */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 hover:shadow-2xl transition flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ borderTop: '8px solid #001F5B' }}>
            <div className="flex items-center gap-5">
              <FiFileText className="text-6xl text-[#001F5B] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-[#001F5B] mb-1">EMRAN Documents</h3>
                <p className="text-gray-500 text-base">
                  Access all official EMRAN documents — Constitution, Articles of Association,
                  Rules and Regulations, AGM records, WhatsApp guidelines and more.
                </p>
              </div>
            </div>
            <NavLink to="/documents"
              className="flex-shrink-0 bg-[#001F5B] hover:bg-[#0A3D6B] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg transition transform hover:scale-105 whitespace-nowrap">
              View Documents →
            </NavLink>
          </div>

          {/* Support Section Desktop */}
          <div className="max-lg:hidden bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl font-bold mb-6">Need Assistance?</h3>
            <p className="text-2xl mb-8 opacity-90">Our team is available 24/7 for your pension, health, dues, and membership queries.</p>
            <a href="tel:+2349069412463"
              className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-3xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110 mb-8">
              Call +234 906 941 2463
            </a>
            <p className="text-xl opacity-90">Or email: <a href="mailto:emranannuitants@gmail.com" className="text-[#E30613] hover:text-white underline">emranannuitants@gmail.com</a></p>
          </div>

          {/* Support Section Mobile */}
          <div className="hidden max-lg:block bg-gradient-to-r from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 text-center shadow-2xl mt-8">
            <h3 className="text-3xl font-bold mb-6">Need Assistance?</h3>
            <p className="text-xl mb-8 opacity-90">Our team is available 24/7 for your pension, health, dues, and membership queries.</p>
            <a href="tel:+2349069412463"
              className="inline-block bg-[#E30613] hover:bg-[#c20511] text-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl transition transform hover:scale-110 mb-6">
              Call +234 906 941 2463
            </a>
            <p className="text-lg opacity-90">Or email: <a href="mailto:emranannuitants@gmail.com" className="text-[#E30613] hover:text-white underline">emranannuitants@gmail.com</a></p>
          </div>

        </div>
      </div>

      {showList && (
        <NotificationsList
          isOpen={() => setShowList(true)}
          onClose={() => setShowList(false)}
          notifications={allNotifications}
        />
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
