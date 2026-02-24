import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import { updateProfile, changePassword } from "../../services/userService";
import { FiUser, FiLock, FiStar, FiSave, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Profile() {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState(user?.name || "");
    const [interests, setInterests] = useState(user?.interests?.join(", ") || "");
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name || 'default'}`);

    const adventurerSeeds = ["Amaya", "Milo", "Jasper", "Luna", "Felix", "Willow"];

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const updatedUser = await updateProfile({ name, interests, avatarUrl });
            setUser({ ...user, name: updatedUser.name, interests: updatedUser.interests, avatarUrl: updatedUser.avatarUrl });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setMessage({ type: "error", text: "Passwords do not match" });
        }
        setPwLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await changePassword({ oldPassword, newPassword });
            setMessage({ type: "success", text: "Password changed successfully!" });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to change password" });
        } finally {
            setPwLoading(false);
        }
    };

    const handleShuffleAvatar = () => {
        const randomSeed = Math.random().toString(36).substring(7);
        setAvatarUrl(`https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Profile</h1>
                        <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
                    </div>

                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                        >
                            {message.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                            <span className="text-sm font-medium">{message.text}</span>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Avatar Section - Spans 2 rows on Desktop */}
                        <motion.div variants={itemVariants} className="lg:col-span-1 lg:row-span-2 sticky top-32 space-y-6">
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2rem] bg-blue-50 border-4 border-white shadow-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                                        <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        onClick={handleShuffleAvatar}
                                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    </button>
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{user?.name}</h3>
                                <p className="text-slate-500 text-sm mb-8">{user?.email}</p>

                                <div className="w-full space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Quick Select</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {adventurerSeeds.map(seed => (
                                            <button
                                                key={seed}
                                                type="button"
                                                onClick={() => setAvatarUrl(`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`)}
                                                className={`aspect-square rounded-xl border-2 transition-all p-1 ${avatarUrl.includes(seed) ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-blue-200"
                                                    }`}
                                            >
                                                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`} alt={seed} className="w-full h-full" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* General Info */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <FiUser className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">General Info</h2>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 cursor-not-allowed outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Interests</label>
                                    <textarea
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none min-h-[100px]"
                                        placeholder="AI, Design, Marketing (comma separated)"
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {loading ? "Saving..." : <><FiSave /> Save Changes</>}
                                </button>
                            </form>
                        </motion.div>

                        {/* Change Password */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FiLock className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
                            </div>

                            <form onSubmit={handleChangePassword} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    disabled={pwLoading}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    {pwLoading ? "Updating..." : "Update Password"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
