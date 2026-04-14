# 🏙️ SmartCity Complaint Portal (SMCP)

A full-stack **MERN** (MongoDB, Express.js, React, Node.js) web application that enables citizens to register, submit, and track civic complaints — while giving administrators a dashboard to manage and resolve them.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Local-47A248?logo=mongodb&logoColor=white)

---

## ✨ Features

### 👤 User Side
- **Registration & Login** — Secure authentication with JWT tokens
- **Submit Complaints** — File civic complaints with category, description, and location
- **My Complaints** — View and track the status of submitted complaints
- **Dashboard** — Overview of complaint statistics

### 🔐 Admin Side
- **Admin Login** — Separate admin authentication
- **Admin Dashboard** — Analytics and overview of all complaints
- **All Complaints** — View, filter, and manage every complaint
- **Complaint Detail** — Update status, add remarks, and resolve complaints

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| **Frontend** | React 19, React Router, Axios     |
| **Bundler**  | Vite 8                            |
| **Backend**  | Node.js, Express.js               |
| **Database** | MongoDB (Mongoose ODM)            |
| **Auth**     | JWT (JSON Web Tokens), bcryptjs   |

---

## 📁 Project Structure

```
smcp/
├── public/                  # Static assets
├── LOGO/                    # Project logo
├── src/                     # React frontend
│   ├── api/                 # Axios API config
│   ├── assets/              # Images & icons
│   ├── components/          # Reusable UI components
│   ├── data/                # Static data / constants
│   ├── pages/
│   │   ├── admin/           # Admin pages (Dashboard, Login, Complaints)
│   │   └── user/            # User pages (Register, Login, Dashboard, Complaints)
│   ├── routes/              # Route configuration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── server/                  # Express.js backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth middleware
│   ├── models/              # Mongoose schemas (User, Complaint)
│   ├── routes/              # API route definitions
│   └── server.js            # Server entry point
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
└── package.json             # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or above)
- **MongoDB** (running locally on `mongodb://localhost:27017`)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/SmartCity-Complaint-Portal.git
cd SmartCity-Complaint-Portal
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Set Up Environment Variables
Create a `server/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smcp
JWT_SECRET=your_secret_key_here
```

### 5. Start MongoDB
Make sure MongoDB is running locally.

### 6. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

---

## 📸 Screenshots

> _Coming soon_

---

## 📄 License

This project is for **educational purposes** as part of the Advanced Web Technology course.

---

## 👨‍💻 Author

Made with ❤️ by **Dev Shah**
