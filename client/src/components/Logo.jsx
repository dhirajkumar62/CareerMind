export default function Logo({ size = "md", showText = true, className = "", textColorClass = "text-slate-900", brandColorClass = "text-blue-600" }) {
    const sizes = {
        sm: { icon: "w-5 h-5", text: "text-xl", gap: "gap-2" },
        md: { icon: "w-7 h-7", text: "text-2xl", gap: "gap-3" },
        lg: { icon: "w-9 h-9", text: "text-4xl", gap: "gap-4" },
        xl: { icon: "w-14 h-14", text: "text-6xl", gap: "gap-5" },
    };

    const s = sizes[size] || sizes.md;

    return (
        <div className={`flex items-center ${s.gap} ${className}`}>
            <div className={`flex-shrink-0 flex items-center justify-center ${s.icon}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                    {/* The icon in the image uses standard white elements for the layers on blue backgrounds, but for light backgrounds it needs the primary color */}
                    {/* By default SVG will inherit current text color, so we use brandColorClass for coloring the SVG filling */}
                    <g className={textColorClass === 'text-white' ? 'text-white' : brandColorClass}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </g>
                </svg>
            </div>
            {showText && (
                <span className={`${s.text} font-display font-bold tracking-tight ${textColorClass} leading-none`}>
                    CareerMinds
                </span>
            )}
        </div>
    );
}
