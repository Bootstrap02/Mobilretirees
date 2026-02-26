// pages/Auth.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiCheckCircle, FiLoader, FiXCircle, } from 'react-icons/fi';
// import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BigLoader } from './Loaders';
import exxonLogo from '../assets/exxonmobil-logo-white.jpg';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

// Reusable Input Component
const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, showToggle, toggleShow, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="text-[#E30613]" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-transparent transition"
      {...props}
    />
    {showToggle && (
      <button
        type="button"
        onClick={toggleShow}
        className="absolute inset-y-0 right-0 pr-4 flex items-center"
      >
        {type === 'password' ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
      </button>
    )}
  </div>
);

// Shared Auth Layout
const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#001F5B] to-[#0A3D6B] flex items-center justify-center px-4">
      <NavLink
  to="/"
  className="absolute top-6 left-6 px-5 py-2 max-lg:left-2 max-lg:px-3 rounded-full 
             bg-white/10 backdrop-blur-md 
             text-white font-medium 
             border border-white/30 
             hover:bg-white hover:text-[#001F5B] 
             transition-all duration-300 shadow-lg"
>
  ← Home
</NavLink>
    <div className="max-w-md w-full">
      <div className="text-center mb-10">
        <img src={exxonLogo} alt="ExxonMobil Nigeria" className="h-20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-300 mt-2">{subtitle}</p>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>
      <p className="text-center text-gray-400 text-sm mt-8">
        © {new Date().getFullYear()} ExxonMobil Nigeria Retirees Portal
      </p>
    </div>
  </div>
);

// ====================== SIGN UP ======================

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [feedback, setFeedback] = useState(null); // null | { type, text }
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    // New retiree fields
    dateOfBirth: '',
    dateOfRetirement: '',
    companyAtRetirement: '',
    locationOfRetirement: '',
    departmentOfRetirement: '',
    nextOfKin: '',
    nextOfKinEmail: '',
    nextOfKinPhone: '',
    beneficiary: '',
    beneficiaryEmail: '',
    beneficiaryPhone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), type === 'success' ? 4000 : 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/register',
        formData
      );

      showFeedback('success', res.data.message || 'Account created! Pending admin approval.');
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (err) {
      setLoading(false);
     showFeedback('error', err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // ... your Google login handler remains unchanged ...

  return (
    <AuthLayout 
      title="Welcome Home" 
      subtitle="Create your retiree account to access your benefits"
    >
      {loading && <BigLoader message="Creating your account..." />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Existing basic fields */}
        <InputField 
          icon={FiUser} 
          type="text" 
          name="fullname"
          placeholder="Full Name (as in service record)"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <InputField 
          icon={FiMail} 
          type="email" 
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
    <PhoneInput
  country="ng"
  value={formData.phone}
  onChange={(phone) =>
    setFormData({
      ...formData,
      phone: `+${phone}`, // sends +2348164910957
    })
  }
  placeholder="Enter phone number"
  containerStyle={{ width: "100%" }}
  inputStyle={{
    width: "100%",
    padding: "16px",
    paddingLeft: "60px", // fixes hidden +234
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
  }}
  buttonStyle={{
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  }}
  inputProps={{
    name: "phone",
    required: true,
  }}
/>
  <InputField 
          icon={FiLock} 
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Create Password (min. 8 characters)"
          value={formData.password}
          onChange={handleChange}
          showToggle={true}
          toggleShow={() => setShowPass(!showPass)}
          required
        />

        {/* ────────────────────────────────────────────── */}
        {/*          RETIREE-SPECIFIC INFORMATION           */}
        {/* ────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-10 mt-12">
          <h3 className="text-2xl font-bold text-[#001F5B] mb-6 text-center">
            Retiree & Beneficiary Information
          </h3>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
            />
          </div>

          {/* Date of Retirement */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Date of Retirement
            </label>
            <input
              type="date"
              name="dateOfRetirement"
              value={formData.dateOfRetirement}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
            />
          </div>

          {/* Company at Retirement (Dropdown - only 2 options) */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Company at Retirement
            </label>
            <select
              name="companyAtRetirement"
              value={formData.companyAtRetirement}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
            >
              <option value="">Select company</option>
              <option value="MPN">MPN</option>
              <option value="EEPNL">EEPNL</option>
            </select>
          </div>

          {/* Location of Retirement (Dropdown) */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Location of Retirement
            </label>
            <select
              name="locationOfRetirement"
              value={formData.locationOfRetirement}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
            >
              <option value="">Select location</option>
              <option value="Lagos">Lagos</option>
              <option value="QIT/Eket">QIT/Eket</option>
              <option value="Port Harcourt/Onne">Port Harcourt/Onne</option>
              <option value="Bonny">Bonny</option>
              <option value="USA">USA</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
            </select>
          </div>

          {/* Department of Retirement */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Department of Retirement
            </label>
            <input
              type="text"
              name="departmentOfRetirement"
              value={formData.departmentOfRetirement}
              onChange={handleChange}
              placeholder="e.g., Production, Finance, Engineering..."
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
            />
          </div>

          {/* Next of Kin */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Next of Kin Full Name
            </label>
            <input
              type="text"
              name="nextOfKin"
              value={formData.nextOfKin}
              onChange={handleChange}
              placeholder="Full name of next of kin"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Next of Kin Email
              </label>
              <input
                type="email"
                name="nextOfKinEmail"
                value={formData.nextOfKinEmail}
                onChange={handleChange}
                placeholder="next-of-kin@example.com"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
                required
              />
            </div>      
            <div className="mb-6">
  <label className="block text-lg font-medium text-gray-700 mb-2">
    Next of Kin Phone
  </label>
  <PhoneInput
  country="ng"
    value={formData.nextOfKinPhone}
  onChange={(phone) =>
    setFormData({
      ...formData,
      nextOfKinPhone: `+${phone}`, // sends +2348164910957
    })
  }
  placeholder="Enter phone number"
  containerStyle={{ width: "100%" }}
  inputStyle={{
    width: "100%",
    padding: "16px",
    paddingLeft: "60px", // fixes hidden +234
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
  }}
  buttonStyle={{
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  }}
  inputProps={{
    name: "nextOfKinPhone",
    required: true,
  }}
/>
</div>
          </div>

          {/* Beneficiary */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Beneficiary Full Name
            </label>
            <input
              type="text"
              name="beneficiary"
              value={formData.beneficiary}
              onChange={handleChange}
              placeholder="Full name of beneficiary"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Beneficiary Email
              </label>
              <input
                type="email"
                name="beneficiaryEmail"
                value={formData.beneficiaryEmail}
                onChange={handleChange}
                placeholder="beneficiary@example.com"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
                required
              />
            </div>
<div className="mb-6">
  <label className="block text-lg font-medium text-gray-700 mb-2">
    Beneficiary Phone
  </label>
  <PhoneInput
  country="ng"
    value={formData.beneficiaryPhone}
  onChange={(phone) =>
    setFormData({
      ...formData,
      beneficiaryPhone: `+${phone}`, // sends +2348164910957
    })
  }
  placeholder="Enter phone number"
  containerStyle={{ width: "100%" }}
  inputStyle={{
    width: "100%",
    padding: "16px",
    paddingLeft: "60px", // fixes hidden +234
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
  }}
  buttonStyle={{
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  }}
  inputProps={{
    name: "beneficiaryPhone",
    required: true,
  }}
/>
</div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl transition shadow-lg mt-10"
        >
          Create Account
        </button>
      </form>
{/* Feedback Modal (top-center) */}
      {feedback && (
        <div>
        <div className="max-lg:hidden fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-full px-4 animate-fade-in-down">
          <div
            className={`flex items-center gap-4 p-5 rounded-2xl shadow-2xl text-white ${
              feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {feedback.type === 'success' ? (
              <FiCheckCircle className="text-4xl flex-shrink-0" />
            ) : (
              <FiXCircle className="text-4xl flex-shrink-0" />
            )}
            <p className="text-lg font-medium">{feedback.text}</p>
          </div>
        </div>
        <div className="hidden max-lg:block fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-down px-4">
  <div className="w-full max-w-sm">
    <div
      className={`flex items-center gap-4 p-5 rounded-2xl shadow-2xl text-white ${
        feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {feedback.type === 'success' ? (
        <FiCheckCircle className="text-3xl flex-shrink-0" />
      ) : (
        <FiXCircle className="text-3xl flex-shrink-0" />
      )}
      <p className="text-base sm:text-lg font-medium flex-1">{feedback.text}</p>
    </div>
  </div>
</div>
        </div>
      )}
      {/* ... your Google login section and sign-in link ... */}
    </AuthLayout>
  );
};

// ====================== SIGN IN ======================
export const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      'https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/login',
      formData
    );

    const { success, token, user, message } = res.data;

    if (!success) {
      // Non-member case (dues not paid)
      alert(message || "Your Account is still pending Administrative approval. Please wait");
      setLoading(false);
      navigate('/'); // or wherever you want to send them
      return;
    }

    // Successful member login
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('token', token); // If you need token for future requests

    alert('Login successful! Welcome back.');
    navigate(`/dashboard/${user._id}`); // or just '/dashboard'


  } catch (err) {
    setLoading(false);

    // Handle different error cases
    if (err.response?.status === 401) {
      alert('Invalid email or password');
    } else if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert('Something went wrong. Please try again later.');
    }

    console.error('Login error:', err.response?.data || err.message);
  }
};
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your retiree benefits portal"
    >
      {loading && <BigLoader message="Signing you in securely..." />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField 
          icon={FiMail} 
          type="email" 
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField 
          icon={FiLock} 
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          showToggle={true}
          toggleShow={() => setShowPass(!showPass)}
          required
        />

        <div className="flex justify-end">
          <NavLink to="/forgotpassword" className="text-sm text-[#E30613] hover:underline">
            Forgot Password?
          </NavLink>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl transition shadow-lg"
        >
          Sign In
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        New retiree? <NavLink to="/signup" className="text-[#E30613] font-bold hover:underline">Create Account</NavLink>
      </p>
    </AuthLayout>
  );
};

// ====================== FORGOT & RESET ======================
export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/forgot-password', { email });
      setSent(true);
    } catch (err) {
      alert('Email not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="We'll send you a link to reset your password">
      {loading && <BigLoader message="Sending reset link..." />}
      {sent ? (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMail className="text-4xl text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#001F5B]">Check Your Email</h3>
          <p className="text-gray-600 mt-2">We sent a password reset link to {email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
            icon={FiMail}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl transition">
            Send Reset Link
          </button>
          <p className="text-center text-sm">
            <NavLink to="/signin" className="text-[#E30613] hover:underline">Back to Sign In</NavLink>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

// ====================== RESET PASSWORD PAGE ======================
export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { token } = useParams(); // Get token from URL: /reset-password/:token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/reset-password/${token}`,
        { password }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Link expired or invalid. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Set New Password" subtitle="Create a strong password for your account">
      {loading && <BigLoader message="Updating your password..." />}

      {success ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#001F5B]">Password Updated!</h3>
          <p className="text-gray-600 mt-3">Your password has been changed successfully.</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to sign in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <InputField
            icon={FiLock}
            type={showPass ? 'text' : 'password'}
            placeholder="New Password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showToggle={true}
            toggleShow={() => setShowPass(!showPass)}
            required
          />

          <InputField
            icon={FiLock}
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showToggle={true}
            toggleShow={() => setShowConfirm(!showConfirm)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E30613] hover:bg-[#c20511] disabled:opacity-70 text-white font-bold py-4 rounded-xl transition shadow-lg"
          >
            {loading ? 'Updating...' : 'Set New Password'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <NavLink to="/signin" className="text-[#E30613] font-bold hover:underline">
              Sign In
            </NavLink>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};



export const Payment = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Get user ID from localStorage (assuming user is logged in)
const { id } = useParams();   // correct — now id is the actual string
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim() || token.length !== 6 || !/^\d{6}$/.test(token)) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit code' });
      return;
    }
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/confirmpayment/${id}`,
        { token: token.trim() }
      );

      setMessage({
        type: 'success',
        text: response.data.message || 'Payment confirmation submitted successfully. Admin will verify shortly.'
      });
      console.log(response.data)
      setToken(''); // Clear input after success
    } catch (err) {
              console.log(err)
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit confirmation. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F5B] via-[#001845] to-[#0A3D6B] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Confirm Your Payment
          </h1>
          <p className="text-xl opacity-90">
            Enter the last 6 digits of your bank transfer receipt/reference below
          </p>
        </div>

        {/* Payment Confirmation Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-12 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Token Input */}
            <div>
              <label className="block text-lg font-medium mb-3">
                Last 6 Digits of Payment Receipt/Reference
              </label>
              <input
                type="text"
                maxLength={6}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))} // Only digits
                placeholder="e.g., 483920"
                className="w-full px-6 py-5 text-3xl font-mono text-center bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/30 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl transition flex items-center justify-center gap-3 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#E30613] hover:bg-[#c20511] shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-2xl" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle className="text-2xl" />
                  Confirm Payment
                </>
              )}
            </button>

            {/* Status Message */}
            {message.text && (
              <div
                className={`mt-6 p-5 rounded-xl text-center text-lg max-lg:text-md font-medium ${
                  message.type === 'success'
                    ? 'bg-green-600/20 border border-green-400 text-green-200'
                    : 'bg-red-600/20 border border-red-400 text-red-200'
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

