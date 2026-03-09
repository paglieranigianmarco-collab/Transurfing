"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import SlideProjector from '@/components/SlideProjector';
import ImportanceMeter from '@/components/ImportanceMeter';
import IntentionJournal from '@/components/IntentionJournal';

export default function Dashboard() {
    const [isPremium, setIsPremium] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Navbar equivalent */}
            <nav className="fixed top-0 w-full p-6 sm:p-8 flex justify-between items-center z-50 mix-blend-difference">
                <Link
                    href="/space"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> Return to Space
                </Link>

                {/* Mock Premium Toggle for Validation */}
                <button
                    onClick={() => setIsPremium(!isPremium)}
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isPremium ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'}`}
                >
                    <Sparkles size={12} fill={isPremium ? "black" : "none"} />
                    {isPremium ? 'Premium Active' : 'Enable Premium'}
                </button>
            </nav>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10">

                <header className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-4">Practitioner Dashboard</h1>
                    <p className="text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Manage your Target Slides, continuously calibrate your Importance, and log the coordinates of your Wave of Fortune here.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <div className="lg:col-span-7 space-y-12">
                        {/* The Slide Projector */}
                        <section>
                            <SlideProjector isPremium={isPremium} />
                        </section>

                        {/* The Importance Meter */}
                        <section>
                            <ImportanceMeter isPremium={isPremium} />
                        </section>
                    </div>

                    <div className="lg:col-span-5 relative">
                        {/* Intention Journal is Free and sits beside the others */}
                        <div className="sticky top-32">
                            <div className="p-8 border border-zinc-900 bg-zinc-950/30 rounded-2xl">
                                <IntentionJournal />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
