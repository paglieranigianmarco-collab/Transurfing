"use client";

import { useAppStore } from '@/lib/store';
import { ChapterTier } from '@/lib/types';
import { motion } from 'framer-motion';

const TIERS: { tier: ChapterTier | 'all'; label: string; color: string; desc: string }[] = [
    { tier: 'all',          label: 'All',         color: '#888888', desc: 'All 19 chapters' },
    { tier: 'beginner',     label: 'Beginner',    color: '#4B9FFF', desc: 'Ch. 1–6: Foundations' },
    { tier: 'practitioner', label: 'Practitioner', color: '#D0D0D0', desc: 'Ch. 7–13: Tools' },
    { tier: 'master',       label: 'Master',      color: '#D4AF37', desc: 'Ch. 14–19: Mastery' },
];

export default function OrbitLegend() {
    const { orbitFilter, setOrbitFilter, isFocusMode } = useAppStore();

    return (
        <motion.div
            className="absolute bottom-10 right-8 z-40 flex flex-col gap-2"
            animate={{ opacity: isFocusMode ? 0 : 1, pointerEvents: isFocusMode ? 'none' : 'auto' }}
            transition={{ duration: 0.4 }}
        >
            {TIERS.map(({ tier, label, color, desc }) => (
                <button
                    key={tier}
                    onClick={() => setOrbitFilter(tier)}
                    className="flex items-center gap-2.5 group text-left"
                >
                    <div
                        className="w-2 h-2 rounded-full transition-all"
                        style={{
                            backgroundColor: orbitFilter === tier ? color : 'transparent',
                            borderWidth: 1.5,
                            borderStyle: 'solid',
                            borderColor: color,
                            boxShadow: orbitFilter === tier ? `0 0 8px ${color}` : 'none',
                        }}
                    />
                    <div>
                        <span
                            className="text-[10px] uppercase tracking-widest transition-all block"
                            style={{ color: orbitFilter === tier ? color : 'rgba(255,255,255,0.25)' }}
                        >
                            {label}
                        </span>
                        <span className="text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.12)' }}>
                            {desc}
                        </span>
                    </div>
                </button>
            ))}
        </motion.div>
    );
}
