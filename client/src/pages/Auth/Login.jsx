import { useState } from "react";
import { loginUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);
      setAuth(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
      <div className="w-full max-w-md mx-auto pt-2">
        {/* Tabs */}
        <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible" className="flex border-b border-slate-200 mb-10 w-max">
          <button className="pb-3 px-2 mr-6 text-[14px] font-bold transition-colors border-b-2 border-blue-600 text-blue-600 tracking-wide">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="pb-3 px-2 text-[14px] font-bold transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-600 tracking-wide"
          >
            Create Account
          </button>
        </motion.div>

        {/* Headings */}
        <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
          <h2 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">Welcome back</h2>
          <p className="text-[15px] text-slate-500">Sign in to continue.</p>
        </motion.div>

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
        </AnimatePresence>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
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

          <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[13px] font-bold text-slate-700 mb-0">
                Password
              </label>
              <Link to="/forgot-password" className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-4">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold text-[15px] transition-colors disabled:opacity-50 mt-2 flex justify-center items-center shadow-sm disabled:hover:bg-[#2563eb]"
            custom={4}
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
            ) : "Login"}
          </motion.button>
        </form>
      </div>
    </AuthLayout>
  );
}