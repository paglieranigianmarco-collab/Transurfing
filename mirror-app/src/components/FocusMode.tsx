"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { renderWithGlossaryTooltips } from '@/lib/parseGlossary';
import { X } from 'lucide-react';

export default function FocusMode() {
    const { isFocusMode, selectedChapter, setFocusMode } = useAppStore();

    return (
        <AnimatePresence>
            {isFocusMode && selectedChapter && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.5 } }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 overflow-y-auto bg-black/40"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setFocusMode(false)}
                        className="fixed top-8 right-8 z-[60] text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    {/* Chapter Content Overlay */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0, transition: { duration: 0.4 } }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="max-w-2xl w-full text-left"
                    >
                        <div className="mb-4 text-white/40 tracking-[0.2em] text-xs uppercase font-medium">
                            Book {selectedChapter.book} • Chapter {selectedChapter.chapterNumber}
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-light mb-12 tracking-wide leading-tight text-white">
                            {selectedChapter.title}
                        </h2>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full">
                                    Surface Principle
                                </h3>
                                <p className="text-xl font-light leading-relaxed text-zinc-200">
                                    {renderWithGlossaryTooltips(selectedChapter.surfacePrinciple)}
                                </p>
                            </section>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <section>
                                <h3 className="text-xs uppercase tracking-widest text-white/30 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full">
                                    Deep Dive
                                </h3>
                                <div className="text-base font-light leading-loose text-zinc-400 space-y-4">
                                    {/* We split by period or just render normally, but our glossary parser handles it */}
                                    {renderWithGlossaryTooltips(selectedChapter.deepDive)}
                                </div>
                            </section>
                        </div>

                        <div className="mt-16 text-center">
                            <button
                                onClick={() => setFocusMode(false)}
                                className="text-white/40 hover:text-white tracking-widest uppercase text-xs border-b border-transparent hover:border-white/40 pb-1 transition-all"
                            >
                                Return to Space
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
