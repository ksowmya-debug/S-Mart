# SOWMYA.KCODE (CodeID) — DSA Notes Business Platform

A high-performance digital product business website for **SOWMYA.KCODE** (`◈ CodeID`), designed to sell Sowmya's DSA Notes PDF for **₹39**.

---

## 🎨 Visual Identity & Tech Stack

- **Brand Colors**: Royal Blue (`#2563EB`), Electric Blue (`#3B82F6`), Light Blue (`#60A5FA`), Deep Navy (`#07111F`), Dark Card (`#0D1B2A`).
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios, Recharts, Lucide React (JavaScript).
- **Backend**: Node.js, Express.js, JWT, bcryptjs, REST API (JavaScript).
- **Database**: MongoDB + Mongoose.
- **Payments**: Modular UPI / QR Code flow (`sowmya.kcode@upi`) with safe local verification simulation.
- **Security**: Protected routes, JWT bearer authentication, admin role guard, and server-protected PDF streaming (never exposed via static files).

---

## 🚀 How to Run Locally

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run data:import    # Seed admin, users, product & mock telemetry
npm start              # Runs on http://localhost:8000
```

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev            # Runs on http://localhost:5173
```

---

## 🔑 Default Test Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@codeid.com` (or `sowmyaKatkojwal@gmail.com`) | `Admin@123` |
| **Student** | `user@codeid.com` | `User@123` |

---

## 🌐 Routes Overview

### Public Website
- `/` — Landing page with 3D DSA Notes book mockup, hero, stats, why notes, how it works, preview, pricing, testimonials, FAQ, contact.
- `/notes` — Complete 70+ pages syllabus and topic index.
- `/preview` — Interactive sample reader with locked pages & purchase modal.
- `/testimonials` — Student reviews and placement stories.
- `/faq` — Animated FAQ accordion.
- `/contact` — Direct Instagram (`@sowmya.kcode`) & Email (`sowmyaKatkojwal@gmail.com`).
- `/login` & `/register` — Authentication with JWT.

### Checkout & User Area
- `/pay/:orderId` — Clean UPI / QR Code checkout (Amount ₹39, UPI ID `sowmya.kcode@upi`, order verification).
- `/dashboard` — User Dashboard with "My Notes" (Instant PDF download), stats, and recent orders.

### Admin Portal
- `/admin` — KPI Telemetry, Revenue Line Chart, Orders by Status Donut, User Growth Line, Downloads Line, Payment Methods Donut.
- `/admin/users` — Searchable and filterable customer database.
- `/admin/orders` — Orders management with download tracking.
- `/admin/payments` — Transaction audit log with manual UPI approval action.
- `/admin/downloads` — Audit log of all authenticated PDF downloads.
- `/admin/products` — Dynamic pricing and content management.
