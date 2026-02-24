import { useState, useEffect } from "react";
import { forgotPassword, resetPassword } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Step 1: Request OTP, Step 2: Reset Password
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Optional: Timer for resending OTP if they get stuck on step 2
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (step === 2 && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, resendTimer]);

    const handleRequestOtp = async (e) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            const data = await forgotPassword({ email });
            setSuccessMsg(data.message || "A password reset OTP has been sent to your email.");
            setStep(2);
            setResendTimer(60);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            const data = await resetPassword({ email, otp, newPassword });
            setSuccessMsg(data.message || "Password reset successfully!");
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password. Check your OTP.");
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
            <div className="w-full max-w-md mx-auto pt-2 relative min-h-[400px]">
                {/* Headings */}
                <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
                    <h2 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">
                        {step === 1 ? "Forgot your password?" : "Reset your password"}
                    </h2>
                    <p className="text-[15px] text-slate-500">
                        {step === 1
                            ? "Enter your email address to receive a password reset code."
                            : `We sent a reset code to ${email}.`}
                    </p>
                </motion.div>

                {/* Messages */}
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

                    {successMsg && !error && (
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

                {step === 1 ? (
                    <form className="space-y-6" onSubmit={handleRequestOtp}>
                        <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
                            <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold text-[15px] transition-colors disabled:opacity-50 mt-2 flex justify-center items-center shadow-sm disabled:hover:bg-[#2563eb]"
                            custom={3}
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
                            ) : "Send Reset Link"}
                        </motion.button>

                        <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible" className="text-center pt-2">
                            <Link to="/login" className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors">
                                &larr; Back to Login
                            </Link>
                        </motion.div>
                    </form>
                ) : (
                    <form className="space-y-6" onSubmit={handleResetPassword}>
                        <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
                            <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                6-Digit Reset Code
                            </label>
                            <input
                                type="text"
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

                        <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
                            <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError("");
                                }}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[15px] text-slate-900 transition-all font-medium placeholder:text-slate-400"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading || otp.length !== 6 || newPassword.length < 6}
                            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-[16px] transition-colors disabled:opacity-50 flex items-center justify-center shadow-sm disabled:hover:bg-[#2563eb]"
                            custom={4}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={(otp.length === 6 && newPassword.length >= 6) ? { y: -1 } : {}}
                            whileTap={(otp.length === 6 && newPassword.length >= 6) ? { y: 0 } : {}}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : "Reset Password"}
                        </motion.button>

                        <motion.div custom={5} variants={itemVariants} initial="hidden" animate="visible" className="text-center">
                            <button
                                type="button"
                                onClick={handleRequestOtp}
                                disabled={resendTimer > 0 || loading}
                                className={`text-[13px] font-bold transition-colors ${resendTimer > 0 || loading
                                        ? "text-slate-400 cursor-not-allowed"
                                        : "text-blue-600 hover:text-blue-800 underline underline-offset-4"
                                    }`}
                            >
                                {resendTimer > 0
                                    ? `Resend Code in ${resendTimer}s`
                                    : "Resend Code"}
                            </button>
                        </motion.div>

                        <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible" className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setStep(1);
                                    setOtp("");
                                    setError("");
                                    setSuccessMsg("");
                                }}
                                className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                &larr; Start Over
                            </button>
                        </motion.div>
                    </form>
                )}
            </div>
        </AuthLayout>
    );
}
