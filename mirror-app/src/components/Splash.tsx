"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

// Crack lines that radiate from center during shatter
const CRACKS = [
    { angle: 15,  length: '45%', width: 1, delay: 0 },
    { angle: 72,  length: '38%', width: 1, delay: 0.05 },
    { angle: 135, length: '52%', width: 1.5, delay: 0.02 },
    { angle: 195, length: '40%', width: 1, delay: 0.07 },
    { angle: 258, length: '48%', width: 1, delay: 0.03 },
    { angle: 310, length: '35%', width: 1.5, delay: 0.06 },
    { angle: 45,  length: '30%', width: 1, delay: 0.08 },
    { angle: 160, length: '42%', width: 1, delay: 0.04 },
    { angle: 225, length: '36%', width: 1, delay: 0.09 },
    { angle: 340, length: '44%', width: 1.5, delay: 0.01 },
];

export default function Splash() {
    const [intention, setIntention] = useState('');
    const [phase, setPhase] = useState<'idle' | 'cracking' | 'shattering' | 'gone'>('idle');
    const { setSubmitted, setIntention: storeSetIntention } = useAppStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!intention.trim()) return;
        storeSetIntention(intention);
        setPhase('cracking');

        setTimeout(() => setPhase('shattering'), 600);
        setTimeout(() => {
            setSubmitted(true);
            setPhase('gone');
        }, 1200);
        setTimeout(() => {
            router.push('/space');
        }, 2000);
    };

    const isCracking = phase === 'cracking' || phase === 'shattering' || phase === 'gone';
    const isShattering = phase === 'shattering' || phase === 'gone';

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

            {/* Crack lines overlay */}
            {isCracking && (
                <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
                    {CRACKS.map((crack, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                width: crack.width,
                                height: crack.length,
                                background: `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.2), transparent)`,
                                transformOrigin: 'top center',
                                rotate: crack.angle,
                                top: '50%',
                                left: '50%',
                                marginLeft: -crack.width / 2,
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: isShattering ? 0 : 1 }}
                            transition={{
                                scaleY: { duration: 0.3, delay: crack.delay, ease: 'easeOut' },
                                opacity: isShattering
                                    ? { duration: 0.4, delay: crack.delay, ease: 'easeIn' }
                                    : { duration: 0.1, delay: crack.delay }
                            }}
                        />
                    ))}
                </div>
            )}

            {/* White flash overlay on shatter */}
            {isShattering && (
                <motion.div
                    className="fixed inset-0 z-30 pointer-events-none bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            )}

            <AnimatePresence>
                {phase === 'idle' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-lg text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                        >
                            <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-3">
                                Reality Transurfing
                            </p>
                            <h1
                                className="text-6xl sm:text-7xl font-light mb-2 text-white/90 leading-none"
                                style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', letterSpacing: '0.04em' }}
                            >
                                The Mirror
                            </h1>
                            <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-16">
                                Enter Your Intention to Proceed
                            </p>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <input
                                type="text"
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                placeholder="What do you intend to have?"
                                className="w-full bg-transparent border-b border-white/15 pb-5 text-center text-2xl font-light text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-all"
                                style={{ fontFamily: 'var(--font-dm-sans)' }}
                                autoFocus
                            />
                            <motion.button
                                type="submit"
                                disabled={!intention.trim()}
                                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.5)' }}
                                whileTap={{ scale: 0.96 }}
                                className="mt-10 px-10 py-3 rounded-full border border-white/15 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0 disabled:pointer-events-none"
                            >
                                Shatter the Mirror
                            </motion.button>
                        </motion.form>

                        {/* Subtitle hint */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1.5 }}
                            className="mt-16 text-[10px] tracking-widest uppercase text-white/15"
                        >
                            An interactive journey through Reality Transurfing
                        </motion.p>
                    </motion.div>
                )}

                {(phase === 'cracking') && (
                    <motion.div
                        key="cracking"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p
                            className="text-2xl font-light text-white/80 tracking-widest"
                            style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                        >
                            {intention}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
