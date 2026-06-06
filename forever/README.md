# Forever (E‑commerce)

This repository contains a simple e‑commerce application with separate `backend`, `frontend`, and an `admin` frontend. It includes product listing, cart, orders, user auth, and image uploads (Cloudinary).

## Key features
- Product catalog and product pages
- Shopping cart and checkout flow
- Order placement and order history
- Admin panel for product management
- Image upload handling (Cloudinary)

## Prerequisites
- Node.js 16+ and npm or yarn
- MongoDB (local or hosted) or another DB configured in `backend/config/mongodb.js`
- Cloudinary account (if using image uploads)

## Quick start (development)

1. Backend

```bash
cd forever/backend
npm install
# create .env with required keys, e.g. MONGODB_URI, CLOUDINARY_URL, JWT_SECRET
# start the API server (check package.json scripts)
npm run dev
```

2. Frontend (customer)

```bash
cd forever/frontend
npm install
npm run dev
```

3. Admin frontend

```bash
cd forever/admin
npm install
npm run dev
```

Open the dev URLs printed by Vite for each frontend; the backend API port is shown in its server logs.

## Environment variables (examples)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — auth token secret
- `CLOUDINARY_URL` — Cloudinary connection string (if used)

## Project layout
- `backend/` — Express server, controllers, models, routes, `config/` for DB/cloud setup
- `frontend/` — Vite + React customer-facing storefront
- `admin/` — Vite + React admin dashboard for managing products and orders

## Deployment notes
- Use process managers (PM2) or platform-specific configuration to run the Node API
- Build frontends with `npm run build` and serve via static hosting or CDN

## Troubleshooting
- If uploads fail, confirm `CLOUDINARY_URL` is set and Cloudinary account is active
- Check `backend` logs for DB connection errors and ensure `MONGODB_URI` is valid

## Contributing
- Follow existing code style in components and controllers. Open issues for new features or bugs.

## License
Add a license file if publishing the project.
🛍️ E-Commerce Website

A modern, responsive e-commerce web application built with React + Vite, featuring product browsing, cart management, and multiple payment options.






✨ Features

Product catalog with detailed views

Shopping cart with quantity & size selection

Order placement with multiple payment options

Cash on Delivery

UPI

Credit/Debit Card

Responsive, mobile-first UI

Search & related products

Toast notifications