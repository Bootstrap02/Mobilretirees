// pages/Auth.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BigLoader } from '../Modals/Loaders';
import exxonLogo from '../assets/exxonmobil-logo-white.jpg';

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
  const [formData, setFormData] = useState({
    fullname: '', email: '', phone: '', password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/register', formData);
      localStorage.setItem('userData', JSON.stringify(res.data));
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setLoading(false);
      alert('Registration failed. Try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/google', {
        token: credentialResponse.credential
      });
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      alert('Google login failed');
    }
  };

  return (
    <AuthLayout 
      title="Welcome Home" 
      subtitle="Create your retiree account to access your benefits"
    >
      {loading && <BigLoader message="Creating your account..." />}

      <form onSubmit={handleSubmit} className="space-y-5">
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
        <InputField 
          icon={FiPhone} 
          type="tel" 
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
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

        <button 
          type="submit"
          className="w-full bg-[#E30613] hover:bg-[#c20511] text-white font-bold py-4 rounded-xl transition shadow-lg"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Sign In Failed')}
          useOneTap
          theme="filled_blue"
          size="large"
          text="signup_with"
          shape="pill"
        />
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account? <NavLink to="/signin" className="text-[#E30613] font-bold hover:underline">Sign In</NavLink>
      </p>
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
      const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/login', formData);
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      alert('Invalid credentials');
      console.log(err)
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post('https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/google', {
        token: credentialResponse.credential
      });
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      alert('Google login failed');
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

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Sign In Failed')}
          useOneTap
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="pill"
        />
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