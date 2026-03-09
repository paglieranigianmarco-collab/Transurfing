"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Splash() {
    const [intention, setIntention] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!intention.trim()) return;

        setSubmitted(true);

        // Simulate the star dissolving and zooming into the background
        setTimeout(() => {
            router.push('/space');
        }, 2000);
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <AnimatePresence>
                {!submitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md text-center"
                    >
                        <h1 className="text-sm tracking-[0.3em] uppercase text-white/50 mb-12">The Transurfing Mirror</h1>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                placeholder="What is your Intention?"
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-center text-2xl font-light text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                autoFocus
                            />
                            <motion.button
                                type="submit"
                                disabled={!intention.trim()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 px-8 py-3 rounded-full border border-white/20 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all disabled:opacity-0 disabled:pointer-events-none"
                            >
                                Manifest
                            </motion.button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="star"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
                        transition={{ duration: 2, times: [0, 0.5, 1], ease: "easeInOut" }}
                        className="absolute"
                    >
                        {/* The dissolved intention star */}
                        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,1)]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
