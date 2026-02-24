import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getUserRoadmap,
  toggleMilestone,
} from "../../services/roadmapService";
import { motion } from "framer-motion";
import { FiTarget, FiActivity } from "react-icons/fi";

export default function RoadmapView() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = async () => {
    try {
      const data = await getUserRoadmap();
      setRoadmap(data);
    } catch (error) {
      console.error("Roadmap fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleToggle = async (id) => {
    try {
      await toggleMilestone(id);
      fetchRoadmap();
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!roadmap) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto pt-10">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-sm flex items-center justify-center mb-6">
              <span className="text-4xl text-slate-400">🗺️</span>
            </div>
            <h3 className="text-[22px] font-bold text-slate-900 tracking-tight mb-2">No roadmap generated yet</h3>
            <p className="text-[14px] text-slate-500 max-w-md">Your personalized career execution plan will appear here once you generate it from the Dashboard.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const totalMilestones = roadmap?.milestones?.length || 0;
  const milestonesCompleted = roadmap?.milestones?.filter(m => m.completed).length || 0;
  const pendingMilestones = totalMilestones - milestonesCompleted;

  return (
    <DashboardLayout>
      <motion.div
        className="max-w-5xl mx-auto space-y-6 pt-2 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight leading-none mb-2">
            My Roadmap
          </h1>
          <p className="text-[15px] text-slate-500">
            Track your personalized execution path toward your target role.
          </p>
        </motion.div>

        {/* Top Info Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Details Card */}
          <div className="bg-white rounded-[1rem] p-6 sm:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiTarget className="text-xl" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">Target Path</h3>
                <p className="text-[18px] font-bold text-slate-900">{roadmap.careerPath}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[13px] font-medium text-slate-500">Target Duration:</span>
              <span className="text-[14px] font-bold text-slate-800 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">{roadmap.duration}</span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-[1rem] p-6 sm:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiActivity /> Overall Execution
              </h3>
              <span className="bg-[#e8fbf0] text-[#059669] text-[12px] font-bold px-3 py-1 rounded-full">
                {roadmap.progressPercentage}% Complete
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-1000"
                style={{ width: `${roadmap.progressPercentage}%` }}>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <div className="text-[18px] font-bold text-slate-900">{milestonesCompleted}</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mt-1">Completed</div>
              </div>
              <div className="flex-1 bg-[#fffaf0] rounded-xl p-3 text-center border border-[#fff4e0]">
                <div className="text-[18px] font-bold text-[#ea580c]">{pendingMilestones}</div>
                <div className="text-[11px] font-bold text-[#ea580c]/70 uppercase tracking-wide mt-1">Pending</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Timeline Layout */}
        <motion.div variants={itemVariants} className="bg-white rounded-[1rem] p-6 sm:p-10 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] min-h-[500px]">
          <h3 className="text-[18px] font-bold text-slate-900 mb-8 tracking-tight">Milestone Breakdown</h3>

          <div className="relative pl-3">
            {/* Vertical Timeline Line */}
            {roadmap.milestones?.length > 0 && (
              <div className="absolute top-4 bottom-8 left-[27px] w-px bg-slate-200"></div>
            )}

            <div className="space-y-8 relative">
              {roadmap.milestones?.map((milestone, index) => {
                const isCompleted = milestone.completed;
                const isNext = index === (roadmap?.milestones?.findIndex(m => !m.completed) ?? -1);

                return (
                  <div key={milestone._id || index} className="relative pl-14 group">
                    {/* Dot Indicator */}
                    <div className={`absolute top-4 left-[11px] -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center transition-all z-10 ${isCompleted ? 'border-emerald-500 bg-emerald-500 outline outline-4 outline-emerald-50' :
                        isNext ? 'border-blue-500 ring-4 ring-blue-50' :
                          'border-slate-300'
                      }`}></div>

                    {/* Content Card */}
                    <div className={`bg-white rounded-2xl p-6 sm:p-8 transition-colors ${isCompleted ? 'border border-emerald-100 bg-[#fbfdfc] opacity-80' :
                        isNext ? 'border-2 border-blue-100 shadow-sm' :
                          'border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:border-slate-200'
                      }`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div className="flex-1">
                          <h4 className={`text-[18px] font-bold tracking-tight mb-3 ${isCompleted ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-900'}`}>
                            Month {milestone.month} Objectives
                          </h4>

                          {/* Projects Block */}
                          {milestone.projects?.length > 0 && (
                            <div className={`mb-6 ${isCompleted ? 'grayscale opacity-75' : ''}`}>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Core Projects</p>
                              <div className="space-y-2">
                                {milestone.projects.map((project, idx) => (
                                  <p key={idx} className="text-[14px] text-slate-600 leading-relaxed font-medium bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                    {project}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Skills Block */}
                          {milestone.skills?.length > 0 && (
                            <div className={`${isCompleted ? 'grayscale opacity-75' : ''}`}>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skills to Acquire</p>
                              <div className="flex flex-wrap gap-2">
                                {milestone.skills.map((skill, idx) => (
                                  <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-[12px] font-bold rounded-lg shadow-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleToggle(milestone._id)}
                          className={`shrink-0 text-[12px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all sm:mt-0 ${isCompleted ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' :
                              isNext ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20' :
                                'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}>
                          {isCompleted ? 'Revert Phase' : 'Complete Phase'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}