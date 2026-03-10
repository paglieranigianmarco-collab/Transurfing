"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Heart, Sparkles, Loader } from 'lucide-react';
import { validateLicenseKey, writePremiumUnlock } from '@/lib/premium';
import { useAppStore } from '@/lib/store';

type ModalPhase = 'idle' | 'validating' | 'success' | 'error';

const KOFI_URL   = 'https://ko-fi.com/transurfingmirror';
const GUMROAD_URL = 'https://gum.co/transurfing-mirror-premium'; // update with real URL

export default function PremiumModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [keyInput, setKeyInput] = useState('');
    const [phase, setPhase] = useState<ModalPhase>('idle');
    const { setPremium } = useAppStore();

    const handleActivate = async () => {
        if (!keyInput.trim()) return;
        setPhase('validating');
        const valid = await validateLicenseKey(keyInput.trim());
        if (valid) {
            writePremiumUnlock();
            setPremium(true);
            setPhase('success');
            setTimeout(() => {
                onClose();
                setPhase('idle');
                setKeyInput('');
            }, 2200);
        } else {
            setPhase('error');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleActivate();
        if (e.key === 'Escape') onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="premium-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-6"
                    style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        initial={{ y: 32, opacity: 0, scale: 0.97 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -16, opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-white/25 hover:text-white transition-colors z-10"
                        >
                            <X size={18} strokeWidth={1.5} />
                        </button>

                        {phase === 'success' ? (
                            /* Success state */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-12 text-center"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="inline-block mb-6"
                                >
                                    <Sparkles size={36} className="text-amber-400" />
                                </motion.div>
                                <h2
                                    className="text-3xl font-light text-white mb-3"
                                    style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                                >
                                    The Mirror Opens
                                </h2>
                                <p className="text-sm text-zinc-400 font-light tracking-wide">
                                    Practitioner access activated. Welcome to the deeper practice.
                                </p>
                                {/* Gold shimmer bar */}
                                <motion.div
                                    className="h-px mt-8 mx-auto"
                                    style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
                                    animate={{ width: ['0%', '100%'] }}
                                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                                />
                            </motion.div>
                        ) : (
                            <div className="p-8">
                                {/* Header */}
                                <div className="mb-8">
                                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 mb-2">Reality Transurfing</p>
                                    <h2
                                        className="text-3xl font-light text-white leading-tight"
                                        style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
                                    >
                                        Unlock the Mirror
                                    </h2>
                                    <p className="text-xs text-zinc-500 mt-2 font-light leading-relaxed">
                                        Support the project with a donation, or unlock full Practitioner access with a license key.
                                    </p>
                                </div>

                                {/* Ko-fi donation */}
                                <a
                                    href={KOFI_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full p-4 border border-zinc-800 hover:border-zinc-600 rounded-xl group transition-all mb-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <Heart size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                                        <div className="text-left">
                                            <p className="text-xs uppercase tracking-widest text-white/80">Donate on Ko-fi</p>
                                            <p className="text-[10px] text-zinc-600 mt-0.5">Support the Mirror — any amount</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-zinc-600 group-hover:text-white transition-colors">↗</span>
                                </a>

                                {/* Divider */}
                                <div className="flex items-center gap-3 my-5">
                                    <div className="flex-1 h-px bg-zinc-800" />
                                    <span className="text-[9px] uppercase tracking-widest text-zinc-600">or unlock full access</span>
                                    <div className="flex-1 h-px bg-zinc-800" />
                                </div>

                                {/* Gumroad link */}
                                <a
                                    href={GUMROAD_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full p-4 border border-amber-400/20 hover:border-amber-400/50 bg-amber-400/5 hover:bg-amber-400/10 rounded-xl group transition-all mb-5"
                                >
                                    <div className="flex items-center gap-3">
                                        <Sparkles size={16} className="text-amber-400" />
                                        <div className="text-left">
                                            <p className="text-xs uppercase tracking-widest text-amber-400">Practitioner Access — $19</p>
                                            <p className="text-[10px] text-zinc-500 mt-0.5">Lifetime · Daily Oracle · Progress Tracking · Timer</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-amber-400/50 group-hover:text-amber-400 transition-colors">↗</span>
                                </a>

                                {/* License key input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                                        <Key size={10} />
                                        Enter License Key
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={keyInput}
                                            onChange={(e) => { setKeyInput(e.target.value); setPhase('idle'); }}
                                            onKeyDown={handleKeyDown}
                                            placeholder="MIRROR-PRACTITIONER-XXXX"
                                            className="flex-1 bg-transparent border border-zinc-800 focus:border-white/40 rounded-lg px-4 py-2.5 text-sm font-light text-white placeholder-zinc-700 focus:outline-none transition-colors tracking-wider"
                                        />
                                        <motion.button
                                            onClick={handleActivate}
                                            disabled={!keyInput.trim() || phase === 'validating'}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-4 py-2.5 bg-white text-black text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:pointer-events-none font-medium"
                                        >
                                            {phase === 'validating'
                                                ? <Loader size={14} className="animate-spin" />
                                                : 'Activate'}
                                        </motion.button>
                                    </div>

                                    {phase === 'error' && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[11px] text-red-400/80 font-light"
                                        >
                                            Invalid key. Check your Gumroad receipt and try again.
                                        </motion.p>
                                    )}
                                </div>

                                {/* Footer */}
                                <p className="text-[10px] text-zinc-700 mt-5 text-center font-light">
                                    Your key arrives by email after purchase. No account required.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
