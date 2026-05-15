# 🧠 CareerMinds — AI Career Discovery Platform

> **Not marks. Not degrees. Just skills and direction.**

CareerMinds is a full-stack AI-powered career guidance platform that helps students and early-career professionals discover their ideal career path, build job-ready skills, and generate professional documents — all powered by **Google Gemini AI**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Smart Career Matching** | AI-driven assessment that maps your skills, interests, and mindset to the most aligned career path |
| 🗺️ **Personalized Roadmaps** | Step-by-step learning paths with milestones, skill gaps, and timelines tailored to your target role |
| 🤖 **24/7 AI Mentor** | Real-time career guidance, interview prep, and skill advice via an intelligent chatbot |
| 📄 **AI Resume Builder** | One-click professional resume generation based on your profile and roadmap progress |
| 💼 **Portfolio Generator** | Auto-generated portfolio showcasing your skills, projects, and career trajectory |
| 🔐 **Secure Authentication** | JWT-based auth with email OTP verification, password reset, and session management |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations and transitions
- **Zustand** — Lightweight state management
- **React Router v6** — Client-side routing
- **Axios** — API communication
- **Lucide React** — Premium icon library

### Backend
- **Node.js** — Server runtime
- **Express.js** — RESTful API framework
- **MongoDB + Mongoose** — NoSQL database and ODM
- **JWT** — Stateless authentication
- **Bcrypt** — Password hashing
- **Nodemailer** — Email OTP verification
- **Express Rate Limit** — API rate limiting
- **Helmet** — Security headers

### AI / ML
- **Google Gemini 2.5 Flash** — AI model for career matching, roadmap generation, resume building, portfolio creation, and mentorship chat
- **Vercel AI SDK** — Streamlined AI integration

### Deployment
- **Vercel** — Frontend hosting with SPA routing
- **Render** — Backend API hosting

---

## 📁 Project Structure

```
CareerMinds/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Sidebar, Logo, etc.)
│   │   ├── layouts/            # Page layouts (DashboardLayout, AuthLayout)
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard/      # DashboardHome, ResumeBuilder, Portfolio
│   │   │   ├── Careers/        # CareerDetails
│   │   │   └── Landing.jsx     # Landing page
│   │   ├── routes/             # App routing configuration
│   │   ├── services/           # API service modules
│   │   ├── store/              # Zustand state management
│   │   └── main.jsx            # App entry point
│   ├── index.html              # HTML template with SEO meta tags
│   ├── vercel.json             # Vercel SPA rewrite rules
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── middlewares/        # Auth, error handling middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # Business logic (AI, career matching, etc.)
│   │   ├── utils/              # Utility functions
│   │   └── app.js              # Express app configuration
│   ├── server.js               # Server entry point
│   ├── .env.example            # Environment variable template
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **MongoDB Atlas** account (or local MongoDB)
- **Google Gemini API key** — [Get one here](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/melbinroy/CareerMinds.git
cd CareerMinds

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=2000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:2000/api
```

### Run Locally

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment

### Frontend → Vercel
1. Import the repo on [Vercel](https://vercel.com)
2. Set **Root Directory** to `client`
3. Add environment variable: `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`

### Backend → Render
1. Create a **Web Service** on [Render](https://render.com)
2. Set **Root Directory** to `server`
3. Add all environment variables from `.env`
4. Add: `ALLOWED_ORIGINS` = `https://your-app.vercel.app`

---

## 📱 Responsive Design

CareerMinds is fully responsive across all devices:
- **Mobile** (375px+) — Hamburger menu with slide-out navigation panel
- **Tablet** (768px+) — Adaptive layouts with touch-friendly controls
- **Desktop** (1024px+) — Full navigation bar with dropdown menus

---

## 🔒 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/verify-otp` | Email OTP verification |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/dashboard` | Get dashboard data |
| POST | `/api/assessment/generate` | Generate AI career assessment |
| POST | `/api/roadmap/create` | Generate learning roadmap |
| GET | `/api/resume` | Get saved resume |
| POST | `/api/resume/generate` | AI resume generation |
| GET | `/api/portfolio` | Get portfolio data |
| POST | `/api/chat` | AI mentor chat |
| GET | `/api/careers/:id` | Get career details |

---

## 🧪 How the AI Works

1. **Career Matching** — Analyzes user skills, interests, education level, and mindset type to identify the most aligned career path using Google Gemini
2. **Roadmap Generation** — Creates a personalized step-by-step learning roadmap with milestones, resources, and timelines
3. **Resume Building** — Generates ATS-optimized professional resumes from profile data and roadmap progress
4. **Portfolio Creation** — Auto-generates a developer portfolio showcasing skills and projects
5. **AI Mentorship** — Provides real-time career advice, interview prep, and guidance through conversational AI

> **Token Efficiency**: AI responses are cached in MongoDB after the first generation, so most user interactions are served from the database without additional API calls.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) — AI backbone
- [Vercel AI SDK](https://sdk.vercel.ai/) — AI integration
- [Tailwind CSS](https://tailwindcss.com/) — Styling framework
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lucide Icons](https://lucide.dev/) — Icon library

---

<p align="center">
  Built with ❤️ by <strong>CareerMinds Team</strong>
</p>
