"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { renderWithGlossaryTooltips } from '@/lib/parseGlossary';
import { writeVisitedChapter } from '@/lib/premium';
import { X } from 'lucide-react';
import { ChapterTier } from '@/lib/types';

const TIER_COLORS: Record<ChapterTier, { text: string; border: string; label: string }> = {
    beginner:     { text: 'text-blue-400',  border: 'border-blue-400/30',  label: 'Beginner Orbit' },
    practitioner: { text: 'text-zinc-300',  border: 'border-zinc-300/30',  label: 'Practitioner Orbit' },
    master:       { text: 'text-amber-400', border: 'border-amber-400/30', label: 'Master Orbit' },
};

export default function FocusMode() {
    const { isFocusMode, selectedChapter, setFocusMode, isPremium, markChapterVisited } = useAppStore();

    useEffect(() => {
        if (isFocusMode && isPremium && selectedChapter) {
            markChapterVisited(selectedChapter.id);
            writeVisitedChapter(selectedChapter.id);
        }
    }, [isFocusMode, isPremium, selectedChapter, markChapterVisited]);

    if (!isFocusMode || !selectedChapter) return null;

    const tierStyle = TIER_COLORS[selectedChapter.tier];

    return (
        <AnimatePresence>
            <motion.div
                key={selectedChapter.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
                style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.55)' }}
            >
                {/* Close */}
                <button
                    onClick={() => setFocusMode(false)}
                    className="fixed top-8 right-8 z-[60] text-white/30 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                    <X size={28} strokeWidth={1} />
                </button>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl w-full text-left px-6 sm:px-0 py-16"
                >
                    {/* Orbit / Book metadata */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className={`text-[10px] uppercase tracking-[0.3em] ${tierStyle.text} border ${tierStyle.border} px-3 py-1 rounded-full`}>
                            {tierStyle.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-white/25">
                            Book {selectedChapter.book} · Chapter {selectedChapter.chapterNumber}
                        </span>
                    </div>

                    {/* Zen Title */}
                    <h2
                        className="text-5xl sm:text-6xl font-light mb-3 leading-none text-white"
                        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', letterSpacing: '0.03em' }}
                    >
                        {selectedChapter.zenTitle}
                    </h2>

                    {/* Technical title */}
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-14">
                        {selectedChapter.title}
                    </p>

                    {/* Surface Principle */}
                    <section className="mb-10">
                        <span className="text-[10px] uppercase tracking-widest text-white/25 bg-white/5 px-3 py-1 rounded-full inline-block mb-5">
                            Surface Principle
                        </span>
                        <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-200" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                            {renderWithGlossaryTooltips(selectedChapter.surfacePrinciple)}
                        </p>
                    </section>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-10" />

                    {/* Quote */}
                    <section className="mb-10">
                        <blockquote
                            className={`text-lg sm:text-xl font-light italic leading-relaxed ${tierStyle.text} border-l-2 ${tierStyle.border} pl-5`}
                            style={{ fontFamily: 'var(--font-cormorant)' }}
                        >
                            "{selectedChapter.quote}"
                        </blockquote>
                    </section>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-10" />

                    {/* Deep Dive */}
                    <section className="mb-12">
                        <span className="text-[10px] uppercase tracking-widest text-white/25 bg-white/5 px-3 py-1 rounded-full inline-block mb-5">
                            Deep Dive
                        </span>
                        <div className="text-[15px] font-light leading-[1.9] text-zinc-400" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                            {renderWithGlossaryTooltips(selectedChapter.deepDive)}
                        </div>
                    </section>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-10" />

                    {/* Practical Steps */}
                    <section className="mb-16">
                        <span className="text-[10px] uppercase tracking-widest text-white/25 bg-white/5 px-3 py-1 rounded-full inline-block mb-6">
                            3 Practical Steps
                        </span>
                        <ol className="space-y-5">
                            {selectedChapter.practicalSteps.map((step, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
                                    className="flex gap-5 items-start"
                                >
                                    <span
                                        className={`text-2xl font-light shrink-0 mt-[-2px] ${tierStyle.text}`}
                                        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                                    >
                                        {i + 1}.
                                    </span>
                                    <p className="text-[14px] font-light leading-[1.85] text-zinc-300" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                                        {step}
                                    </p>
                                </motion.li>
                            ))}
                        </ol>
                    </section>

                    {/* Return */}
                    <div className="text-center">
                        <button
                            onClick={() => setFocusMode(false)}
                            className="text-white/25 hover:text-white tracking-[0.25em] uppercase text-[10px] border-b border-transparent hover:border-white/30 pb-1 transition-all"
                        >
                            Return to the Space of Variations
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
