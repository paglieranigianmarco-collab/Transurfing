"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Image as ImageIcon, Maximize2, Minimize2 } from 'lucide-react';

export default function SlideProjector({ isPremium }: { isPremium: boolean }) {
    const [slideText, setSlideText] = useState('');
    const [slideImage, setSlideImage] = useState<string | null>(null);
    const [zenMode, setZenMode] = useState(false);

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
            <div className="relative w-full p-8 border border-white/10 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <Lock className="w-8 h-8 text-white/30 mb-4" />
                <h3 className="text-xl font-light tracking-widest text-white/80 mb-2 uppercase text-sm">The Slide Projector</h3>
                <p className="text-zinc-500 font-light text-center max-w-sm mb-6 text-sm">
                    Access the Zen Mode projection chamber to tune your frequency to your Target Slide. Requires Premium.
                </p>
                <button className="px-6 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Unlock Feature
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full p-8 border border-white/10 bg-zinc-950/80 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-light tracking-widest text-white uppercase">Target Slide</h3>
                    <button
                        onClick={() => setZenMode(true)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                    >
                        <Maximize2 size={14} /> Enter Zen Mode
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs uppercase text-zinc-500 tracking-wider mb-2">Slide Affirmation</label>
                        <textarea
                            value={slideText}
                            onChange={(e) => setSlideText(e.target.value)}
                            placeholder="Describe your target sector in present tense..."
                            className="w-full h-32 bg-transparent border border-white/20 rounded p-4 text-sm font-light focus:outline-none focus:border-white/60 resize-none transition-colors"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-xs uppercase text-zinc-500 tracking-wider mb-2">Visual Anchor</label>
                        <div className={`flex-1 min-h-[128px] border border-white/20 rounded flex items-center justify-center relative overflow-hidden group ${!slideImage ? 'border-dashed' : ''}`}>
                            {slideImage ? (
                                <>
                                    <img src={slideImage} alt="Slide" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                                    <label className="relative z-10 cursor-pointer text-xs uppercase tracking-widest text-white/80 bg-black/60 px-4 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        Change Anchor
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-white transition-colors">
                                    <ImageIcon strokeWidth={1} className="mb-2" />
                                    <span className="text-xs uppercase tracking-widest">Upload Image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Zen Mode Overlay */}
            <AnimatePresence>
                {zenMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    >
                        <button
                            onClick={() => setZenMode(false)}
                            className="absolute top-8 right-8 z-[110] text-white/30 hover:text-white transition-colors"
                        >
                            <Minimize2 size={24} strokeWidth={1} />
                        </button>

                        {slideImage && (
                            <motion.img
                                src={slideImage}
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.3 }}
                                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            />
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="relative z-10 text-center max-w-3xl px-8"
                        >
                            <h2 className="text-3xl md:text-5xl font-light text-white leading-relaxed tracking-wide">
                                {slideText || "You are currently tuned to your Target Sector."}
                            </h2>
                            {/* Slow Pulse Effect for meditative breathing */}
                            <motion.div
                                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.98, 1.02, 0.98] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="mt-16 text-xs uppercase tracking-widest text-zinc-500"
                            >
                                Inhale • Exhale
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
