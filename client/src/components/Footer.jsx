import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 pt-24 pb-8 border-t border-slate-200/50 relative overflow-hidden">
            {/* Big Watermark */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-200 pointer-events-none select-none tracking-tighter whitespace-nowrap z-0 flex items-end justify-center leading-none">
                CareerMind
            </div>

            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-start">
                        <motion.div whileHover={{ scale: 1.05 }} className="mb-6 origin-left">
                            <Logo size="md" />
                        </motion.div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Next-gen AI career discovery for students, professionals, and lifelong learners.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'How it Works', href: '/#features' },
                                { label: 'AI Mentor', href: '/#mentorship' },
                                { label: 'Roadmaps', href: '#' }
                            ].map((item, i) => (
                                <motion.li key={item.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                    <a href={item.href} className="text-slate-500 hover:text-blue-600 font-medium transition-all hover:translate-x-1 inline-block">
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <a href="/about" className="text-slate-500 hover:text-blue-600 font-medium transition-all hover:translate-x-1 inline-block">
                                    Our Vision
                                </a>
                            </motion.li>
                            {['Careers', 'Contact'].map((item, i) => (
                                <motion.li key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}>
                                    <a href="#" className="text-slate-500 hover:text-blue-600 font-medium transition-all hover:translate-x-1 inline-block">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Status'].map((item, i) => (
                                <motion.li key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                                    <a href="#" className="text-slate-500 hover:text-blue-600 font-medium transition-all hover:translate-x-1 inline-block">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200/50">
                    <p className="text-slate-400 font-medium text-sm">
                        © 2026 CareerMind Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {/* Social Icons Placeholder */}
                        {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                aria-label={social}
                                className="text-slate-400 hover:text-blue-500 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Generic circle for icons since we don't have the exact SVGs readily imported, 
                      or we can use simple generic paths */}
                                    <circle cx="12" cy="12" r="10" opacity="0.2" />
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                </svg>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
