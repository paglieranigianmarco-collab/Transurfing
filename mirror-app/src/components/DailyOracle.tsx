"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';
import { chapters } from '@/data/chapters';
import { getDailyOracleIndex, getDailyStepIndex, getPracticeDay } from '@/lib/premium';
import { useAppStore } from '@/lib/store';
import { ChapterTier } from '@/lib/types';

const TIER_COLOR: Record<ChapterTier, string> = {
    beginner: '#4B9FFF',
    practitioner: '#D0D0D0',
    master: '#D4AF37',
};

export default function DailyOracle({
    isPremium,
    onRequestUpgrade,
}: {
    isPremium: boolean;
    onRequestUpgrade: () => void;
}) {
    const { setSelectedChapter, setFocusMode } = useAppStore();

    const { chapter, stepIndex, dayNumber } = useMemo(() => ({
        chapter: chapters[getDailyOracleIndex()],
        stepIndex: getDailyStepIndex(),
        dayNumber: getPracticeDay(),
    }), []);

    const tierColor = TIER_COLOR[chapter.tier];

    if (!isPremium) {
        return (
            <div className="relative w-full p-8 border border-white/8 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                {/* Blurred preview background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ filter: 'blur(8px)', opacity: 0.35 }}>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '3rem', color: '#D4AF37' }}>
                        The Oracle Speaks
                    </p>
                </div>
                <Lock className="w-6 h-6 text-white/20 mb-3 relative z-10" />
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/50 mb-1 relative z-10">Daily Oracle</h3>
                <p className="text-zinc-600 font-light text-center max-w-xs mb-5 text-xs leading-relaxed relative z-10">
                    Each day, the Space of Variations surfaces a chapter for your practice. Unlock to receive your daily transmission.
                </p>
                <button
                    onClick={onRequestUpgrade}
                    className="px-6 py-2 border border-amber-400/30 text-amber-400/70 rounded-full text-xs uppercase tracking-widest hover:bg-amber-400/10 hover:border-amber-400/60 transition-all relative z-10"
                >
                    Unlock Access
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full border rounded-2xl overflow-hidden"
            style={{ borderColor: `${tierColor}20`, background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${tierColor}06)` }}
        >
            {/* Top metadata bar */}
            <div className="flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: `${tierColor}12` }}>
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tierColor, boxShadow: `0 0 8px ${tierColor}` }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">Daily Oracle</span>
                </div>
                <span className="text-[10px] text-white/20 tracking-wider">Day {dayNumber} of practice</span>
            </div>

            {/* Card body */}
            <motion.div
                className="p-8"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Tier + chapter meta */}
                <div className="flex items-center gap-2 mb-6">
                    <span
                        className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                        style={{ color: tierColor, borderColor: `${tierColor}35`, backgroundColor: `${tierColor}10` }}
                    >
                        {chapter.tier}
                    </span>
                    <span className="text-[10px] text-white/20 tracking-wider">Chapter {chapter.chapterNumber}</span>
                </div>

                {/* Zen Title */}
                <h2
                    className="text-4xl sm:text-5xl font-light text-white mb-2 leading-none"
                    style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', letterSpacing: '0.03em', color: tierColor }}
                >
                    {chapter.zenTitle}
                </h2>
                <p className="text-xs uppercase tracking-widest mb-8" style={{ color: `${tierColor}60` }}>
                    {chapter.title}
                </p>

                {/* Quote */}
                <blockquote
                    className="text-base font-light italic leading-relaxed text-zinc-300 border-l-2 pl-5 mb-8"
                    style={{ borderColor: `${tierColor}40`, fontFamily: 'var(--font-cormorant)' }}
                >
                    "{chapter.quote}"
                </blockquote>

                {/* Today's step */}
                <div
                    className="p-5 rounded-xl border mb-8"
                    style={{ borderColor: `${tierColor}15`, backgroundColor: `${tierColor}08` }}
                >
                    <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: tierColor }}>
                        Today's Practice
                    </p>
                    <p className="text-sm font-light leading-[1.8] text-zinc-300">
                        {chapter.practicalSteps[stepIndex]}
                    </p>
                </div>

                {/* Go deeper */}
                <button
                    onClick={() => { setSelectedChapter(chapter); setFocusMode(true); }}
                    className="flex items-center gap-2 text-[11px] uppercase tracking-widest transition-all group"
                    style={{ color: `${tierColor}70` }}
                >
                    <span className="group-hover:opacity-100 transition-opacity" style={{ opacity: 0.7 }}>
                        Go Deeper into {chapter.zenTitle}
                    </span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </motion.div>
    );
}
