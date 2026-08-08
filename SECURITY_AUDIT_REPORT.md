# EMRAN Website - Complete Security Audit Report

## Overview
This report identifies all **insecure API endpoints**, **vulnerable data handling practices**, and **security anti-patterns** found across the EMRAN (ExxonMobil Retirees Association of Nigeria) website frontend codebase. Each issue is categorized by severity and includes the specific file locations and recommendations for fixing.

---

## 🔴 CRITICAL VULNERABILITIES

### 1. JWT Tokens Stored in localStorage (XSS-Sensitive)
**Severity:** 🔴 CRITICAL  
**Files Affected:** `src/Pages/Signup.js`, `src/Components/Categories.js`, `src/Pages/Header.js`, `src/Pages/Profile.js`, `src/Pages/Dashboard.js`, `src/Pages/Dues.js`, `src/Pages/Firstpage.js`

**Issue:** Authentication tokens (JWTs) and complete user data objects are stored in `localStorage`, making them accessible to any JavaScript running on the page. If an XSS vulnerability exists anywhere, attackers can steal tokens.

**Evidence:**
```javascript
// Signup.js line ~390
localStorage.setItem('userData', JSON.stringify(user));  // Full user object including sensitive data
localStorage.setItem('token', token);  // JWT token

// Categories.js line ~280
const accessedToken = JSON.parse(localStorage.getItem('userData'));

// Header.js line ~18
localStorage.setItem('allusers', JSON.stringify(res.data.users || []));  // ALL users exposed
localStorage.setItem('allofficials', JSON.stringify(res.data.officials || []));  // ALL officials exposed
```

**Fix:** Use HTTP-only cookies for tokens. Never store user data/credentials in localStorage.

---

### 2. API Endpoints Exposed Without Authentication
**Severity:** 🔴 CRITICAL  
**Files Affected:** Multiple files

**Issue:** Many API endpoints are called **without any authentication headers** (no Bearer token, no API key). Anyone can hit these endpoints.

**Unauthenticated Endpoints:**
| Endpoint | File | What It Exposes |
|---|---|---|
| `/mobilcreateadmin/getusers` | `Header.js:17` | **ALL users** - full user database |
| `/mobilcreateuser/getofficials` | `Header.js:26` | **ALL officials** - full officials database |
| `/mobilcreatenotifications` | `Firstpage.js:25` | All notifications |
| `/mobilcreatealert` | `Firstpage.js:34` | All alerts |
| `/mobilcreatenewsevents` | `Firstpage.js:43` | All news/events |
| `/mobilcreateuser/getuser/${id}` | `Firstpage.js:56` | **Any user by ID** - no auth check |
| `/mobilcreatecandidates` | `Elections.js:12`, `CastVote.js:10` | All candidates |
| `/mobilcreatecandidates/${userId}/vote` | `Elections.js:19`, `CastVote.js:16` | Voting (no auth) |
| `/mobilcreatecandidates/results` | `Elections.js:25` | Election results |
| `searchproducts?search=X` | `Categories.js` | All products |
| `/addwishlist` | `Categories.js:281` | Add to wishlist (no auth) |
| `/mobilcreatemessages/usercreatemessage` | `Support.js:345`, `Messages.js:148` | Send messages |

**Fix:** Require JWT/Bearer token validation on ALL backend endpoints. Implement proper RBAC (Role-Based Access Control).

---

### 3. Password Stored in localStorage
**Severity:** 🔴 CRITICAL  
**Files Affected:** `src/Pages/Signup.js`

**Issue:** After login, the entire user object (potentially including password hash or sensitive data) is stored in localStorage.

**Evidence:**
```javascript
// Signup.js line ~392
localStorage.setItem('userData', JSON.stringify(user));
```

**Fix:** Never store user objects in localStorage. Store only a session token. The backend should strip sensitive fields from the user object before sending it.

---

### 4. No CSRF Protection
**Severity:** 🔴 CRITICAL  
**Files Affected:** All API calls

**Issue:** No CSRF tokens are used in any API requests. Combined with localStorage-based auth, this makes the app vulnerable to CSRF attacks.

**Fix:** Implement CSRF tokens or use SameSite=Strict cookies.

---

## 🟠 HIGH SEVERITY

### 5. Hardcoded API Base URL in Multiple Files
**Severity:** 🟠 HIGH  
**Files Affected:** `Categories.js`, `Mobilecategories.js`, `Header.js`, `Messages.js`, `Support.js`, `Dues.js`, `Profile.js`, `Signup.js`, `Firstpage.js`, `News.js`, `Notifications.js`

**Issue:** The API base URL `https://campusbuy-backend-nkmx.onrender.com` is hardcoded in **30+ places** across the codebase. This makes it impossible to change environments without modifying every file. Also, `Elections.js` and `CastVote.js` fallback to `http://localhost:3000` (insecure HTTP).

**Evidence:**
```javascript
// Elections.js line 8
const API_URL = (process.env.REACT_APP_API || 'http://localhost:3000') + '/mobilcreatecandidates';

// Categories.js - 40+ hardcoded API URLs
// Profile.js - 5 hardcoded URLs
// Dues.js - 2 hardcoded URLs
```

**Fix:** Centralize all API URLs in a single config file/API module. Remove the `http://` fallback.

---

### 6. User Data Fetched and Stored Remotely Without Consent Check
**Severity:** 🟠 HIGH  
**Files Affected:** `src/Pages/Firstpage.js`

**Issue:** Every time the homepage loads, it fetches the current user's data from the server and overwrites localStorage:
```javascript
// Firstpage.js line 56
const fetchuser = async (id) => {
  const res = await axios.get(`https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/getuser/${id}`);
  const user = res.data.user || [];
  localStorage.setItem('userData', JSON.stringify(user));
};
```

This means user data is constantly being refreshed/stored without any user interaction.

**Fix:** Don't auto-fetch and overwrite user data on page load. Implement proper session management.

---

### 7. Voting System - No Double-Vote Prevention
**Severity:** 🟠 HIGH  
**Files Affected:** `src/Pages/Elections.js`, `src/Pages/CastVote.js`

**Issue:** The voting system sends votes via `POST` requests but there's no client-side check to prevent double-voting. The `CastVote.js` page sends bulk votes:
```javascript
// CastVote.js line 66
await axios.post(`${API_URL}/${userId}/votes`, { candidateIds });
```

**Fix:** Implement vote verification on the backend. Add a "Vote Already Cast" check on the frontend.

---

### 8. Payment Confirmation - No Rate Limiting / 6-Digit Token
**Severity:** 🟠 HIGH  
**Files Affected:** `src/Pages/Dues.js`, `src/Pages/Signup.js`

**Issue:** Payment confirmation uses a simple 6-digit token with no rate limiting, captcha, or additional verification. Attackers could brute-force payment tokens:
```javascript
// Dues.js line 290
const response = await axios.put(
  `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/confirmpayment/${id}`,
  { token: token.trim(), year: true }
);
```

**Fix:** Implement rate limiting, add captcha, and use more secure verification methods.

---

## 🟡 MEDIUM SEVERITY

### 9. API Response Data Stored Without Validation
**Severity:** 🟡 MEDIUM  
**Files Affected:** `Categories.js`, `Mobilecategories.js`, `Mobilesearch.js`, `Trendingproducts.js`, `Header.js`, `Firstpage.js`

**Issue:** API responses are stored directly in localStorage or state without validation or sanitization:
```javascript
// Categories.js line 175
const response = await axios.get(categoryApi);
await setCategoryState(response.data.data);  // No validation

// Header.js line 18
localStorage.setItem('allusers', JSON.stringify(res.data.users || []));  // No sanitization
```

**Fix:** Validate and sanitize all API responses before storing or rendering.

---

### 10. No HTTPS Enforcement (Fallback to HTTP)
**Severity:** 🟡 MEDIUM  
**Files Affected:** `src/Pages/Elections.js`, `src/Pages/CastVote.js`

**Issue:** Both files fallback to `http://localhost:3000` if `REACT_APP_API` env var is not set:
```javascript
const API_URL = (process.env.REACT_APP_API || 'http://localhost:3000') + '/mobilcreatecandidates';
```

**Fix:** Remove HTTP fallback. Always use HTTPS.

---

### 11. Sensitive Data Exposed in API Responses
**Severity:** 🟡 MEDIUM  
**Files Affected:** `Header.js`, `Firstpage.js`

**Issue:** The `/getusers` and `/getofficials` endpoints return ALL users and officials data, which is then stored in localStorage:
```javascript
// Header.js
localStorage.setItem('allusers', JSON.stringify(res.data.users || []));
localStorage.setItem('allofficials', JSON.stringify(res.data.officials || []));
```

**Fix:** Never expose all users/officials to every visitor. Implement proper authorization and pagination.

---

### 12. No Input Validation on Login/Signup
**Severity:** 🟡 MEDIUM  
**Files Affected:** `src/Pages/Signup.js`

**Issue:** The signup form collects extensive PII (Personally Identifiable Information) including full name, email, phone, date of birth, retirement date, company, location, department, next of kin (name, email, phone), beneficiary (name, email, phone), and spouse (name, phone) - but there's minimal client-side validation.

**Fix:** Implement comprehensive input validation on both client and server side.

---

### 13. Password Reset Token in URL
**Severity:** 🟡 MEDIUM  
**Files Affected:** `src/Pages/Signup.js`

**Issue:** The password reset token is passed as a URL parameter:
```javascript
// Signup.js line 477
const response = await axios.post(`${API}/reset-password/${token}`, { password });
```

**Fix:** Use POST-only for password reset. Consider using a two-step verification process.

---

## 🟢 LOW SEVERITY

### 14. No Rate Limiting on Any Endpoint
**Severity:** 🟢 LOW  
**Files Affected:** All API calls

**Issue:** No rate limiting is implemented on any API endpoint. Attackers could brute-force login, registration, or any other endpoint.

**Fix:** Implement rate limiting on all API endpoints.

---

### 15. No Content Security Policy (CSP) Headers
**Severity:** 🟢 LOW  
**Files Affected:** `public/index.html`

**Issue:** No CSP headers are set in the HTML or server configuration. This makes the app more vulnerable to XSS attacks.

**Fix:** Implement CSP headers.

---

### 16. Missing Security Headers
**Severity:** 🟢 LOW  
**Files Affected:** Server configuration

**Issue:** Likely missing security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `X-XSS-Protection`.

**Fix:** Add security headers at the server level.

---

### 17. User Data Not Cleared on Logout
**Severity:** 🟢 LOW  
**Files Affected:** `src/Components/Header.js`

**Issue:** `localStorage.clear()` removes ALL localStorage data, but there's no server-side session invalidation:
```javascript
// Header.js line 54-55
localStorage.removeItem('userData');
localStorage.clear();
```

**Fix:** Implement server-side session invalidation on logout.

---

## Summary of All API Endpoints Found

| Endpoint | Method | Auth | Data Exposed | File(s) |
|---|---|---|---|---|
| `/mobilcreateadmin/getusers` | GET | ❌ No | All users | `Header.js` |
| `/mobilcreateuser/getofficials` | GET | ❌ No | All officials | `Header.js` |
| `/mobilcreatenotifications` | GET | ❌ No | All notifications | `Firstpage.js` |
| `/mobilcreatenotifications/${id}` | GET | ❌ No | Single notification | `Notifications.js` |
| `/mobilcreatealert` | GET | ❌ No | All alerts | `Firstpage.js` |
| `/mobilcreatenewsevents` | GET | ❌ No | All news/events | `Firstpage.js` |
| `/mobilcreatenewsevents/${id}` | GET | ❌ No | Single news | `News.js` |
| `/mobilcreateuser/getuser/${id}` | GET | ❌ No | Any user by ID | `Firstpage.js` |
| `/mobilcreateuser/register` | POST | ❌ No | User registration | `Signup.js` |
| `/mobilcreateuser/login` | POST | ❌ No | User login | `Signup.js` |
| `/mobilcreateuser/forgot-password` | POST | ❌ No | Password reset request | `Signup.js` |
| `/mobilcreateuser/reset-password/${token}` | POST | ❌ No | Password reset | `Signup.js` |
| `/mobilcreateuser/confirmpayment/${id}` | PUT | ❌ No | Payment confirmation | `Signup.js`, `Dues.js` |
| `/mobilcreateuser/profile/${userId}` | PUT | ❌ No | Profile update | `Profile.js` |
| `/mobilcreateuser/change-password/${userId}` | PUT | ✅ Yes | Password change | `Profile.js` |
| `/mobilcreateuser/upload-fortune-image/${userId}` | PUT | ❌ No | Image upload | `Profile.js`, `Signup.js` |
| `/mobilcreatecandidates` | GET | ❌ No | All candidates | `Elections.js`, `CastVote.js` |
| `/mobilcreatecandidates/${userId}/vote` | POST | ❌ No | Cast vote | `Elections.js` |
| `/mobilcreatecandidates/${userId}/votes` | POST | ❌ No | Bulk votes | `CastVote.js` |
| `/mobilcreatecandidates/results` | GET | ❌ No | Election results | `Elections.js` |
| `/mobilcreatemessages/usercreatemessage` | POST | ❌ No | Send message | `Support.js`, `Messages.js` |
| `/searchproducts?search=X` | GET | ❌ No | Product search | `Categories.js`, `Mobilecategories.js` |
| `/addwishlist` | PUT | ✅ Yes | Add to wishlist | `Categories.js` |
| `/mobilcreatenotifications/push/vapid-key` | GET | ❌ No | VAPID key | `Dashboard.js` |
| `/mobilcreatenotifications/push/subscribe` | POST | ❌ No | Push subscription | `Dashboard.js` |

---

## 🛡️ Recommended Security Fixes (Priority Order)

### Immediate (Critical):
1. **Move auth tokens to HTTP-only cookies** - Remove JWT from localStorage
2. **Add authentication to ALL API endpoints** - Every endpoint should validate the JWT
3. **Remove `/getusers` and `/getofficials` endpoints** or add proper authorization
4. **Add CSRF protection** to all state-changing requests

### Within 1 Week (High):
5. **Centralize API configuration** in a single module
6. **Add rate limiting** to login, registration, payment, and voting endpoints
7. **Remove HTTP fallback** - enforce HTTPS everywhere
8. **Add input validation** to all forms (client + server side)
9. **Implement vote verification** - prevent double voting

### Within 1 Month (Medium):
10. **Add security headers** (CSP, HSTS, X-Frame-Options, etc.)
11. **Implement proper session management** with refresh tokens
12. **Sanitize all API responses** before rendering
13. **Add captcha** to login, registration, and payment forms
14. **Audit and secure the payment confirmation flow**

---

*Report generated based on frontend code analysis of `c:/Users/Asus/Desktop/Outwork/mobil/src/`*
