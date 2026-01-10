// pages/Profile.jsx — FINAL WITH PASSWORD CHANGE, PRE-FILLED FIELDS & FANCY UI
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  FiUser, FiMail, FiPhone, FiHome, FiCamera, FiSave, FiTrash2, FiAlertTriangle, 
  FiLock, FiEye, FiEyeOff 
} from 'react-icons/fi';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    staffId: 'N/A',
    retirementYear: 'N/A',
    profilePhoto: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) {
      navigate('/signin');
      return;
    }

    const initialData = {
      fullname: stored.user.fullname || '',
      email: stored.user.email || '',
      phone: stored.user.phone || '',
      address: stored.user.address || '',
      staffId: stored.user.id || 'N/A',
      retirementYear: stored.user.retirementYear || 'N/A',
      profilePhoto: stored.user.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=256`
    };

    setFormData(initialData);
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
  };

  const handleSaveProfile = () => {
    setSaving(true);
    // Simulate save (replace with real API)
    setTimeout(() => {
      localStorage.setItem('userData', JSON.stringify({ ...JSON.parse(localStorage.getItem('userData')), ...formData }));
      alert('Profile updated successfully!');
      setSaving(false);
    }, 1200);
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    // Simulate API call for password change
    setTimeout(() => {
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  const handleDelete = () => {
    localStorage.removeItem('userData');
    alert('Account deleted successfully.');
    navigate('/signin');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl text-[#001F5B]">Loading...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Premium Header */}
          <div className="relative bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-12 mb-16 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(227,6,19,0.4),transparent)]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                My Profile
              </h1>
              <p className="text-2xl opacity-90">
                Update your details, change password, and manage your EMRAN account
              </p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 relative">
            {/* Centered Avatar */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={formData.profilePhoto}
                  alt={formData.fullname}
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-8 border-white shadow-2xl ring-4 ring-[#E30613]/40"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullname)}&background=001F5B&color=fff&size=256`}
                />
                <button className="absolute bottom-2 right-2 bg-[#E30613] p-4 rounded-full text-white shadow-lg hover:bg-[#c20511] transition">
                  <FiCamera className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="pt-40">
              <h2 className="text-5xl font-extrabold text-[#001F5B] text-center mb-12">
                {formData.fullname}
              </h2>

              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiUser className="text-[#E30613] text-xl" /> Full Name
                  </label>
                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiMail className="text-[#E30613] text-xl" /> Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiPhone className="text-[#E30613] text-xl" /> Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiHome className="text-[#E30613] text-xl" /> Residential Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition shadow-sm"
                  />
                </div>

                {/* Read-only */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Staff ID</label>
                  <div className="w-full px-6 py-5 bg-gray-100 border-2 border-gray-200 rounded-2xl text-xl text-gray-700">
                    {formData.staffId}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Retirement Year</label>
                  <div className="w-full px-6 py-5 bg-gray-100 border-2 border-gray-200 rounded-2xl text-xl text-gray-700">
                    {formData.retirementYear}
                  </div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="mt-16 pt-12 border-t-2 border-gray-200">
                <h3 className="text-3xl font-bold text-[#001F5B] mb-10 text-center">
                  Change Password
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiLock className="text-[#E30613] text-xl" /> Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] pr-12"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E30613]"
                      >
                        {showCurrentPass ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiLock className="text-[#E30613] text-xl" /> New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] pr-12"
                        placeholder="New password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E30613]"
                      >
                        {showNewPass ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiLock className="text-[#E30613] text-xl" /> Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl text-xl focus:border-[#E30613] pr-12"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E30613]"
                      >
                        {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {passwordError && (
                  <p className="text-red-600 text-center mt-6 font-medium text-lg">{passwordError}</p>
                )}

                <div className="mt-12 text-center">
                  <button
                    onClick={handleChangePassword}
                    className="bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-xl px-16 py-6 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center gap-4 mx-auto"
                  >
                    <FiLock className="text-2xl" />
                    Change Password
                  </button>
                </div>
              </div>

              {/* Save & Delete */}
              <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-[#E30613] to-[#c20511] hover:from-[#c20511] hover:to-[#E30613] text-white font-bold text-2xl py-6 px-12 rounded-2xl shadow-2xl transition transform hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-4"
                >
                  <FiSave className="text-3xl" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-2xl py-6 px-12 rounded-2xl shadow-2xl transition transform hover:scale-105 flex items-center justify-center gap-4"
                >
                  <FiTrash2 className="text-3xl" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl">
                <div className="text-center mb-8">
                  <FiAlertTriangle className="text-8xl text-red-600 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-[#001F5B] mb-4">Delete Account?</h3>
                  <p className="text-xl text-gray-700 mb-8">
                    This action is **permanent** and cannot be undone. All your data will be removed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-5 rounded-2xl transition text-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl transition text-xl shadow-lg"
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Back */}
          <div className="text-center mt-16">
            <NavLink
              to="/dashboard"
              className="inline-flex items-center gap-4 bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl transition transform hover:scale-110"
            >
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

};

export default Profile;