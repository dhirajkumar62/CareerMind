import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.2 }
    }
  };

  const navItems = [
    { label: "How it Works", href: "/#features" },
    { label: "AI Mentor", href: "/#mentorship" },
    { label: "Our Vision", href: "/about" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] border border-slate-100 rounded-full pl-4 sm:pl-6 pr-2 py-2 w-[calc(100%-2rem)] sm:w-auto max-w-4xl mx-auto flex items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 sm:gap-10">
          <motion.div
            className="flex items-center gap-2 cursor-pointer group pr-2 sm:pr-4"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo size="sm" className="group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("/") && !item.href.includes("#")) {
                    e.preventDefault();
                    navigate(item.href);
                    setActiveLink(item.href);
                  } else if (item.href.includes("#")) {
                    setActiveLink(item.href);
                  } else {
                    setActiveLink(item.href);
                  }
                }}
                className={`relative px-4 py-2 rounded-full text-[14px] font-bold transition-all duration-300 ${activeLink === item.href
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeLink === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-blue-50/80 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-8">
          {user ? (
            <div className="relative">
              <motion.div
                className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 pr-3 sm:pr-4 rounded-full hover:bg-slate-50 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden shadow-sm">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {user?.name?.[0]}
                    </div>
                  )}
                </div>
                <span className="text-slate-700 font-medium text-[14px] hidden sm:block">{user.name}</span>
              </motion.div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[14px] text-slate-700 hover:bg-slate-50 font-medium transition-colors flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[14px] text-slate-700 hover:bg-slate-50 font-medium transition-colors flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      </div>
                      Dashboard
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 font-medium transition-colors flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      </div>
                      Log out
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate("/login")}
                className="text-[14px] font-bold text-slate-500 hover:text-slate-900 px-3 sm:px-4 py-2 transition-colors inline-block rounded-full"
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
              >
                Log in
              </motion.button>
              <motion.button
                onClick={() => navigate("/register")}
                className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-full text-[13px] sm:text-[14px] font-bold transition-all flex items-center gap-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-[1px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          )}

          {/* Mobile Hamburger for nav links */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-600 transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-20 left-4 right-4 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 md:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="p-4 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("/") && !item.href.includes("#")) {
                        e.preventDefault();
                        navigate(item.href);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-2xl text-[15px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              {!user && (
                <div className="p-4 pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 rounded-xl text-[15px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { navigate("/register"); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 rounded-xl text-[15px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
