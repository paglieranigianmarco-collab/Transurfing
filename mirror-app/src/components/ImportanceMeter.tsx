"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle } from 'lucide-react';

export default function ImportanceMeter({ isPremium }: { isPremium: boolean }) {
    const [situation, setSituation] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{ excessPotential: string; reductionTechnique: string } | null>(null);

    const analyzeImportance = () => {
        if (!situation.trim()) return;
        setAnalyzing(true);
        setResult(null);

        // Simulate AI synthesis of Book IV/Balance
        setTimeout(() => {
            setResult({
                excessPotential: "You have assigned massive internal significance to the outcome of this specific event. This creates a vacuum in the energy field. The Balancing Forces are actively preparing to fail you to flatten this potential.",
                reductionTechnique: "Accept the worst-case scenario mentally. Write it down, accept it, and find an alternative 'lifeline' you would be okay with. Once accepted, step into the action like a detached observer executing a task. Replace Desire (craving) with Intention (calm resolve)."
            });
            setAnalyzing(false);
        }, 1500);
    };

    if (!isPremium) {
        return (
            <div className="relative w-full p-8 border border-white/10 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
                <Lock className="w-8 h-8 text-white/30 mb-4" />
                <h3 className="text-xl font-light tracking-widest text-white/80 mb-2 uppercase text-sm">The Importance Meter</h3>
                <p className="text-zinc-500 font-light text-center max-w-sm mb-6 text-sm">
                    Diagnose 'Excess Potential' and generate specific reduction techniques based on Book IV: Balance. Requires Premium.
                </p>
                <button className="px-6 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Unlock Feature
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full p-8 border border-zinc-800 bg-zinc-950/80 rounded-2xl">
            <h3 className="text-sm font-light tracking-widest text-white uppercase mb-6 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Importance Meter
            </h3>

            <div className="space-y-4">
                <textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="Describe a situation causing you extreme stress or anxiety right now..."
                    className="w-full h-24 bg-transparent border border-zinc-800 rounded p-4 text-sm font-light focus:outline-none focus:border-white/50 resize-none transition-colors text-white"
                />
                <button
                    onClick={analyzeImportance}
                    disabled={!situation.trim() || analyzing}
                    className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-medium rounded hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    {analyzing ? 'Checking Balancing Forces...' : 'Diagnose Potential'}
                </button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-4 pt-6 border-t border-zinc-800"
                >
                    <div>
                        <h4 className="text-[10px] uppercase text-amber-500 tracking-widest mb-1">Detected Excess Potential</h4>
                        <p className="text-sm font-light leading-relaxed text-zinc-300 bg-amber-500/10 p-3 rounded border border-amber-500/20">
                            {result.excessPotential}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase text-emerald-500 tracking-widest mb-1">Reduction Technique</h4>
                        <p className="text-sm font-light leading-relaxed text-zinc-300 bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                            {result.reductionTechnique}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
