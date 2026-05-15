import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { FiLogOut, FiUser, FiSettings, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Roadmap", href: "/roadmap" },
    { label: "AI Mentor", href: "/mentor" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "My Portfolio", href: "/portfolio" },
    { label: "Target Roles", href: "/targets" },
  ];

  return (
    <>
      <motion.header
        className="bg-white/80 backdrop-blur-xl rounded-full border border-slate-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] px-3 py-2 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="cursor-pointer flex items-center shrink-0 pr-4 lg:pr-6 pl-4"
          onClick={() => navigate("/")}
        >
          <Logo size="sm" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={index}
                onClick={() => navigate(item.href)}
                className={`relative px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-50/80 rounded-full -z-10 border border-blue-100/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side: Avatar dropdown + Mobile hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Avatar Dropdown (all screen sizes) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 pr-2 lg:pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group active:scale-95"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm group-hover:border-blue-200 transition-colors">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[11px]">
                    {user?.name?.[0]}
                  </div>
                )}
              </div>
              <div className="hidden xl:flex items-center gap-1">
                <span className="text-[12px] font-black text-slate-700 uppercase tracking-tighter">{user?.name?.split(' ')[0]}</span>
                <FiChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] py-2.5 z-[100] overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Active Session</p>
                    <p className="text-[13px] font-bold text-slate-900 truncate">{user?.name}</p>
                  </div>

                  <button
                    onClick={() => { navigate("/profile"); setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 font-bold transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FiUser className="w-4 h-4" />
                    </div>
                    Edit Profile
                  </button>

                  <button
                    onClick={() => { setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 font-bold transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                      <FiSettings className="w-4 h-4" />
                    </div>
                    Preferences
                  </button>

                  <div className="h-px bg-slate-100 my-1.5 mx-3" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-rose-500 hover:bg-rose-50 font-bold transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-50/50 text-rose-400 flex items-center justify-center group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                      <FiLogOut className="w-4 h-4" />
                    </div>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-600 transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        navigate(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all mb-1 flex items-center gap-3 ${isActive
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "text-slate-600 hover:bg-slate-50"
                        }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {user?.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-blue-50 hover:text-blue-600 transition-all mb-2 text-left"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100 transition-all text-left"
                >
                  Sign Out
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
