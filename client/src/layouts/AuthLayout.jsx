import { motion } from "framer-motion";
import Logo from "../components/Logo";

export default function AuthLayout({ children }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] p-4 sm:p-8 font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Container - Two Columns */}
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-[1000px] min-h-[600px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Branded Panel */}
        <div className="hidden md:flex md:w-[45%] bg-[#2563eb] p-12 pr-16 flex-col justify-between text-white relative">
          <div>
            <div className="mb-14 flex items-center gap-2">
              <Logo textColorClass="text-white" />
            </div>

            <h1 className="text-[40px] font-bold leading-[1.15] mb-6 text-white tracking-tight">
              Discover your<br />true potential.
            </h1>
            <p className="text-blue-100/90 text-[17px] leading-relaxed max-w-sm">
              Take our AI-powered assessment, get personalized roadmaps, and connect with mentors in a clean, modern workflow.
            </p>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-bold text-white/90 uppercase tracking-widest mb-6">
              <span>ROADMAPS</span>
              <span className="opacity-60 text-[10px]">●</span>
              <span>ASSESSMENTS</span>
              <span className="opacity-60 text-[10px]">●</span>
              <span>MENTORS</span>
            </div>
            <p className="mt-6 text-[13px] text-blue-200/80">
              Smart, personalized, and built for you.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-[55%] p-10 sm:p-14 flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}