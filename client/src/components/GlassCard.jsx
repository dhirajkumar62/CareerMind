import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", delay = 0, hover = true }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
        whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
        className={`bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-10 ${className}`}
    >
        {children}
    </motion.div>
);

export default GlassCard;
