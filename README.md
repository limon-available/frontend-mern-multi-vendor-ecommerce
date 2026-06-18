# Customer Frontend - Multi-Vendor Ecommerce

Customer-facing React application for the multi-vendor ecommerce platform.

This app handles storefront browsing, product details, customer authentication, cart, wishlist, checkout, Stripe payment, order history, reviews, and customer-to-seller chat.

## Tech Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Socket.IO Client
- Stripe Elements

## Main Features

- Customer registration and login
- Product listing, category filtering, search, and product details
- Cart and wishlist management
- Shipping and checkout flow
- Stripe payment integration
- Customer dashboard
- Order history and order details
- Product reviews
- Real-time seller chat

## Prerequisites

- Node.js 20+
- npm
- Running backend API

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in this directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_DASHBOARD_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_or_live_key
```

For production, use deployed HTTPS URLs:

```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_SOCKET_URL=https://your-backend-domain.com
REACT_APP_DASHBOARD_URL=https://your-dashboard-domain.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
```

## Development

```bash
npm start
```

Default local URL:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
```

The optimized static output is generated in:

```text
build/
```

## API Configuration

API and socket configuration is centralized in:

```text
src/config/app.js
src/api/api.js
src/utils/socket.js
```

Avoid hardcoding backend URLs in components. Use the shared config and Axios instance.

## Important Routes

- `/` - Home
- `/shops` - Shop listing
- `/products` - Category products
- `/products/search` - Product search
- `/product/details/:slug` - Product details
- `/card` - Cart
- `/shipping` - Shipping
- `/payment` - Payment
- `/dashboard` - Customer dashboard
- `/dashboard/my-orders` - Customer orders
- `/dashboard/my-wishlist` - Wishlist
- `/dashboard/chat/:sellerId` - Seller chat

## Deployment Notes

- Deploy as a static React build on Vercel, Netlify, or similar hosting.
- Set all `REACT_APP_*` variables in the hosting provider.
- Ensure the backend `CLIENT_ORIGINS` includes this app's deployed URL.
- Use the same Stripe publishable key mode as the backend Stripe secret key.

## Verification

```bash
npm run build
```

The current build passes, but the app still has existing ESLint warnings that should be cleaned before enforcing CI lint checks.

