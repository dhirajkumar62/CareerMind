import API from "../../services/api";
import { useEffect, useState } from "react";
import { getDashboardData, toggleMilestone } from "../../services/dashboardService";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiZap, FiTarget, FiArrowRight, FiSettings, FiActivity, FiMapPin } from "react-icons/fi";

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [generating, setGenerating] = useState(false);
  const [roadmapError, setRoadmapError] = useState("");
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardData();
      if (!response.user.isProfileComplete) {
        navigate("/onboarding");
        return;
      }
      if (!response.assessment) {
        await API.post("/assessment/generate");
        const updated = await getDashboardData();
        setData(updated);
      } else {
        setData(response);
      }
    } catch (error) {
      console.error("Dashboard fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [navigate]);

  const handleGenerateRoadmap = async () => {
    setRoadmapError("");
    if (!selectedCareer) return setRoadmapError("Please select a target role.");
    if (!selectedDuration) return setRoadmapError("Please select a timeline.");

    try {
      setGenerating(true);
      await API.post("/roadmap/create", {
        careerId: selectedCareer,
        duration: selectedDuration,
      });
      await fetchDashboard();
      setSelectedCareer("");
      setSelectedDuration("");
    } catch (error) {
      setRoadmapError(
        error.response?.data?.message ||
        "Failed to synthesize roadmap. The AI engine encountered an anomaly."
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleMilestone = async (milestoneId) => {
    try {
      setData((prevData) => {
        if (!prevData?.roadmap) return prevData;
        const newMilestones = prevData.roadmap.milestones.map((m) =>
          m._id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const newCount = newMilestones.filter((m) => m.completed).length;
        const newProgress = Math.round((newCount / newMilestones.length) * 100);
        return {
          ...prevData,
          roadmap: {
            ...prevData.roadmap,
            milestones: newMilestones,
            progressPercentage: newProgress,
          },
        };
      });
      await toggleMilestone(milestoneId);
    } catch (error) {
      console.error("Failed to update milestone", error);
      fetchDashboard();
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

  if (!data) return null;

  const { user, roadmap, assessment } = data;

  const totalMilestones = roadmap?.milestones?.length || 0;
  const milestonesCompleted = roadmap?.milestones?.filter(m => m.completed).length || 0;
  const pendingMilestones = totalMilestones - milestonesCompleted;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pt-2 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight leading-none mb-2">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Visionary'}
          </h1>
          <p className="text-[15px] text-slate-500">
            Here's what's happening with your career today.
          </p>
        </div>

        {/* Top Grid Area */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Left Column (8 columns wide) */}
          <div className="xl:col-span-8 space-y-6">

            {/* Two Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-[1rem] p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <FiTarget className="text-xl" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900">Target Role</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">{roadmap?.careerPath || 'Not selected yet'}</p>
              </div>
              <div className="bg-white rounded-[1rem] p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <FiZap className="text-xl" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900">Current Phase</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">{roadmap ? 'Active execution' : 'Awaiting initialization'}</p>
              </div>
            </div>

            {/* Timeline Area (Mapped from Revenue Trend) */}
            <div className="bg-white rounded-[1rem] p-6 lg:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] min-h-[400px]">
              <h3 className="text-[17px] font-bold text-slate-900 mb-8">Career Execution Trend</h3>

              {roadmap ? (
                <div className="relative pl-2 overflow-y-auto max-h-[450px] pr-2">
                  {/* Vertical Line */}
                  <div className="absolute top-2 bottom-2 left-[23px] w-px bg-slate-200"></div>

                  <div className="space-y-6 relative">
                    {roadmap.milestones?.map((milestone, index) => {
                      const isCompleted = milestone.completed;
                      const isNext = index === (roadmap?.milestones?.findIndex(m => !m.completed) ?? -1);

                      return (
                        <div key={milestone._id || index} className="relative pl-12 group">
                          <div className={`absolute top-1.5 left-4 -translate-x-[5px] w-3 h-3 rounded-full border-2 bg-white flex items-center justify-center transition-colors z-10 ${isCompleted ? 'border-emerald-500 bg-emerald-500 outline outline-2 outline-emerald-50' :
                            isNext ? 'border-blue-500 ring-4 ring-blue-50' :
                              'border-slate-300'
                            }`}></div>

                          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div>
                                <h4 className={`text-[14px] font-bold tracking-tight ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                  Month {milestone.month} Objectives
                                </h4>
                                <div className={`mt-2 ${isCompleted ? 'opacity-60 grayscale' : ''}`}>
                                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-3">Projects</p>
                                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                                    {milestone.projects?.[0] || 'Execute sub-tasks and improve core competencies.'}
                                  </p>

                                  {milestone.skills?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      {milestone.skills.map(skill => (
                                        <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold rounded-md">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={() => handleToggleMilestone(milestone._id)}
                                className={`shrink-0 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors sm:mt-0 ${isCompleted ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' :
                                  isNext ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                                    'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                  }`}>
                                {isCompleted ? 'Undo' : 'Complete'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                  <p className="text-[13px] font-medium text-slate-400">No timeline data available yet.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (4 columns wide) */}
          <div className="xl:col-span-4 space-y-6">

            {/* Overall Progress Tracker (Mapped from Total Revenue Card) */}
            <div className="bg-white rounded-[1rem] p-6 lg:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Overall Progress</p>

              <div className="flex items-center gap-3">
                <h2 className="text-[36px] font-bold text-slate-900 tracking-tight leading-none">
                  {roadmap?.progressPercentage || 0}%
                </h2>
                <span className="bg-[#e8fbf0] text-[#059669] text-[11px] font-bold px-2.5 py-1.5 rounded-md tracking-wide">
                  + {milestonesCompleted} Completed
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mt-2">Career advancement this phase</p>

              <div className="w-full bg-slate-100 h-2 rounded-full mt-7 overflow-hidden">
                <div
                  className="bg-slate-900 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${roadmap?.progressPercentage || 0}%` }}>
                </div>
              </div>

              <div className="flex gap-4 mt-7">
                <div className="flex-1 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl p-4">
                  <div className="text-[20px] font-bold text-slate-900">{totalMilestones}</div>
                  <div className="text-[12px] font-medium text-slate-500 mt-1">Total Milestones</div>
                </div>
                <div className="flex-1 bg-[#fffaf0] hover:bg-[#fff4e0] transition-colors rounded-xl p-4">
                  <div className="text-[20px] font-bold text-[#ea580c]">{pendingMilestones}</div>
                  <div className="text-[12px] font-medium text-[#ea580c]/70 mt-1">Pending</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button onClick={() => navigate('/targets')} className="w-full bg-white rounded-[0.75rem] p-4 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-300 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="text-orange-500 bg-orange-50 p-2.5 rounded-lg">
                    <FiActivity className="text-lg" />
                  </div>
                  <span className="text-[14px] font-bold text-slate-700">View Active Targets</span>
                </div>
                <FiArrowRight className="text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full bg-white rounded-[0.75rem] p-4 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-300 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                    <FiSettings className="text-lg" />
                  </div>
                  <span className="text-[14px] font-bold text-slate-700">Profile Settings</span>
                </div>
                <FiArrowRight className="text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Lower Row Grid Area */}
        {assessment && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">

            {/* Form Area (Mapped from Add New Product) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-[1rem] p-6 lg:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-7 text-slate-900 border-b border-slate-100 pb-4">
                  <FiMapPin className="text-xl text-slate-700" />
                  <h3 className="text-[16px] font-bold">Chart Your Course</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-2">Target Role</label>
                    <div className="relative">
                      <select
                        value={selectedCareer}
                        onChange={e => setSelectedCareer(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer appearance-none"
                      >
                        <option value="" className="text-slate-500">e.g. Frontend Developer</option>
                        {assessment?.matchedCareers?.map((match) => {
                          const careerData = typeof match.career === "object" ? match.career : { _id: match.career };
                          return (
                            <option key={careerData._id} value={careerData._id}>
                              {careerData.title || "Career"} ({match.score || 0}% Match)
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-2">Duration Outline</label>
                      <div className="relative">
                        <select
                          value={selectedDuration}
                          onChange={e => setSelectedDuration(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer appearance-none"
                        >
                          <option value="">Select Plan</option>
                          <option value="3 Months">3 Months</option>
                          <option value="6 Months">6 Months</option>
                          <option value="1 Year">1 Year</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-2">Framework Type</label>
                      <select disabled className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-500 tracking-wide appearance-none cursor-not-allowed">
                        <option>General Track</option>
                      </select>
                    </div>
                  </div>

                  {roadmapError && <p className="text-[13px] text-rose-500 font-bold bg-rose-50 px-3 py-2 rounded mt-2">{roadmapError}</p>}

                  <div className="pt-2">
                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={generating || !selectedCareer || !selectedDuration}
                      className="w-full bg-[#2563eb] hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium text-[15px] py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30"
                    >
                      {generating ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Synthesizing...
                        </>
                      ) : (
                        roadmap ? 'Regenerate Configuration' : 'Generate Roadmap'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats / Skill Stats (Mapped from Revenue Stats) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-[1rem] p-6 lg:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] h-full">
                <div className="flex items-center gap-2 mb-7 text-slate-900 border-b border-slate-100 pb-4">
                  <FiPlus className="text-xl text-rose-500" />
                  <h3 className="text-[16px] font-bold">Skill Deficits</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[14px] whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-50 text-[12px] text-slate-500 font-bold tracking-wide">
                        <th className="px-4 py-3 rounded-l-lg font-semibold">Skill Required</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3 rounded-r-lg text-right">Priority Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {roadmap?.skillGap?.length > 0 ? (
                        roadmap.skillGap.slice(0, 4).map((skill, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3.5 font-medium text-slate-800">{skill}</td>
                            <td className="px-4 py-3.5"><span className="text-slate-500 text-[13px]">{i % 2 === 0 ? "Technical" : "Core Option"}</span></td>
                            <td className="px-4 py-3.5 text-right">
                              <span className="text-rose-600 font-medium text-[13px]">Action Required</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-12 text-center">
                            <p className="text-slate-400 text-[13px] italic">No skill deficit data available yet.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Wide Tables Area */}
        <div className="space-y-6 pt-2">

          {/* Recent Milestones Table (Mapped from Product Inventory / Recent Invoices) */}
          <div className="bg-white rounded-[1rem] p-6 lg:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
            <h3 className="text-[17px] font-bold text-slate-900 mb-6 tracking-tight">Recent Execution Phases</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 text-[12px] text-slate-500 font-bold tracking-wide">
                    <th className="px-5 py-3.5 rounded-l-lg">Phase #</th>
                    <th className="px-5 py-3.5">Primary Focus</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 rounded-r-lg text-right">Target Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {roadmap?.milestones?.length > 0 ? (
                    roadmap.milestones.slice(0, 5).map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 font-medium text-blue-600 cursor-pointer hover:underline">
                          PHS-{new Date().getFullYear()}{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-700">{m.skills?.[0] || 'Core Subject Area'}</td>
                        <td className="px-5 py-4">
                          {m.completed ? (
                            <span className="bg-[#e8fbf0] text-[#059669] text-[12px] font-bold px-3 py-1 rounded-full">Completed</span>
                          ) : (
                            <span className="bg-slate-100 text-slate-600 text-[12px] font-bold px-3 py-1 rounded-full">Pending Execution</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right text-slate-500 text-[13px]">
                          Month {m.month}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-5 py-12 text-center text-slate-400 italic text-[13px]">
                        No active phases to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
