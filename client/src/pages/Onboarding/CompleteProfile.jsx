import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const STRENGTH_OPTIONS = ["Problem Solving", "Communication", "Leadership", "Creativity", "Technical", "Analytical", "Adaptable"];
const MINDSET_OPTIONS = [
  { id: "Analytical", label: "Analytical", desc: "You rely on data & logic.", icon: "🧠" },
  { id: "Creative", label: "Creative", desc: "You love thinking outside the box.", icon: "🎨" },
  { id: "Practical", label: "Practical", desc: "You are hands-on & execution-focused.", icon: "🛠️" },
  { id: "Entrepreneurial", label: "Entrepreneurial", desc: "You see opportunities & build them.", icon: "🚀" },
  { id: "Explorative", label: "Explorative", desc: "You are curious & love learning.", icon: "🔭" },
];
const ASPIRATION_OPTIONS = [
  { id: "Study Abroad", label: "Study Abroad", desc: "Looking for international degrees" },
  { id: "Ivy League", label: "Ivy League", desc: "Targeting top-tier global universities" },
  { id: "Government Job", label: "Government / PSU", desc: "Preparing for UPSC, SSC, state exams" },
  { id: "Top Indian College", label: "Top Indian College", desc: "IIT, NIT, IIM, or similar" },
  { id: "Tech Corporate", label: "Tech Corporate", desc: "FAANG or large MNCs" },
  { id: "Startup", label: "Startup / Business", desc: "Building your own company" },
  { id: "Not Sure", label: "Not Sure Yet", desc: "Just exploring my options" },
];

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    interests: "",
    strengths: [],
    mindsetType: "",
    currentSkills: "",
    aspirations: [],
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleSelection = (field, value) => {
    setFormData((prev) => {
      const currentList = prev[field];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter((i) => i !== value) };
      } else {
        return { ...prev, [field]: [...currentList, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.put("/user/complete-profile", {
        interests: formData.interests.split(",").map((s) => s.trim()),
        strengths: formData.strengths,
        mindsetType: formData.mindsetType,
        currentSkills: formData.currentSkills.split(",").map((s) => s.trim()),
        aspirations: formData.aspirations,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Profile completion failed");
      console.error("Profile completion failed", error);
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0, transition: { duration: 0.3 } }),
  };

  const isStepValid = () => {
    if (step === 1) return formData.interests.length > 0 && formData.currentSkills.length > 0;
    if (step === 2) return formData.strengths.length > 0;
    if (step === 3) return formData.mindsetType !== "";
    if (step === 4) return formData.aspirations.length > 0;
    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-2 block">Step 1 of {totalSteps}</span>
              <h2 className="text-3xl font-display font-bold text-slate-800">What are you into right now?</h2>
              <p className="text-slate-500 mt-2">Let's start with your current skills and passions.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What subjects or topics interest you? 💡</label>
              <input
                type="text"
                placeholder="e.g. Mathematics, Coding, Art, Space, Marketing"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-800 text-lg transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What skills do you already have? 🛠️</label>
              <input
                type="text"
                placeholder="e.g. HTML, Public Speaking, Video Editing"
                value={formData.currentSkills}
                onChange={(e) => setFormData({ ...formData, currentSkills: e.target.value })}
                className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-800 text-lg transition-all"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-2 block">Step 2 of {totalSteps}</span>
              <h2 className="text-3xl font-display font-bold text-slate-800">What are your superpowers?</h2>
              <p className="text-slate-500 mt-2">Select the strengths that best describe you.</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {STRENGTH_OPTIONS.map((strength) => (
                <button
                  key={strength}
                  type="button"
                  onClick={() => toggleSelection("strengths", strength)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 border-2 ${formData.strengths.includes(strength)
                      ? "border-blue-500 bg-blue-50 text-blue-700 scale-105 shadow-md shadow-blue-500/10"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                >
                  {strength}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-2 block">Step 3 of {totalSteps}</span>
              <h2 className="text-3xl font-display font-bold text-slate-800">How do you approach a problem?</h2>
              <p className="text-slate-500 mt-2">Pick the mindset that resonates most with how your brain works.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {MINDSET_OPTIONS.map((mindset) => (
                <button
                  key={mindset.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, mindsetType: mindset.id })}
                  className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 border-2 ${formData.mindsetType === mindset.id
                      ? "border-emerald-500 bg-emerald-50 scale-[1.02] shadow-emerald-500/10 shadow-lg"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <div className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">{mindset.icon}</div>
                  <div>
                    <h4 className={`text-lg font-bold ${formData.mindsetType === mindset.id ? "text-emerald-700" : "text-slate-800"}`}>{mindset.label}</h4>
                    <p className="text-slate-500 text-sm mt-1">{mindset.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-2 block">Final Step 🎉</span>
              <h2 className="text-3xl font-display font-bold text-slate-800">What is your ultimate goal?</h2>
              <p className="text-slate-500 mt-2">Select your aspirations so our AI knows exactly where directing you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ASPIRATION_OPTIONS.map((aspiration) => (
                <button
                  key={aspiration.id}
                  type="button"
                  onClick={() => toggleSelection("aspirations", aspiration.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 border-2 ${formData.aspirations.includes(aspiration.id)
                      ? "border-purple-500 bg-purple-50 scale-[1.02] shadow-purple-500/10 shadow-lg"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <h4 className={`text-lg font-bold ${formData.aspirations.includes(aspiration.id) ? "text-purple-700" : "text-slate-800"}`}>{aspiration.label}</h4>
                  <p className="text-slate-500 text-sm mt-1">{aspiration.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 selection:bg-blue-100">

      {/* Progress Bar Header */}
      <div className="w-full max-w-2xl mb-12 flex items-center justify-between">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">✓</div>
        <div className="h-1 flex-1 bg-slate-200 mx-4 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step === totalSteps ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>🚀</div>
      </div>

      <motion.div
        className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-2xl p-8 md:p-12 overflow-hidden relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg font-medium text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative min-h-[400px] flex flex-col">
          <div className="flex-1 pb-8">
            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={step}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full w-full"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
            <button
              type="button"
              onClick={handlePrev}
              className={`px-6 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-100 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-8 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold tracking-wide transition-all disabled:opacity-30 disabled:hover:bg-slate-900 shadow-md flex items-center gap-2 group"
              >
                Continue
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !isStepValid()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "Generating Journey..." : "Complete Setup ✨"}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}