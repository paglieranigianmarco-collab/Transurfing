"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Image as ImageIcon, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';

interface AudioDrone {
    ctx: AudioContext;
    gainNode: GainNode;
    oscs: OscillatorNode[];
}

function createAmbientDrone(): AudioDrone {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);

    // Reverb via convolver (simple impulse)
    const convolver = ctx.createConvolver();
    const impulseLength = ctx.sampleRate * 3;
    const impulse = ctx.createBuffer(2, impulseLength, ctx.sampleRate);
    for (let i = 0; i < 2; i++) {
        const channel = impulse.getChannelData(i);
        for (let j = 0; j < impulseLength; j++) {
            channel[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / impulseLength, 2.5);
        }
    }
    convolver.buffer = impulse;

    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.35;

    // Frequencies based on 432Hz (healing scale)
    const frequencies = [216, 432, 288, 144]; // sub-bass, fundamental, fifth, octave-down
    const oscs: OscillatorNode[] = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + i * 0.05;
        lfoGain.gain.value = freq * 0.003;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        // Individual gains (higher harmonics quieter)
        oscGain.gain.value = [0.6, 1, 0.4, 0.25][i];

        osc.connect(oscGain);
        oscGain.connect(gainNode);
        oscGain.connect(convolver);
        osc.start();
        return osc;
    });

    convolver.connect(reverbGain);
    reverbGain.connect(gainNode);
    gainNode.connect(ctx.destination);

    return { ctx, gainNode, oscs };
}

export default function SlideProjector({ isPremium, onRequestUpgrade }: { isPremium: boolean; onRequestUpgrade?: () => void }) {
    const [slideText, setSlideText] = useState('');
    const [slideImage, setSlideImage] = useState<string | null>(null);
    const [zenMode, setZenMode] = useState(false);
    const [audioOn, setAudioOn] = useState(false);
    const droneRef = useRef<AudioDrone | null>(null);

    const startAudio = useCallback(() => {
        if (droneRef.current) return;
        droneRef.current = createAmbientDrone();
        setAudioOn(true);
    }, []);

    const stopAudio = useCallback(() => {
        if (!droneRef.current) return;
        const { ctx, gainNode } = droneRef.current;
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
        setTimeout(() => {
            ctx.close();
            droneRef.current = null;
        }, 2100);
        setAudioOn(false);
    }, []);

    const toggleAudio = useCallback(() => {
        if (audioOn) stopAudio(); else startAudio();
    }, [audioOn, startAudio, stopAudio]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (droneRef.current) {
                droneRef.current.ctx.close();
                droneRef.current = null;
            }
        };
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setSlideImage(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    if (!isPremium) {
        return (
            <div className="relative w-full p-8 border border-white/8 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <Lock className="w-8 h-8 text-white/20 mb-4" />
                <h3 className="uppercase tracking-[0.2em] text-white/60 mb-2 text-xs">The Slide Projector</h3>
                <p className="text-zinc-600 font-light text-center max-w-sm mb-6 text-sm leading-relaxed">
                    Access the Zen Mode projection chamber to tune your frequency to your Target Slide. Includes 432Hz ambient drone.
                </p>
                <button onClick={onRequestUpgrade} className="px-6 py-2 border border-white/15 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-white/40">
                    Unlock Feature
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full p-8 border border-white/8 bg-zinc-950/80 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xs font-light tracking-[0.25em] text-white uppercase">Target Slide</h3>
                        <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">Ch. 8: Slides</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleAudio}
                            className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest transition-colors ${audioOn ? 'text-amber-400' : 'text-white/30 hover:text-white/60'}`}
                        >
                            {audioOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
                            432hz
                        </button>
                        <button
                            onClick={() => { setZenMode(true); if (!audioOn) startAudio(); }}
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                        >
                            <Maximize2 size={12} /> Zen Mode
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] uppercase text-zinc-600 tracking-wider mb-2">Slide Affirmation</label>
                        <textarea
                            value={slideText}
                            onChange={(e) => setSlideText(e.target.value)}
                            placeholder="Describe your target sector in present tense. Be specific. Be vivid. Be inside it."
                            className="w-full h-36 bg-transparent border border-white/10 rounded-lg p-4 text-sm font-light focus:outline-none focus:border-white/30 resize-none transition-colors text-white/80 placeholder-zinc-700 leading-relaxed"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-[10px] uppercase text-zinc-600 tracking-wider mb-2">Visual Anchor</label>
                        <div
                            className={`flex-1 min-h-[144px] border rounded-lg flex items-center justify-center relative overflow-hidden group transition-all
                                ${slideImage ? 'border-white/15' : 'border-white/10 border-dashed hover:border-white/25'}`}
                        >
                            {slideImage ? (
                                <>
                                    <img
                                        src={slideImage}
                                        alt="Target Slide Anchor"
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity dream-glow"
                                    />
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                                        }}
                                    />
                                    <label className="relative z-10 cursor-pointer text-[10px] uppercase tracking-widest text-white/70 bg-black/50 px-4 py-2 rounded-full border border-white/15 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                        Change Anchor
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center cursor-pointer text-zinc-600 hover:text-white/50 transition-colors gap-2">
                                    <ImageIcon strokeWidth={1} size={20} />
                                    <span className="text-[10px] uppercase tracking-widest">Upload Visual Anchor</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Zen Mode overlay */}
            <AnimatePresence>
                {zenMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    >
                        <button
                            onClick={() => setZenMode(false)}
                            className="absolute top-8 right-8 z-[110] text-white/20 hover:text-white transition-colors"
                        >
                            <Minimize2 size={20} strokeWidth={1} />
                        </button>

                        {/* Audio toggle in zen mode */}
                        <button
                            onClick={toggleAudio}
                            className={`absolute bottom-10 right-10 z-[110] text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors ${audioOn ? 'text-amber-400/60' : 'text-white/20 hover:text-white/40'}`}
                        >
                            {audioOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
                            432hz drone
                        </button>

                        {/* Dream background image */}
                        {slideImage && (
                            <motion.div
                                className="absolute inset-0"
                                initial={{ scale: 1.05, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 8 }}
                            >
                                <motion.img
                                    src={slideImage}
                                    alt="Target Slide"
                                    className="w-full h-full object-cover"
                                    animate={{
                                        scale: [1, 1.03, 1],
                                        filter: [
                                            'brightness(0.3) saturate(0.8) blur(2px)',
                                            'brightness(0.4) saturate(1.2) blur(1px)',
                                            'brightness(0.3) saturate(0.8) blur(2px)',
                                        ]
                                    }}
                                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                {/* Dream overlay gradient */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'radial-gradient(ellipse at center, rgba(50,80,180,0.15) 0%, rgba(0,0,0,0.5) 70%)',
                                        mixBlendMode: 'screen',
                                    }}
                                />
                            </motion.div>
                        )}

                        {/* Main text */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 text-center max-w-3xl px-10"
                        >
                            {slideText ? (
                                <h2
                                    className="text-3xl md:text-5xl font-light text-white leading-relaxed"
                                    style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', letterSpacing: '0.04em' }}
                                >
                                    {slideText}
                                </h2>
                            ) : (
                                <h2
                                    className="text-3xl md:text-4xl font-light text-white/50 leading-relaxed italic"
                                    style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.04em' }}
                                >
                                    You are currently inside your target sector.
                                </h2>
                            )}

                            {/* Breathing guide */}
                            <motion.div
                                animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.97, 1.02, 0.97] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                className="mt-20 text-[10px] uppercase tracking-[0.4em] text-white/30"
                                style={{ fontFamily: 'var(--font-dm-sans)' }}
                            >
                                Inhale · Hold · Exhale
                            </motion.div>

                            {/* Ripple rings */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute rounded-full border border-white/5"
                                        style={{ width: i * 180, height: i * 180, left: -(i * 90), top: -(i * 90) }}
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0, 0.08] }}
                                        transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: 'easeOut' }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
