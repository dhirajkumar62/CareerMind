import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../../services/dashboardService";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FiTarget, FiArrowRight, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TargetRoles() {
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDashboardData();
                setAssessment(data.assessment);
            } catch (error) {
                console.error("Failed to fetch target roles", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    const matches = assessment?.matchedCareers || [];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Recommended Target Roles</h1>
                    <p className="text-slate-500">Discover career paths perfectly aligned with your profile and aspirations.</p>
                </div>

                {matches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match, index) => {
                            const career = typeof match.career === 'object' ? match.career : { title: 'Career Path', _id: match.career };
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 group cursor-pointer"
                                    onClick={() => navigate(`/careers/${career._id}`)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <FiTarget className="text-2xl" />
                                        </div>
                                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <FiAward /> {match.score}% Match
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {career.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mb-6 line-clamp-3">
                                        {career.description || "Explore this specialized career path designed to leverage your unique strengths and interests."}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                            <FiTrendingUp /> High Demand
                                        </div>
                                        <div className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            View details <FiArrowRight />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FiTarget className="text-3xl" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">No target roles identified yet</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">Complete your assessment to generate personalized career recommendations.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
