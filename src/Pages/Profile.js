// pages/Profile.jsx — EXPANDED WITH ALL USER SCHEMA FIELDS
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import {
  FiUser, FiMail, FiPhone, FiHome, FiCamera, FiSave, FiTrash2, FiAlertTriangle,
  FiLock, FiEye, FiEyeOff, FiBriefcase, FiMapPin, FiCalendar, FiUsers, FiHeart
} from 'react-icons/fi';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// ── Reusable section header ─────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-gray-100">
    <div className="w-12 h-12 rounded-2xl bg-[#E30613]/10 flex items-center justify-center flex-shrink-0">
      <Icon className="text-[#E30613] text-2xl" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#001F5B]">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// ── Reusable labelled input ─────────────────────────────────────────────────
const Field = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
      {Icon && <Icon className="text-[#E30613]" />}
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-base focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 transition shadow-sm bg-white";
const readOnlyCls =
  "w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-base text-gray-600 cursor-not-allowed";
const selectCls =
  "w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-base focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 transition shadow-sm bg-white appearance-none";

// ── Phone wrapper for consistent styling ───────────────────────────────────
const PhoneField = ({ value, onChange }) => (
  <PhoneInput
    country="ng"
    value={value?.replace('+', '') || ''}
    onChange={(phone) => onChange(`+${phone}`)}
    containerStyle={{ width: '100%' }}
    inputStyle={{
      width: '100%', padding: '16px', paddingLeft: '60px',
      borderRadius: '16px', border: '2px solid #e5e7eb',
      outline: 'none', fontSize: '16px', height: '56px'
    }}
    buttonStyle={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px' }}
  />
);

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    // Basic
    fullname: '', email: '', phone: '', address: '',
    // Read-only
    staffId: 'N/A', dateOfRetirement: 'N/A', profilePhoto: '',
    // Retirement info
    companyAtRetirement: '', locationOfRetirement: '', departmentOfRetirement: '',
    // Spouse
    spouse: '', spousePhone: '',
    // Next of Kin
    nextOfKin: '', nextOfKinEmail: '', nextOfKinPhone: '',
    // Beneficiary
    beneficiary: '', beneficiaryEmail: '', beneficiaryPhone: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }

    let formattedDate = 'N/A';
    if (stored.dateOfRetirement) {
      const d = new Date(stored.dateOfRetirement);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    }

    setFormData({
      fullname: stored.fullname || '',
      email: stored.email || '',
      phone: stored.phone || '',
      address: stored.address || '',
      staffId: stored._id || 'N/A',
      dateOfRetirement: formattedDate,
      profilePhoto: stored.image?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(stored.fullname || 'U')}&background=001F5B&color=fff&size=256`,
      companyAtRetirement: stored.companyAtRetirement || '',
      locationOfRetirement: stored.locationOfRetirement || '',
      departmentOfRetirement: stored.departmentOfRetirement || '',
      spouse: stored.spouse || '',
      spousePhone: stored.spousePhone || '',
      nextOfKin: stored.nextOfKin || '',
      nextOfKinEmail: stored.nextOfKinEmail || '',
      nextOfKinPhone: stored.nextOfKinPhone || '',
      beneficiary: stored.beneficiary || '',
      beneficiaryEmail: stored.beneficiaryEmail || '',
      beneficiaryPhone: stored.beneficiaryPhone || '',
    });
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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowed.includes(file.type)) { setUploadError('Only JPG, JPEG, PNG, SVG allowed'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Image too large (max 5MB)'); return; }
    setUploadError('');
    setSelectedImage(file);
    setFormData(prev => ({ ...prev, profilePhoto: URL.createObjectURL(file) }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setUploadError('');
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData._id;

      await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/profile/${userId}`,
        {
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          companyAtRetirement: formData.companyAtRetirement,
          locationOfRetirement: formData.locationOfRetirement,
          departmentOfRetirement: formData.departmentOfRetirement,
          spouse: formData.spouse,
          spousePhone: formData.spousePhone,
          nextOfKin: formData.nextOfKin,
          nextOfKinEmail: formData.nextOfKinEmail,
          nextOfKinPhone: formData.nextOfKinPhone,
          beneficiary: formData.beneficiary,
          beneficiaryEmail: formData.beneficiaryEmail,
          beneficiaryPhone: formData.beneficiaryPhone,
        }
      );

      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append('images', selectedImage);
        await axios.put(
          `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/upload-fortune-image/${userId}`,
          imageFormData,
        );
      }

      const updatedUser = { ...userData, ...formData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setSelectedImage(null);
    } catch (err) {
      alert('Failed to update profile: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All password fields are required'); return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match'); return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters'); return;
    }
    setSaving(true);
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData._id;
      if (!userId) throw new Error('User ID not found. Please login again.');
      const response = await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/change-password/${userId}`,
        { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }
      );
      alert(response.data.message || 'Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to change password';
      if (err.response?.status === 401) {
        setPasswordError('Session expired. Please login again.');
        localStorage.removeItem('userData'); localStorage.removeItem('token');
        navigate('/signin');
      } else { setPasswordError(errorMsg); }
    } finally { setSaving(false); }
  };

  const handleDelete = () => {
    localStorage.removeItem('userData');
    alert('Account deleted successfully.');
    navigate('/signin');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl text-[#001F5B]">Loading...</div>;

  // ── Shared card sections ─────────────────────────────────────────────────
  const ProfileContent = () => (
    <div>
      {/* Save success banner */}
      {saveSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-semibold text-lg animate-bounce">
          ✓ Profile saved successfully!
        </div>
      )}

      {/* ── SECTION 1: Basic Info ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiUser} title="Personal Information" subtitle="Update your basic contact details" />
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Full Name" icon={FiUser}>
            <input name="fullname" value={formData.fullname} onChange={handleChange} className={inputCls} />
          </Field>
          <Field label="Email Address" icon={FiMail}>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputCls} />
          </Field>
          <Field label="Phone Number" icon={FiPhone}>
            <PhoneField value={formData.phone} onChange={(v) => setFormData(p => ({ ...p, phone: v }))} />
          </Field>
          <Field label="Residential Address" icon={FiHome}>
            <input name="address" value={formData.address} onChange={handleChange} className={inputCls} />
          </Field>
          <Field label="Staff ID">
            <div className={readOnlyCls}>{formData.staffId}</div>
          </Field>
          <Field label="Date of Retirement" icon={FiCalendar}>
            <div className={readOnlyCls}>{formData.dateOfRetirement}</div>
          </Field>
        </div>
      </div>

      {/* ── SECTION 2: Retirement Info ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiBriefcase} title="Retirement Details" subtitle="Your company and location at retirement" />
        <div className="grid md:grid-cols-3 gap-6">
          <Field label="Company at Retirement" icon={FiBriefcase}>
            <select name="companyAtRetirement" value={formData.companyAtRetirement} onChange={handleChange} className={selectCls}>
              <option value="">Select company</option>
              <option value="MPN">MPN</option>
              <option value="EEPNL">EEPNL</option>
            </select>
          </Field>
          <Field label="Location at Retirement" icon={FiMapPin}>
            <select name="locationOfRetirement" value={formData.locationOfRetirement} onChange={handleChange} className={selectCls}>
              <option value="">Select location</option>
              {['Lagos','QIT/Eket','Port Harcourt/Onne','Bonny','USA','Europe','Asia'].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </Field>
          <Field label="Department at Retirement" icon={FiBriefcase}>
            <input name="departmentOfRetirement" value={formData.departmentOfRetirement} onChange={handleChange}
              placeholder="e.g., Production, Finance..." className={inputCls} />
          </Field>
        </div>
      </div>

      {/* ── SECTION 3: Spouse ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiHeart} title="Spouse Information" subtitle="Your spouse's contact details (if applicable)" />
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Spouse Full Name" icon={FiHeart}>
            <input name="spouse" value={formData.spouse} onChange={handleChange}
              placeholder="Spouse's full name" className={inputCls} />
          </Field>
          <Field label="Spouse Phone Number" icon={FiPhone}>
            <PhoneField value={formData.spousePhone} onChange={(v) => setFormData(p => ({ ...p, spousePhone: v }))} />
          </Field>
        </div>
      </div>

      {/* ── SECTION 4: Next of Kin ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiUsers} title="Next of Kin" subtitle="Emergency contact information" />
        <div className="grid md:grid-cols-3 gap-6">
          <Field label="Full Name" icon={FiUser}>
            <input name="nextOfKin" value={formData.nextOfKin} onChange={handleChange}
              placeholder="Next of kin name" className={inputCls} />
          </Field>
          <Field label="Email Address" icon={FiMail}>
            <input name="nextOfKinEmail" type="email" value={formData.nextOfKinEmail} onChange={handleChange}
              placeholder="next-of-kin@email.com" className={inputCls} />
          </Field>
          <Field label="Phone Number" icon={FiPhone}>
            <PhoneField value={formData.nextOfKinPhone} onChange={(v) => setFormData(p => ({ ...p, nextOfKinPhone: v }))} />
          </Field>
        </div>
      </div>

      {/* ── SECTION 5: Beneficiary ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiUsers} title="Beneficiary" subtitle="Who receives benefits on your behalf" />
        <div className="grid md:grid-cols-3 gap-6">
          <Field label="Full Name" icon={FiUser}>
            <input name="beneficiary" value={formData.beneficiary} onChange={handleChange}
              placeholder="Beneficiary name" className={inputCls} />
          </Field>
          <Field label="Email Address" icon={FiMail}>
            <input name="beneficiaryEmail" type="email" value={formData.beneficiaryEmail} onChange={handleChange}
              placeholder="beneficiary@email.com" className={inputCls} />
          </Field>
          <Field label="Phone Number" icon={FiPhone}>
            <PhoneField value={formData.beneficiaryPhone} onChange={(v) => setFormData(p => ({ ...p, beneficiaryPhone: v }))} />
          </Field>
        </div>
      </div>

      {/* ── SECTION 6: Change Password ── */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <SectionHeader icon={FiLock} title="Change Password" subtitle="Update your account password" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Current Password', name: 'currentPassword', show: showCurrentPass, toggle: () => setShowCurrentPass(p => !p) },
            { label: 'New Password', name: 'newPassword', show: showNewPass, toggle: () => setShowNewPass(p => !p) },
            { label: 'Confirm New Password', name: 'confirmPassword', show: showConfirmPass, toggle: () => setShowConfirmPass(p => !p) },
          ].map(({ label, name, show, toggle }) => (
            <Field key={name} label={label} icon={FiLock}>
              <div className="relative">
                <input type={show ? 'text' : 'password'} name={name}
                  value={passwordData[name]} onChange={handlePasswordChange}
                  className={inputCls + ' pr-12'}
                  placeholder="••••••••" />
                <button type="button" onClick={toggle}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E30613]">
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </Field>
          ))}
        </div>
        {passwordError && (
          <p className="text-red-600 font-medium mt-4 text-center">{passwordError}</p>
        )}
        <div className="mt-6 text-center">
          <button onClick={handleChangePassword} disabled={saving}
            className="bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg transition hover:scale-105 inline-flex items-center gap-3 disabled:opacity-60">
            <FiLock /> Change Password
          </button>
        </div>
      </div>

      {/* ── Save & Delete ── */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={handleSaveProfile} disabled={saving}
          className="flex-1 bg-gradient-to-r from-[#E30613] to-[#c20511] hover:from-[#c20511] hover:to-[#E30613] text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-xl transition hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-3">
          <FiSave className="text-2xl" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
        <button onClick={() => setShowDeleteModal(true)}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-xl py-5 px-10 rounded-2xl shadow-xl transition hover:scale-105 flex items-center justify-center gap-3">
          <FiTrash2 className="text-2xl" /> Delete Account
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">

        {/* ─── DESKTOP ─── */}
        <div className="max-lg:hidden max-w-5xl mx-auto px-6">
          {/* Header banner */}
          <div className="relative bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] text-white rounded-3xl p-10 mb-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(227,6,19,0.4),transparent)]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-5xl font-extrabold mb-3">My Profile</h1>
              <p className="text-xl opacity-90">Manage your EMRAN account details</p>
            </div>
          </div>

          {/* Avatar card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <img src={formData.profilePhoto} alt={formData.fullname}
                  className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl ring-4 ring-[#E30613]/40 group-hover:opacity-80 transition"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullname)}&background=001F5B&color=fff&size=256`} />
                <div className="absolute bottom-1 right-1 bg-[#E30613] p-3 rounded-full text-white shadow-lg hover:bg-[#c20511] transition">
                  <FiCamera className="text-xl" />
                </div>
                <input type="file" ref={fileInputRef} accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                  onChange={handleImageSelect} className="hidden" />
              </div>
              {uploadError && <p className="text-red-600 text-sm mt-2 text-center">{uploadError}</p>}
            </div>
            <div className="pt-28 text-center">
              <h2 className="text-4xl font-extrabold text-[#001F5B] mb-1">{formData.fullname}</h2>
              <p className="text-gray-500 text-lg">EMRAN Member</p>
            </div>
          </div>

          <ProfileContent />

          <div className="text-center mt-10">
            <NavLink to={`/dashboard/${id}`}
              className="inline-flex items-center gap-3 bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-xl px-14 py-6 rounded-full shadow-2xl transition hover:scale-105">
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>

        {/* ─── MOBILE ─── */}
        <div className="hidden max-lg:block max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl p-8 mb-8 shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(227,6,19,0.4),transparent)]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl font-extrabold mb-2">My Profile</h1>
              <p className="text-base opacity-90">Manage your EMRAN account</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative">
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <img src={formData.profilePhoto} alt={formData.fullname}
                  className="w-28 h-28 rounded-full object-cover border-6 border-white shadow-xl ring-2 ring-[#E30613]/40 group-hover:opacity-80 transition"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullname)}&background=001F5B&color=fff&size=256`} />
                <div className="absolute bottom-0 right-0 bg-[#E30613] p-2 rounded-full text-white shadow-lg">
                  <FiCamera className="text-base" />
                </div>
                <input type="file" ref={fileInputRef} accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                  onChange={handleImageSelect} className="hidden" />
              </div>
              {uploadError && <p className="text-red-600 text-xs mt-2 text-center">{uploadError}</p>}
            </div>
            <div className="pt-20 text-center">
              <h2 className="text-2xl font-extrabold text-[#001F5B]">{formData.fullname}</h2>
              <p className="text-gray-500">EMRAN Member</p>
            </div>
          </div>

          <ProfileContent />

          <div className="text-center mt-8">
            <NavLink to={`/dashboard/${id}`}
              className="inline-flex items-center gap-3 bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl transition hover:scale-105">
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <FiAlertTriangle className="text-7xl text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#001F5B] mb-3">Delete Account?</h3>
              <p className="text-gray-700">This action is <strong>permanent</strong> and cannot be undone.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-2xl transition">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition shadow-lg">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
