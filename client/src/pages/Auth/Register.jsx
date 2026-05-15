import { useState, useEffect } from "react";
import { registerUser, verifyOtp, resendOtp } from "../../services/authService";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // OTP State
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    educationLevel: "",
  });

  useEffect(() => {
    let interval;
    if (showOTP && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(formData);
      setSuccessMsg(data.message || "Please check your email for the OTP.");
      setShowOTP(true);
      setResendTimer(60); // Reset timer on successful registration
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await verifyOtp({ email: formData.email, otp });
      setAuth(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed. Please check your OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const data = await resendOtp({ email: formData.email });
      setSuccessMsg(data.message || "A new OTP has been sent.");
      setResendTimer(60); // Reset cooldown
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto pt-2 relative min-h-[400px]">

        {/* Only show tabs if NOT on OTP screen */}
        {!showOTP && (
          <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible" className="flex border-b border-slate-200 mb-10 w-max">
            <button
              onClick={() => navigate("/login")}
              className="pb-3 px-2 mr-6 text-[14px] font-bold transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-600 tracking-wide"
            >
              Login
            </button>
            <button className="pb-3 px-2 text-[14px] font-bold transition-colors border-b-2 border-blue-600 text-blue-600 tracking-wide">
              Create Account
            </button>
          </motion.div>
        )}

        {/* Dynamic Headings */}
        <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
          <h2 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">
            {showOTP ? "Verify your email" : "Create your account"}
          </h2>
          <p className="text-[15px] text-slate-500">
            {showOTP
              ? `We sent a 6-digit code to ${formData.email}.`
              : "Set up your profile in minutes."}
          </p>
        </motion.div>

        {/* Error / Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[13px] font-medium flex items-center gap-3 shadow-sm"
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </motion.div>
          )}

          {successMsg && showOTP && !error && (
            <motion.div
              className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-[13px] font-medium flex items-center gap-3 shadow-sm"
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Toggle: Registration vs OTP */}
        {!showOTP ? (
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                User Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
              />
            </motion.div>

            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
              />
            </motion.div>

            <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
              />
            </motion.div>

            <motion.div custom={5} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Education Level
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium appearance-none bg-white"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
              >
                <option value="">Select level...</option>
                <option value="10th">10th Grade</option>
                <option value="12th">12th Grade / High School</option>
                <option value="College">College / Bachelor's Degree</option>
                <option value="Graduate">Graduate / Master's Degree</option>
                <option value="Other">Other / Certification</option>
              </select>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold text-[15px] transition-colors disabled:opacity-50 mt-2 flex items-center justify-center shadow-sm disabled:hover:bg-[#2563eb]"
              custom={6}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Create Account"}
            </motion.button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifySubmit}>
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError("");
                }}
                required
                placeholder="000000"
                className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 text-center text-3xl font-mono tracking-[0.5em] shadow-sm bg-[#fafafa]"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-[16px] transition-colors disabled:opacity-50 flex items-center justify-center shadow-sm disabled:hover:bg-[#2563eb]"
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={otp.length === 6 ? { y: -1 } : {}}
              whileTap={otp.length === 6 ? { y: 0 } : {}}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Verify & Continue"}
            </motion.button>

            {/* Resend OTP Section */}
            <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible" className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || resendLoading}
                className={`text-[13px] font-bold transition-colors ${resendTimer > 0 || resendLoading
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800 underline underline-offset-4"
                  }`}
              >
                {resendLoading
                  ? "Resending..."
                  : resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
              </button>
            </motion.div>

            <motion.div custom={5} variants={itemVariants} initial="hidden" animate="visible" className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowOTP(false)}
                className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                &larr; Back to Registration
              </button>
            </motion.div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}