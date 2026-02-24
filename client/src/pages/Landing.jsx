import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 } }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 } })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 py-12 selection:bg-blue-500 selection:text-white pt-32 pb-32">
        {/* Background Animated Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[100px] opacity-70 mix-blend-multiply"
            animate={{ y: [0, 50, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[100px] opacity-70 mix-blend-multiply"
            animate={{ y: [0, -40, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div className="w-full max-w-5xl z-10 pt-20" variants={containerVariants} initial="hidden" animate="visible">

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 mb-32 z-10 relative">
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div variants={titleVariants} className="inline-block mb-5">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold text-xs md:text-sm rounded-full tracking-wide uppercase border border-blue-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Next-Gen AI Career Discovery
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-[4rem] font-display font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]"
                variants={titleVariants}
              >
                Design your future with <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CareerMinds.</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0"
                variants={itemVariants}
              >
                Not marks. Not degrees. Just skills and direction. AI-powered matching to discover careers tailored exactly to your strengths.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => navigate("/register")}
                  className="relative px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all text-[15px] group flex items-center justify-center gap-2 overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px -15px rgba(37,99,235,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Today
                    <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                <motion.button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-bold transition-all text-[15px] flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log into Account
                </motion.button>
              </motion.div>
            </div>

            {/* Right Graphic / Abstract UI animation */}
            <motion.div
              className="lg:w-1/2 relative w-full max-w-lg mx-auto h-[450px] lg:h-[550px] mt-12 lg:mt-0"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-indigo-100/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

              {/* Decorative dotted grid */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #94a3b8 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

              {/* Main abstract card */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-72 h-80 bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 z-20 flex flex-col"
                animate={{ y: ["-50%", "-52%", "-50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <div className="flex gap-1.5 opacity-80">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-3/4 bg-slate-100 rounded-full"></div>
                  <div className="h-3 w-1/2 bg-slate-100 rounded-full"></div>
                  <div className="h-3 w-5/6 bg-slate-100 rounded-full"></div>
                  <div className="h-3 w-2/3 bg-slate-100 rounded-full"></div>
                </div>
                <div className="mt-auto h-24 w-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-inner overflow-hidden relative group">
                  <div className="absolute inset-0 bg-white/20 w-full -skew-x-12 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-white font-bold tracking-wider text-sm">Path Initialized</div>
                </div>
              </motion.div>

              {/* Floating element 1 */}
              <motion.div
                className="absolute top-8 md:top-16 -right-4 md:right-4 w-48 bg-white shadow-xl border border-slate-100 rounded-2xl p-4 z-30"
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Match Found</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Software Architect • 98% Fit</div>
              </motion.div>

              {/* Floating element 2 */}
              <motion.div
                className="absolute bottom-12 md:bottom-20 -left-4 md:left-4 w-52 bg-white shadow-xl border border-slate-100 rounded-2xl p-4 z-30"
                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Milestone</span>
                    <span className="text-sm font-bold text-slate-800">React Mastery</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 shadow-inner">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full w-2/3"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mb-24 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

          {/* Feature Bento Box */}
          <div id="features" className="text-center mb-16 relative">
            <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">How it works</motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 max-w-2xl mx-auto text-lg">Everything you need to discover, map, and achieve your dream career in one intelligent platform.</motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left relative z-10"
            variants={itemVariants}
          >
            {/* Animated line behind cards on desktop */}
            <div className="hidden md:block absolute top-[64px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-[1px]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {[
              {
                title: "Smart Career Matching",
                desc: "Take our rapid AI assessment to uncover careers that naturally align with your skills.",
                visual: (
                  <div className="w-full h-48 md:h-56 bg-slate-50 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden shadow-sm border border-slate-200/60 p-4 gap-2 md:gap-4">
                    <motion.div
                      className="w-24 md:w-32 h-28 md:h-32 bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-3 flex flex-col justify-between relative transform -rotate-6 translate-y-4"
                      whileHover={{ y: 0, rotate: 0 }}
                    >
                      <div>
                        <div className="text-[10px] md:text-xs font-bold text-slate-800">Software Eng.</div>
                        <div className="text-[8px] md:text-[10px] text-slate-400">Analytical</div>
                      </div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 self-end overflow-hidden flex items-center justify-center">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                      </div>
                    </motion.div>
                    <motion.div
                      className="w-28 md:w-36 h-32 md:h-36 bg-[#F3EFEA] border border-orange-200 shadow-[0_8px_30px_-4px_rgba(251,146,60,0.15)] rounded-2xl p-3 md:p-4 flex flex-col justify-between relative z-10"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div>
                        <div className="text-xs md:text-sm font-bold text-slate-900">React Dev</div>
                        <div className="text-[10px] md:text-xs text-slate-500">Creative Focus</div>
                      </div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-400 p-[2px] self-end bg-white overflow-hidden flex items-center justify-center">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-slate-400 bg-slate-100 rounded-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                      </div>
                    </motion.div>
                    <motion.div
                      className="w-24 md:w-32 h-28 md:h-32 bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-3 flex flex-col justify-between relative transform rotate-6 translate-y-4"
                      whileHover={{ y: 0, rotate: 0 }}
                    >
                      <div>
                        <div className="text-[10px] md:text-xs font-bold text-slate-800">Product</div>
                        <div className="text-[8px] md:text-[10px] text-slate-400">Leadership</div>
                      </div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 self-end overflow-hidden flex items-center justify-center">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                      </div>
                    </motion.div>
                  </div>
                )
              },
              {
                title: "Personalized Roadmaps",
                desc: "Get an actionable step-by-step path detailing exactly what to learn and how long it'll take.",
                visual: (
                  <div className="w-full h-48 md:h-56 bg-slate-50/50 rounded-2xl mb-8 flex flex-col items-center justify-center relative overflow-hidden border border-slate-200/60 p-4">
                    <div className="absolute w-[2px] h-full bg-slate-200 left-10 md:left-14 top-0"></div>

                    <motion.div className="w-full pl-6 md:pl-10 pr-2 py-2 relative flex items-center gap-3 md:gap-4" whileHover={{ x: 5 }}>
                      <div className="w-8 h-8 shrink-0 rounded-full bg-white text-blue-500 font-bold text-xs flex items-center justify-center z-10 shadow-sm border border-slate-200">1</div>
                      <div className="h-10 md:h-12 bg-white border border-slate-100 shadow-sm rounded-xl w-full flex items-center px-4">
                        <div className="h-2 w-1/2 bg-slate-200 rounded-full"></div>
                      </div>
                    </motion.div>

                    <motion.div className="w-full pl-6 md:pl-10 pr-2 py-2 relative flex items-center gap-3 md:gap-4" whileHover={{ x: 5 }}>
                      <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center z-10 shadow-md shadow-blue-500/30">2</div>
                      <div className="h-10 md:h-12 bg-white border border-blue-100 shadow-[0_8px_30px_-4px_rgba(37,99,235,0.15)] rounded-xl w-full flex items-center px-4 justify-between scale-105 origin-left">
                        <div className="h-2 w-1/3 bg-blue-500 rounded-full"></div>
                        <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                      </div>
                    </motion.div>

                    <motion.div className="w-full pl-6 md:pl-10 pr-2 py-2 relative flex items-center gap-3 md:gap-4" whileHover={{ x: 5 }}>
                      <div className="w-8 h-8 shrink-0 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center z-10 border border-slate-200">3</div>
                      <div className="h-10 md:h-12 bg-slate-50 border border-slate-100 rounded-xl w-full flex items-center px-4 opacity-70">
                        <div className="h-2 w-1/4 bg-slate-200 rounded-full"></div>
                      </div>
                    </motion.div>
                  </div>
                )
              },
              {
                title: "24/7 AI Mentor",
                desc: "Access an intelligent AI guide specifically trained to offer career advice, resume tips, and interview prep.",
                visual: (
                  <div className="w-full h-48 md:h-56 bg-slate-50 rounded-2xl mb-8 flex flex-col relative overflow-hidden shadow-inner border border-slate-200/60 p-4">
                    <div className="w-full bg-white backdrop-blur-md rounded-xl border border-slate-200 p-2.5 flex items-center gap-3 mb-2 shadow-sm relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center shadow-inner">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-[11px] md:text-xs font-bold text-slate-800 leading-none mb-1">Career AI</div>
                        <div className="text-[8px] md:text-[9px] text-emerald-500 font-bold leading-none uppercase tracking-wider">Online</div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-hidden space-y-3 pt-2 px-1">
                      <motion.div className="flex items-end gap-2 justify-end" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm text-[10px] md:text-[11px] text-slate-600 max-w-[80%] font-medium">
                          Transition to UX?
                        </div>
                      </motion.div>
                      <motion.div className="flex items-end gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                        <div className="w-6 h-6 rounded-full bg-[#0F172A] shrink-0 shadow-sm shadow-slate-300 mb-1"></div>
                        <div className="bg-[#0F172A] px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-md text-[10px] md:text-[11px] text-white max-w-[85%] leading-relaxed font-medium">
                          I can help! Let's review transferring your skills.
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 rounded-[2.5rem] flex flex-col hover:border-slate-300 transition-colors duration-300"
                variants={cardVariants}
                custom={i}
              >
                {feature.visual}
                <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div id="mentorship"></div>

          {/* New Bottom Call to Action Section (Redesigned Light Theme) */}
          <motion.div
            className="mt-32 w-[90%] md:w-[85%] max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col md:flex-row gap-10 md:gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Background element */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-blue-50/50 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Left Column (Checkboxes and CTA) */}
            <div className="w-full md:w-1/2 flex flex-col text-left relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Meet your <span className="text-blue-600">Personal AI Mentor</span>
              </motion.h2>

              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8"></div>

              <div className="flex flex-col mb-10 gap-3">
                {[
                  "24/7 Personalized Guidance",
                  "Skill Gap Analysis & Improvement",
                  "Mock Interview & Resume Prep",
                  "Real-time Industry Insights"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl group hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] md:text-[16px] font-semibold text-slate-700 tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => navigate("/register")}
                className="self-start px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_25px_-6px_rgba(37,99,235,0.6)] hover:bg-blue-700 hover:-translate-y-1 transition-all text-[15px] relative z-10 flex items-center gap-3 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Start Your Assessment
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </motion.button>
            </div>

            {/* Right Column (Visual Area) */}
            <div className="w-full md:w-1/2 relative z-10 h-[300px] md:h-[400px] min-h-[300px]">
              <motion.div
                className="w-full h-full absolute inset-0 rounded-[2rem] border border-slate-200 bg-slate-50/50 overflow-hidden flex items-center justify-center shadow-inner group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {/* Visual dotted grid */}
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                {/* AI Mentor Chat Interface Visual */}
                <div className="relative w-full h-full max-w-[320px] max-h-[320px] mx-auto flex flex-col items-center justify-center p-6">
                  {/* Chat Bubbles */}
                  <motion.div
                    className="self-end bg-blue-600 text-white rounded-2xl rounded-br-none px-4 py-2 text-xs font-bold shadow-lg mb-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    Recommend me a course for AI?
                  </motion.div>

                  <motion.div
                    className="self-start bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-bl-none px-4 py-3 text-xs font-medium shadow-md flex items-start gap-3 w-[90%]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <p className="leading-relaxed">Based on your skills, I'd suggest starting with <strong>Advanced Machine Learning</strong> on Coursera.</p>
                  </motion.div>
                </div>

                {/* Floating popup */}
                <motion.div className="absolute top-6 right-6 bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-4 py-2 rounded-xl flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-50"></div>
                  <span className="text-xs font-bold text-slate-700">Analyzing Fit...</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
      <Footer />
    </>
  );
}