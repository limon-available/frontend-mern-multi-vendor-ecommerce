const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const apiHost = process.env.REACT_APP_API_URL; 
//|| 'https://multi-vendor-eccomerce-backend-1.onrender.com';

export const API_URL = trimTrailingSlash(apiHost);
export const API_BASE_URL = `${API_URL}/api`;
export const SOCKET_URL = trimTrailingSlash(process.env.REACT_APP_SOCKET_URL || API_URL);
export const DASHBOARD_URL = trimTrailingSlash(process.env.REACT_APP_DASHBOARD_URL || 'https://multi-vendor-dashboard-ecommerce.vercel.app');
export const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51S5MXsBezsUpnBx3xqoKn2fNwm2haJQJLXs2tHbc8El265abcMLcLhUaQ1PkUlfpg4KEKWALNtSMLhsj49joUdKH00eH4gkZ2i';

console.log("BUILD API URL =", process.env.REACT_APP_API_URL);
console.log("BUILD API BASE URL =", API_BASE_URL);
// Social login client identifiers (safe to expose on the client).
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || '';
