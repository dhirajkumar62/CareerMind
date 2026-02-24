import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchCareerDetails } from "../../services/careerService";
import { motion } from "framer-motion";
import GlassCard from "../../components/GlassCard";
import SectionLabel from "../../components/SectionLabel";
import {
  Award,
  Target,
  TrendingUp,
  Briefcase,
  ArrowRight,
  ChevronRight,
  MapPin,
  DollarSign,
  Zap,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function CareerDetails() {
  const { careerId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchCareerDetails(careerId);
        setData(response);
      } catch (error) {
        console.error("Career details fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [careerId]);

  const handleGenerateRoadmap = async () => {
    try {
      setGenerating(true);
      const API = (await import("../../services/api")).default;
      await API.post("/roadmap/create", { careerId, duration: "6 Months" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <motion.div
          className="flex items-center justify-center py-20"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-lg text-gray-600 font-medium">Loading career details...</p>
        </motion.div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-gray-600 font-medium">Career not found.</p>
        </motion.div>
      </DashboardLayout>
    );
  }

  const { career, personalizedSkillGap } = data;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {

      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 }
    })
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.4 }
    })
  };

  const cardVariants = {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto relative z-10 pt-4">

        {/* Hero Profile Segment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-12 border-b border-slate-200">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionLabel icon={Target}>Career Identity</SectionLabel>
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-slate-900 leading-tight">
              {career.title}
            </h1>
            <p className="text-[15px] md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mt-6 border-l-4 border-blue-600/10 md:pl-6">
              {career.description}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGenerateRoadmap}
              disabled={generating}
              className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95 whitespace-nowrap"
            >
              <Zap className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              {generating ? "Synthesizing Roadmap..." : "Initialize Roadmap"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Stats & Skills */}
          <div className="lg:col-span-8 space-y-8">

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard delay={0.1} className="p-8 group">
                <SectionLabel icon={DollarSign}>Efficiency</SectionLabel>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market Value</p>
                  <h4 className="text-2xl font-display font-black text-slate-900">{career.averageSalary}</h4>
                </div>
              </GlassCard>

              <GlassCard delay={0.2} className="p-8 group">
                <SectionLabel icon={TrendingUp}>Velocity</SectionLabel>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Demand</p>
                  <h4 className="text-2xl font-display font-black text-slate-900">{career.industryDemand}</h4>
                </div>
              </GlassCard>

              <GlassCard delay={0.3} className="p-8 group">
                <SectionLabel icon={Briefcase}>Ecosystem</SectionLabel>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job Types</p>
                  <h4 className="text-[13px] font-bold text-slate-600 uppercase tracking-tight">{career.jobTypes?.join(", ") || "Diverse"}</h4>
                </div>
              </GlassCard>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard delay={0.4} className="h-full">
                <SectionLabel icon={Award}>Core Arsenal</SectionLabel>
                <div className="flex flex-wrap gap-2 mb-10">
                  {career.requiredSkills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-blue-50 text-[11px] font-black text-blue-700 uppercase tracking-wide border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prerequisite Map</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </GlassCard>

              <GlassCard delay={0.5} className={`h-full border-2 ${personalizedSkillGap.length > 0 ? 'border-orange-100/50 bg-orange-50/10' : 'border-emerald-100/50 bg-emerald-50/10'}`}>
                <SectionLabel icon={personalizedSkillGap.length > 0 ? AlertCircle : CheckCircle2}>Gap Analysis</SectionLabel>
                {personalizedSkillGap.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {personalizedSkillGap.map((skill, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-white border border-orange-200 text-[11px] font-bold text-orange-700 uppercase tracking-tight shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed italic border-l-2 border-orange-200 pl-4">
                      Synthesizing these modules into your arsenal will optimize your market readiness for this trajectory.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-display font-black text-slate-900 mb-2">Maximum Compatibility</h4>
                    <p className="text-[13px] text-slate-500 font-medium max-w-[200px]">
                      Your existing profile data matches this career's core tech requirements.
                    </p>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>

          {/* Right Column: Mission Context */}
          <div className="lg:col-span-4 space-y-8">
            <GlassCard delay={0.6} className="h-full bg-slate-900 border-slate-800" hover={false}>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Trajectory Logic</span>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l border-white/10 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900"></div>
                    <h5 className="text-white text-[13px] font-black uppercase tracking-tight mb-2">Identification</h5>
                    <p className="text-slate-400 text-[12px] leading-relaxed font-medium">Matching your core profile with {career.title} ecosystem requirements.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-900"></div>
                    <h5 className="text-slate-300 text-[13px] font-black uppercase tracking-tight mb-2">Optimization</h5>
                    <p className="text-slate-500 text-[12px] leading-relaxed font-medium">Bridging the identified gap through AI-synthesized learning modules.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-900"></div>
                    <h5 className="text-slate-300 text-[13px] font-black uppercase tracking-tight mb-2">Mastery</h5>
                    <p className="text-slate-500 text-[12px] leading-relaxed font-medium">Final validation of professional competence within the target industry.</p>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <p className="text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4">Mission Confidence</p>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-display font-black text-white">94%</span>
                    <span className="text-[10px] font-bold text-slate-500 mb-2">/ ADAPTATION</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer style for Display font */}
        <style>
          {`
                    @font-face {
                        font-family: 'Display';
                        src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap');
                    }
                    `}
        </style>
      </div>
    </DashboardLayout>
  );
}