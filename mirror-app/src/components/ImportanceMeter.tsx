"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle } from 'lucide-react';

type ImportanceLevel = 0 | 1 | 2 | 3 | 4;

const LEVELS: { label: string; sub: string; color: string }[] = [
    { label: 'None',    sub: 'Equanimity',   color: '#4B9FFF' },
    { label: 'Low',     sub: 'Mild Tension', color: '#88BB44' },
    { label: 'Medium',  sub: 'Growing Grip', color: '#DDAA22' },
    { label: 'High',    sub: 'Excess Potential', color: '#EE6611' },
    { label: 'Extreme', sub: 'Balancing Forces Active', color: '#EE1133' },
];

const DIAGNOSES: Record<ImportanceLevel, { excess: string; technique: string }> = {
    0: {
        excess: "No detectable excess potential. Your field is clear and your energy flows freely toward your goals.",
        technique: "Maintain this equanimity. Continue acting with detached precision. The Alternatives Flow is open."
    },
    1: {
        excess: "Minor attachment detected. The Balancing Forces are dormant but watchful. Your grip is gentle.",
        technique: "Keep awareness on the attachment. Practice the mantra: 'I prefer this outcome, but I am whole without it.' Act without craving."
    },
    2: {
        excess: "Moderate excess potential building. Your desire is creating a distortion in the energy field. Resistance will start appearing.",
        technique: "Write down the worst-case scenario, then genuinely accept it. Once accepted, step back into action as a detached craftsman, not a desperate supplicant."
    },
    3: {
        excess: "High excess potential. Balancing Forces are actively mobilizing. Expect obstacles, reversals, or well-meaning people who block your path. The universe is flattening the spike.",
        technique: "Emergency reduction: immediately lower the stakes in your mind. Say aloud — 'It doesn't matter that much.' Replace Desire with Intention. Act with the calm certainty of a professional, not the anxiety of someone who needs this to work."
    },
    4: {
        excess: "Critical excess potential. The Balancing Forces are in full operation. You have assigned so much significance to this that the universe is assembling an army of counter-forces. Miracles are being canceled.",
        technique: "Stop. Breathe. Write down all scenarios where things go wrong and find peace with each of them. Then close your eyes and visualize yourself not needing the outcome at all — simply being at rest. Act from that place. Or take a full day away from the goal entirely."
    },
};

export default function ImportanceMeter({ isPremium }: { isPremium: boolean }) {
    const [level, setLevel] = useState<ImportanceLevel>(0);
    const [analyzed, setAnalyzed] = useState(false);

    const isShaking = level >= 3;
    const isBlurring = level >= 4;

    if (!isPremium) {
        return (
            <div className="relative w-full p-8 border border-white/8 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
                <Lock className="w-8 h-8 text-white/20 mb-4" />
                <h3 className="uppercase tracking-[0.2em] text-white/60 mb-2 text-xs">The Importance Meter</h3>
                <p className="text-zinc-600 font-light text-center max-w-sm mb-6 text-sm leading-relaxed">
                    Diagnose Excess Potential and generate Balancing Force reduction techniques from Chapter 4.
                </p>
                <button className="px-6 py-2 border border-white/15 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-white/40">
                    Unlock Feature
                </button>
            </div>
        );
    }

    const diagnosis = DIAGNOSES[level];
    const currentLevel = LEVELS[level];

    return (
        <motion.div
            className="relative w-full p-8 border border-zinc-800/60 bg-zinc-950/80 rounded-2xl overflow-hidden"
            animate={isShaking ? {
                x: [0, -2, 3, -3, 2, -1, 0],
                y: [0, -1, 2, -2, 1, -1, 0],
            } : { x: 0, y: 0 }}
            transition={isShaking ? { duration: 0.35, repeat: Infinity, ease: 'easeInOut' } : {}}
            style={{ filter: isBlurring ? 'blur(0.4px) brightness(1.08)' : 'none' }}
        >
            <h3 className="text-xs font-light tracking-[0.25em] text-white uppercase mb-8 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500/70" />
                Importance Meter
                <span className="text-[10px] text-zinc-600 normal-case tracking-normal">— Ch. 4: Balance</span>
            </h3>

            {/* Slider visual */}
            <div className="mb-8">
                <div className="flex justify-between mb-3">
                    {LEVELS.map((l, i) => (
                        <button
                            key={i}
                            onClick={() => { setLevel(i as ImportanceLevel); setAnalyzed(false); }}
                            className="flex flex-col items-center gap-1.5 group"
                        >
                            <motion.div
                                className="w-2.5 h-2.5 rounded-full border-2 transition-all"
                                style={{
                                    borderColor: i <= level ? l.color : 'rgba(255,255,255,0.12)',
                                    backgroundColor: i === level ? l.color : 'transparent',
                                    boxShadow: i === level ? `0 0 10px ${l.color}` : 'none',
                                }}
                                animate={i === level && isShaking ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                                transition={{ duration: 0.35, repeat: isShaking ? Infinity : 0 }}
                            />
                            <span
                                className="text-[9px] uppercase tracking-wider transition-all hidden sm:block"
                                style={{ color: i === level ? l.color : 'rgba(255,255,255,0.2)' }}
                            >
                                {l.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="relative h-1 rounded-full bg-white/5 mt-1">
                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ background: `linear-gradient(to right, #4B9FFF, ${currentLevel.color})` }}
                        animate={{ width: `${(level / 4) * 100}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>

                <div className="flex justify-between mt-2">
                    <span className="text-[9px] tracking-widest uppercase text-zinc-600">Equanimity</span>
                    <span className="text-[9px] tracking-widest uppercase text-zinc-600">Extreme Potential</span>
                </div>
            </div>

            {/* Current level display */}
            <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: `${currentLevel.color}22`, backgroundColor: `${currentLevel.color}08` }}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest" style={{ color: currentLevel.color }}>{currentLevel.label}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{currentLevel.sub}</p>
                    </div>
                    <motion.button
                        onClick={() => setAnalyzed(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all"
                        style={{ borderColor: `${currentLevel.color}40`, color: currentLevel.color }}
                    >
                        Diagnose
                    </motion.button>
                </div>
            </div>

            {/* Diagnosis output */}
            {analyzed && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="space-y-4"
                >
                    <div className="pt-4 border-t border-zinc-800/60">
                        <h4 className="text-[10px] uppercase tracking-widest mb-2" style={{ color: currentLevel.color }}>
                            Field Reading
                        </h4>
                        <p className="text-[13px] font-light leading-relaxed text-zinc-300 p-3 rounded-lg border border-zinc-800/60 bg-zinc-900/40">
                            {diagnosis.excess}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-emerald-400/80 mb-2">
                            Reduction Technique
                        </h4>
                        <p className="text-[13px] font-light leading-relaxed text-zinc-300 p-3 rounded-lg border border-emerald-500/15 bg-emerald-500/5">
                            {diagnosis.technique}
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
