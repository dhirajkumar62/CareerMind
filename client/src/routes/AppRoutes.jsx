import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Landing from '../pages/Landing'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import CompleteProfile from '../pages/Onboarding/CompleteProfile'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import RoadmapView from '../pages/Dashboard/RoadmapView'
import ChatMentor from '../pages/Dashboard/ChatMentor'
import TargetRoles from '../pages/Careers/TargetRoles'
import CareerDetails from '../pages/Careers/CareerDetails'
import About from '../pages/About'
import Profile from '../pages/Dashboard/Profile'
import ResumeBuilder from '../pages/Dashboard/ResumeBuilder'
import Portfolio from '../pages/Dashboard/Portfolio'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <RoadmapView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor"
        element={
          <ProtectedRoute>
            <ChatMentor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/targets"
        element={
          <ProtectedRoute>
            <TargetRoles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/careers/:careerId"
        element={
          <ProtectedRoute>
            <CareerDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume-builder"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}
