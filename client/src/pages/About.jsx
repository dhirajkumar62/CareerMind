import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white pt-32 pb-20 selection:bg-blue-600 selection:text-white relative overflow-hidden">
                {/* Soft Decorative Background Elements */}
                <div className="absolute top-0 right-0 -z-10 w-[40%] h-[40%] bg-blue-50/60 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] -z-10 w-[30%] h-[30%] bg-indigo-50/50 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Story Content - 7 columns on large screens */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.15]">
                            Guidance for the <br />
                            <span className="text-blue-600 underline decoration-blue-100 decoration-8 underline-offset-[12px]">next generation.</span>
                        </h1>

                        <div className="space-y-8 text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                            <p>
                                In India, the transition after the 10th or 12th grade is a pivotal yet chaotic moment. Too many students find themselves choosing paths based on pressure rather than a clear view of the modern world.
                            </p>

                            <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-2xl italic text-[17px] text-slate-700">
                                "In 12th class, I had no idea what to do. I followed the common advice and pursued a B.Tech degree, not because of a plan, but because it's what I was told to do. We built CareerMinds so no one has to hustle in the dark like that again."
                            </div>

                            <p>
                                Whether you're finishing school, graduating, or planning to study abroad, we provides the direct, data-driven map you need to move forward with absolute confidence.
                            </p>
                        </div>

                        <motion.div className="mt-12 flex flex-col sm:flex-row gap-5" variants={itemVariants}>
                            <button
                                onClick={() => navigate("/register")}
                                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
                            >
                                Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Abstract Visual Design - 5 columns on large screens */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-5 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[320px] lg:max-w-none aspect-square">
                            {/* Modern Glassmorphic Box UI Elements */}
                            <motion.div
                                className="absolute top-0 right-0 w-[85%] h-[85%] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] z-20 overflow-hidden flex flex-col p-6 space-y-4"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
                                    <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                                    <div className="h-3 w-5/6 bg-slate-100 rounded-full" />
                                </div>
                                <div className="mt-auto h-24 w-full bg-blue-600/5 rounded-2xl border-2 border-dashed border-blue-100" />
                            </motion.div>

                            {/* Second Floating Element */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-blue-600 border border-blue-500 shadow-2xl shadow-blue-500/40 rounded-[2.5rem] z-30 p-5 text-white flex flex-col justify-end"
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Status</div>
                                <div className="font-bold text-sm">Path Initialized</div>
                            </motion.div>

                            {/* Abstract circle backdrop */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-slate-50 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Minimal Feature Highlights */}
                <motion.div
                    className="max-w-6xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {[
                        { title: "Direct Outcome", desc: "No more confusing options. One definitive path based on your true strengths." },
                        { title: "Smart Matching", desc: "Sophisticated AI that maps your skills to industry job markets." },
                        { title: "Real Direction", desc: "Designed for students who are tired of guessing what's next." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="group"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
