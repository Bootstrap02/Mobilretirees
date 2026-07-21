
// pages/Profile.jsx — EXPANDED WITH DATE OF BIRTH + EXIF ORIENTATION FIX
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
  <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
    <div className="w-12 h-12 rounded-2xl bg-[#E30613]/10 flex items-center justify-center flex-shrink-0">
      <Icon className="text-[#E30613] text-2xl" />
    </div>
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-[#001F5B]">{title}</h3>
      {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const Field = ({ label, icon: Icon, children }) => (
  <div className="space-y-2 w-full">
    <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">
      {Icon && <Icon className="text-[#E30613]" />}
      {label}
    </label>
    <div className="w-full">{children}</div>
  </div>
);

const inputCls =
  "w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-2xl text-base focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 transition shadow-sm bg-white outline-none";
const readOnlyCls =
  "w-full px-4 py-3 md:px-5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-base text-gray-600 cursor-not-allowed";
const selectCls =
  "w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-2xl text-base focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 transition shadow-sm bg-white appearance-none outline-none";

const PhoneField = ({ value, onChange }) => (
  <div className="w-full">
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
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   EXIF ORIENTATION FIX
   ─────────────────────────────────────────────────────────────────────────────
   Problem: iPhones and some Android cameras embed an EXIF orientation tag in
   JPEG files. The original pixel data is stored rotated (e.g. upside-down),
   and the EXIF tag tells viewers how to display it correctly. Most browsers
   honour the EXIF tag when rendering <img> tags, but when you upload the raw
   file bytes to a server and store them, the server/CDN may strip the EXIF
   tag — causing the image to appear rotated when retrieved.

   Fix: Before uploading, we draw the image onto an HTML5 Canvas (which
   always renders with the EXIF orientation applied), then export the canvas
   as a new JPEG blob. The resulting file has the correct pixel orientation
   baked in, with no reliance on an EXIF tag. We upload this corrected blob
   instead of the original file.
   ──────────────────────────────────────────────────────────────────────────── */
const fixImageOrientation = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
          'image/jpeg',
          0.92
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass]       = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError]   = useState('');
  const [uploadError, setUploadError]       = useState('');
  const [saveSuccess, setSaveSuccess]       = useState(false);

  const [formData, setFormData] = useState({
    fullname: '', email: '', phone: '', address: '',
    staffId: 'N/A', dateOfRetirement: 'N/A', dateOfBirth: '', profilePhoto: '',
    companyAtRetirement: '', locationOfRetirement: '', departmentOfRetirement: '',
    spouse: '', spousePhone: '',
    nextOfKin: '', nextOfKinEmail: '', nextOfKinPhone: '',
    beneficiary: '', beneficiaryEmail: '', beneficiaryPhone: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [passwordData, setPasswordData]   = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userData'));
    if (!stored) { navigate('/signin'); return; }

    let formattedRetirementDate = 'N/A';
    if (stored.dateOfRetirement) {
      const d = new Date(stored.dateOfRetirement);
      if (!isNaN(d.getTime()))
        formattedRetirementDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    let inputBirthDate = '';
    if (stored.dateOfBirth) {
      const d = new Date(stored.dateOfBirth);
      if (!isNaN(d.getTime())) inputBirthDate = d.toISOString().split('T')[0];
    }

    setFormData({
      fullname: stored.fullname || '',
      email: stored.email || '',
      phone: stored.phone || '',
      address: stored.address || '',
      staffId: stored.staffId || stored._id || 'N/A',
      dateOfRetirement: formattedRetirementDate,
      dateOfBirth: inputBirthDate,
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

  /* ── Image selection with EXIF fix applied immediately on select ── */
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setUploadError('Only JPG, JPEG, PNG, SVG allowed'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image too large (max 5MB)'); return;
    }
    setUploadError('');

    // SVG files have no EXIF data — skip the canvas fix for them
    const correctedFile = file.type === 'image/svg+xml'
      ? file
      : await fixImageOrientation(file);

    setSelectedImage(correctedFile);
    // Show the corrected preview immediately
    setFormData(prev => ({ ...prev, profilePhoto: URL.createObjectURL(correctedFile) }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setUploadError('');
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = id || userData._id;

      await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/profile/${userId}`,
        {
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
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
      const userId = id || userData._id;
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
        localStorage.removeItem('userData');
        navigate('/signin');
      } else {
        setPasswordError(errorMsg);
      }
    } finally { setSaving(false); }
  };

  const handleDelete = () => {
    localStorage.removeItem('userData');
    alert('Account deleted successfully.');
    navigate('/signin');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-3xl text-[#001F5B]">
      Loading...
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden bg-gray-50">
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto w-full">

          {/* Top Banner */}
          <div className="relative bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] text-white rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 md:mb-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(227,6,19,0.4),transparent)]"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-3">My Profile</h1>
              <p className="text-base md:text-xl opacity-90">Manage your EMRAN account details</p>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 mb-8 relative text-center">
            <div className="inline-block relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <img
                src={formData.profilePhoto}
                alt={formData.fullname || 'Profile Avatar'}
                className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 md:border-8 border-white shadow-2xl ring-4 ring-[#E30613]/40 group-hover:opacity-80 transition"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullname || 'U')}&background=001F5B&color=fff&size=256`; }}
              />
              <div className="absolute bottom-1 right-1 bg-[#E30613] p-2 md:p-3 rounded-full text-white shadow-lg hover:bg-[#c20511] transition">
                <FiCamera className="text-base md:text-xl" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
            {uploadError && <p className="text-red-600 text-xs md:text-sm mt-2">{uploadError}</p>}
            <div className="mt-4">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#001F5B] mb-1">{formData.fullname}</h2>
              <p className="text-gray-500 text-sm md:text-lg">EMRAN Member</p>
            </div>
          </div>

          <div className="w-full space-y-6">
            {saveSuccess && (
              <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-semibold text-lg animate-bounce">
                ✓ Profile saved successfully!
              </div>
            )}

            {/* SECTION 1: Personal Info */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiUser} title="Personal Information" subtitle="Update your basic contact details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                <Field label="Date of Birth" icon={FiCalendar}>
                  <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className={inputCls} />
                </Field>
                <Field label="Staff ID">
                  <div className={readOnlyCls}>{formData.staffId}</div>
                </Field>
                <Field label="Date of Retirement" icon={FiCalendar}>
                  <div className={readOnlyCls}>{formData.dateOfRetirement}</div>
                </Field>
              </div>
            </div>

            {/* SECTION 2: Retirement Info */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiBriefcase} title="Retirement Details" subtitle="Your company and location at retirement" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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

            {/* SECTION 3: Spouse */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiHeart} title="Spouse Information" subtitle="Your spouse's contact details (if applicable)" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <Field label="Spouse Full Name" icon={FiHeart}>
                  <input name="spouse" value={formData.spouse} onChange={handleChange}
                    placeholder="Spouse's full name" className={inputCls} />
                </Field>
                <Field label="Spouse Phone Number" icon={FiPhone}>
                  <PhoneField value={formData.spousePhone} onChange={(v) => setFormData(p => ({ ...p, spousePhone: v }))} />
                </Field>
              </div>
            </div>

            {/* SECTION 4: Next of Kin */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiUsers} title="Next of Kin" subtitle="Emergency contact information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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

            {/* SECTION 5: Beneficiary */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiUsers} title="Beneficiary" subtitle="Who receives benefits on your behalf" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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

            {/* SECTION 6: Change Password */}
            <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
              <SectionHeader icon={FiLock} title="Change Password" subtitle="Update your account password" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {[
                  { label: 'Current Password', name: 'currentPassword', show: showCurrentPass, toggle: () => setShowCurrentPass(p => !p) },
                  { label: 'New Password', name: 'newPassword', show: showNewPass, toggle: () => setShowNewPass(p => !p) },
                  { label: 'Confirm New Password', name: 'confirmPassword', show: showConfirmPass, toggle: () => setShowConfirmPass(p => !p) },
                ].map(({ label, name, show, toggle }) => (
                  <Field key={name} label={label} icon={FiLock}>
                    <div className="relative w-full">
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
                <p className="text-red-600 font-medium mt-4 text-center text-sm">{passwordError}</p>
              )}
              <div className="mt-6 text-center">
                <button onClick={handleChangePassword} disabled={saving}
                  className="bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-base md:text-lg px-8 py-3.5 md:px-12 md:py-4 rounded-full shadow-lg transition hover:scale-105 inline-flex items-center gap-3 disabled:opacity-60">
                  <FiLock /> Change Password
                </button>
              </div>
            </div>

            {/* Save & Delete Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button onClick={handleSaveProfile} disabled={saving}
                className="w-full flex-1 bg-gradient-to-r from-[#E30613] to-[#c20511] hover:from-[#c20511] hover:to-[#E30613] text-white font-bold text-lg md:text-xl py-4 px-6 md:py-5 md:px-10 rounded-2xl shadow-xl transition hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-3">
                <FiSave className="text-xl md:text-2xl" />
                {saving ? 'Saving...' : 'Save All Changes'}
              </button>
              <button onClick={() => setShowDeleteModal(true)}
                className="w-full flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-lg md:text-xl py-4 px-6 md:py-5 md:px-10 rounded-2xl shadow-xl transition hover:scale-105 flex items-center justify-center gap-3">
                <FiTrash2 className="text-xl md:text-2xl" /> Delete Account
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <NavLink to={`/dashboard/${id}`}
              className="inline-flex items-center gap-3 bg-[#001F5B] hover:bg-[#001845] text-white font-bold text-base md:text-xl px-10 py-4 md:px-14 md:py-6 rounded-full shadow-2xl transition hover:scale-105">
              ← Back to Dashboard
            </NavLink>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <FiAlertTriangle className="text-5xl md:text-7xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-[#001F5B] mb-3">Delete Account?</h3>
              <p className="text-gray-700 text-sm md:text-base">
                This action is <strong>permanent</strong> and cannot be undone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3.5 rounded-2xl transition">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition shadow-lg">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
