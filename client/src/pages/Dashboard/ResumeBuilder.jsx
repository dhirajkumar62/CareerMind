import React, { useState, useEffect } from 'react';
import resumeService from '../../services/resumeService';
import DashboardLayout from '../../layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    RefreshCw,
    AlertCircle,
    Mail,
    Phone,
    Globe,
    Sparkles,
    Award,
    Printer
} from 'lucide-react';

const ResumeBuilder = () => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            setLoading(true);
            const data = await resumeService.getResume();
            setResume(data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 404) {
                setResume(null);
            } else {
                console.error('Resume fetch inhibited', err.message);
                setError('Integration error. Please verify server connectivity.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            const data = await resumeService.generateResume();
            setResume(data);
            setError(null);
        } catch (err) {
            setError('AI Synthesis engine error. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    const handleDownloadPDF = () => {
        window.print();
    };

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto relative z-10 pt-4">

                {/* Header Segment */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-12 border-b border-slate-200">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                                <Award className="w-3 h-3" /> CareerMinds Verified
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-900 leading-tight">
                            Professional <br /> Resume Builder
                        </h1>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95"
                        >
                            <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                            {resume ? 'Regenerate with AI' : 'Generate with AI'}
                        </button>

                        {resume && (
                            <button
                                onClick={handleDownloadPDF}
                                className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                            >
                                <Printer className="w-4 h-4" /> Export PDF
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 p-5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center gap-4"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-tight">{error}</span>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {!resume && !generating ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="p-16 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-8 border border-blue-100">
                                <FileText className="w-8 h-8 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-display font-bold mb-4 tracking-tight text-slate-900">No Resume Generated Yet</h2>
                            <p className="text-slate-500 max-w-sm mx-auto mb-8 text-lg font-medium leading-relaxed">
                                Click the button above to let Gemini analyze your profile and roadmap to build your professional resume.
                            </p>
                            <div className="flex justify-center items-center gap-4 opacity-20">
                                <Award className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">CareerMinds Verified</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                            id="resume-content"
                        >
                            {generating && (
                                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-blue-200">
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
                                    </div>
                                    <p className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Synthesizing Document...</p>
                                </div>
                            )}

                            {resume && (
                                <div className={`p-10 md:p-16 rounded-[2.5rem] border border-slate-200 bg-white shadow-xl relative transition-all duration-700 ${generating ? 'opacity-30 blur-sm grayscale' : ''}`}>

                                    {/* Header */}
                                    <header className="mb-12 border-b border-slate-100 pb-10">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-display font-black text-slate-900 mb-6 tracking-tight">
                                                    {resume.personalInfo?.fullName}
                                                </h2>
                                                <div className="flex flex-wrap gap-y-4 gap-x-8 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                                                    {resume.personalInfo?.email && (
                                                        <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-blue-500" /> {resume.personalInfo.email}</div>
                                                    )}
                                                    {resume.personalInfo?.phone && (
                                                        <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-blue-500" /> {resume.personalInfo.phone}</div>
                                                    )}
                                                    {resume.personalInfo?.location && (
                                                        <div className="flex items-center gap-2.5"><Globe className="w-4 h-4 text-blue-500" /> {resume.personalInfo.location}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </header>

                                    {/* Summary */}
                                    <section className="mb-12">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center gap-4">
                                            <span>Executive Summary</span>
                                            <div className="h-px flex-1 bg-slate-100"></div>
                                        </h3>
                                        <p className="text-[15px] md:text-lg text-slate-600 leading-relaxed font-medium italic">
                                            {resume.summary}
                                        </p>
                                    </section>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                                        <div className="md:col-span-8 space-y-16">
                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                                                    <span>Professional Timeline</span>
                                                    <div className="h-px flex-1 bg-slate-100"></div>
                                                </h3>
                                                <div className="space-y-12">
                                                    {resume.experience?.map((exp, idx) => (
                                                        <div key={idx} className="relative">
                                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                                                <div>
                                                                    <h4 className="text-[16px] font-bold text-slate-900 tracking-tight">{exp.title}</h4>
                                                                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{exp.company} • {exp.location}</p>
                                                                </div>
                                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 h-fit whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {exp.description?.map((bullet, bIdx) => (
                                                                    <li key={bIdx} className="text-slate-500 flex gap-3 text-[13px] md:text-sm leading-relaxed">
                                                                        <span className="text-blue-400 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-500"></span>
                                                                        {bullet}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>

                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 flex items-center gap-4">
                                                    <span>Laboratory Projects</span>
                                                    <div className="h-px flex-1 bg-slate-100"></div>
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    {resume.projects?.map((project, idx) => (
                                                        <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
                                                            <h4 className="text-[15px] font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{project.name}</h4>
                                                            <p className="text-[11px] text-slate-500 mb-4 font-medium leading-relaxed">{project.description}</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {project.technologies?.map((tech, tIdx) => (
                                                                    <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white text-slate-500 text-[9px] font-black uppercase tracking-tight border border-slate-200 shadow-sm">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>

                                        <div className="md:col-span-4 space-y-16">
                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 border-b border-slate-100 pb-2">Technical Arsenal</h3>
                                                <div className="space-y-10">
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Core Competencies</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {resume.skills?.technical?.map((skill, idx) => (
                                                                <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[10px] font-bold text-slate-600 uppercase shadow-sm tracking-tight">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Strategic Skills</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {resume.skills?.soft?.map((skill, idx) => (
                                                                <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[10px] font-bold text-slate-600 uppercase shadow-sm tracking-tight">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 border-b border-slate-100 pb-2">Education</h3>
                                                <div className="space-y-8">
                                                    {resume.education?.map((edu, idx) => (
                                                        <div key={idx}>
                                                            <h4 className="text-[15px] font-bold text-slate-900 tracking-tighter leading-tight uppercase mb-1">{edu.degree}</h4>
                                                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">{edu.school}</p>
                                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{edu.graduationDate}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>
                {`
        @media print {
          @page { margin: 1cm; size: A4; }
          
          /* Force everything visible - override Framer Motion inline styles */
          *, *::before, *::after {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }

          body { background: white !important; margin: 0; padding: 0; }
          
          /* Hide navigation, buttons, and layout chrome */
          nav, button, footer, header, .fixed, [role="navigation"] { 
            display: none !important; 
          }
          
          /* Reset DashboardLayout wrapper */
          .min-h-screen { 
            min-height: 0 !important; 
            padding: 0 !important; 
            margin: 0 !important;
            background: white !important;
          }
          .pt-32 { padding-top: 0 !important; }
          
          /* Force resume content to be visible and fill page */
          #resume-content,
          #resume-content > div {
            display: block !important;
            visibility: visible !important;
            position: static !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
          }
          
          /* Text colors for print */
          h1, h2, h3, h4, p, span, li, div { 
            color: black !important; 
          }
          .text-blue-600, .text-blue-500, .text-blue-400 { 
            color: #2563eb !important; 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .bg-blue-50, .bg-slate-50 {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        `}
            </style>
        </DashboardLayout>
    );
};

export default ResumeBuilder;
