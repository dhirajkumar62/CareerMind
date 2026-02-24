import React from 'react';

const SectionLabel = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{children}</span>
    </div>
);

export default SectionLabel;
