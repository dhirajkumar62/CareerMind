import React, { useState, useEffect } from 'react';
import portfolioService from '../../services/portfolioService';
import DashboardLayout from '../../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import GlassCard from '../../components/GlassCard';
import SectionLabel from '../../components/SectionLabel';
import {
    User,
    Code,
    Layers,
    Mail,
    Github,
    Linkedin,
    Twitter,
    ArrowRight,
    Globe,
    Share2,
    Target,
    Zap,
    Star,
    Award
} from 'lucide-react';
const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const res = await portfolioService.getPortfolio();
            setData(res);
        } catch (err) {
            console.error('Portfolio initialization failure', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <DashboardLayout>
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 animate-pulse">Synchronizing Identity</span>
            </div>
        </DashboardLayout>
    );

    const portfolio = data?.portfolio || {};
    const roadmap = data?.roadmap || {};

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto relative z-10 pt-4 pb-24">

                {/* Identity Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-10"
                >
                    <div>
                        <h2 className="font-display font-black text-2xl tracking-tighter text-slate-900 leading-none">Identity Overview</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Verified Professional Ecosystem</span>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95"
                    >
                        <Share2 className="w-4 h-4" /> Share Identity
                    </motion.button>
                </motion.div>

                {/* The Canvas Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Main Identity Segment (Left) */}
                    <div className="lg:col-span-8 flex flex-col gap-8">

                        {/* Hero Profile Card */}
                        <GlassCard delay={0.1} hover={false} className="relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <Layers className="w-64 h-64 text-blue-600" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl relative shrink-0"
                                    >
                                        {portfolio.user?.name?.charAt(0) || 'U'}
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-blue-600 shadow-lg">
                                            <Award className="w-5 h-5" />
                                        </div>
                                    </motion.div>

                                    <div className="flex-1 text-center md:text-left">
                                        <SectionLabel icon={User}>Identity</SectionLabel>
                                        <h1 className="text-2xl md:text-3xl font-display font-black tracking-tighter text-slate-900 mb-4 leading-tight">
                                            {portfolio.headline || "Digital Specialist"}
                                        </h1>
                                        <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-2xl border-l-4 border-blue-600/10 md:pl-6 mx-auto md:mx-0">
                                            {portfolio.bio || "Crafting the future of digital experiences through deep learning and strategic engineering."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Tactical Assets Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Skills Arsenal */}
                            <GlassCard delay={0.2} className="h-full" hover={true}>
                                <SectionLabel icon={Layers}>Arsenal</SectionLabel>
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {(roadmap?.skillGap || []).concat(portfolio.user?.currentSkills || ["Design Systems", "Architecture"]).slice(0, 10).map((skill, idx) => (
                                        <span key={idx} className="px-5 py-2.5 rounded-2xl bg-blue-50/50 border border-blue-100/50 text-[11px] font-black text-blue-700 uppercase tracking-wide">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expertise Index</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-3 h-3 ${i < 5 ? 'text-blue-500 fill-blue-500' : 'text-slate-200'}`} />)}
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100 uppercase tracking-tight">Talent Verified</span>
                                </div>
                            </GlassCard>

                            {/* Latest Project Showroom */}
                            <GlassCard delay={0.3} className="relative group cursor-pointer">
                                <SectionLabel icon={Code}>Laboratory</SectionLabel>
                                <div className="space-y-4">
                                    <h4 className="text-lg font-display font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                        Autonomous Identity System
                                    </h4>
                                    <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
                                        Redefining how professionals showcase expertise through AI-driven visualization.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mt-6">
                                        Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl" />
                            </GlassCard>
                        </div>
                    </div>

                    {/* Strategic Metrics (Right) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">

                        {/* Mission/Roadmap Card */}
                        <GlassCard delay={0.4} className="flex flex-col h-full bg-gradient-to-b from-white to-slate-50">
                            <SectionLabel icon={Target}>Mission Roadmap</SectionLabel>
                            <div className="mb-8">
                                <h3 className="text-lg font-display font-black text-slate-900 tracking-tighter mb-1 uppercase">
                                    {roadmap?.careerPath || "Exploring Path"}
                                </h3>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Active Objective</p>
                            </div>

                            <div className="flex-grow space-y-10 relative pl-4 border-l-2 border-slate-100">
                                {roadmap?.milestones?.slice(0, 4).map((ms, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className={`w-3 h-3 rounded-full absolute -left-[23px] top-1 transition-all ${ms.completed ? 'bg-emerald-500 ring-4 ring-emerald-50' : 'bg-slate-200'}`}></div>
                                        <div>
                                            <p className={`text-[10px] font-black ${ms.completed ? 'text-emerald-500' : 'text-slate-400'} uppercase mb-1`}>Phase 0{ms.month}</p>
                                            <p className={`text-[14px] font-bold leading-tight ${ms.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{ms.skills[0]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap className="w-16 h-16 fill-white" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] block mb-2">Completion status</span>
                                    <div className="flex items-end gap-2 mb-4">
                                        <span className="text-[36px] font-black tracking-tighter leading-none">{roadmap?.progressPercentage || 0}%</span>
                                        <span className="text-[10px] font-bold text-slate-500 mb-1">/ TOTAL</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${roadmap?.progressPercentage || 0}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Social Connect Card Content */}
                        <GlassCard delay={0.5} className="bg-slate-50/50">
                            <SectionLabel icon={Globe}>Networks</SectionLabel>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Github, label: "Github", color: "hover:text-slate-900" },
                                    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
                                    { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
                                    { icon: Mail, label: "Email", color: "hover:text-rose-500" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ y: -5 }}
                                        className={`flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all group ${social.color}`}
                                    >
                                        <social.icon className="w-6 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mt-3">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                </div>

                {/* Cinematic Footer Segment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left"
                >
                    <div className="max-w-md">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Security Verification Protocol</span>
                        <p className="text-[11px] font-bold text-slate-500 mt-2 leading-relaxed">
                            This identity is cryptographically signed and verified by the CareerMinds core intelligence network. (SHA-256 Ver. 2.50)
                        </p>
                    </div>

                    <div className="flex gap-10">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xl font-black text-slate-900">2026</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Year of Origin</span>
                        </div>
                        <div className="w-px h-12 bg-slate-100"></div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xl font-black text-slate-900 uppercase">CM-ID</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System Model</span>
                        </div>
                    </div>

                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                        &copy; CareerMinds Labs • All Rights Reserved
                    </p>
                </motion.div>

            </div >

            {/* Decorative Blob Bloom */}
            < div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse" ></div >

            <style>
                {`
        @font-face {
          font-family: 'Display';
          src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap');
        }
        `}
            </style>
        </DashboardLayout >
    );
};

export default Portfolio;
