"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import SlideProjector from '@/components/SlideProjector';
import ImportanceMeter from '@/components/ImportanceMeter';
import IntentionJournal from '@/components/IntentionJournal';
import DailyOracle from '@/components/DailyOracle';
import RealityCheckTimer from '@/components/RealityCheckTimer';
import WaveTimeline from '@/components/WaveTimeline';
import PremiumModal from '@/components/PremiumModal';
import { useAppStore } from '@/lib/store';

export default function Dashboard() {
    const { isPremium } = useAppStore();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <nav className="fixed top-0 w-full p-6 sm:p-8 flex justify-between items-center z-50 mix-blend-difference">
                <Link
                    href="/space"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} /> Return to Space
                </Link>

                {isPremium ? (
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-amber-400/30 text-amber-400/80">
                        <Sparkles size={12} fill="currentColor" />
                        Practitioner Active
                    </div>
                ) : (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all"
                    >
                        <Sparkles size={12} />
                        Unlock Access
                    </button>
                )}
            </nav>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 relative z-10">

                {/* Daily Oracle — full width at top */}
                <div className="mb-12">
                    <DailyOracle isPremium={isPremium} onRequestUpgrade={() => setModalOpen(true)} />
                </div>

                <header className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-4">Practitioner Dashboard</h1>
                    <p className="text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Manage your Target Slides, continuously calibrate your Importance, and log the coordinates of your Wave of Fortune here.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <SlideProjector isPremium={isPremium} onRequestUpgrade={() => setModalOpen(true)} />
                        </section>

                        <section>
                            <ImportanceMeter isPremium={isPremium} onRequestUpgrade={() => setModalOpen(true)} />
                        </section>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 border border-zinc-900 bg-zinc-950/30 rounded-2xl">
                                <IntentionJournal />
                                <div className="mt-8">
                                    <WaveTimeline isPremium={isPremium} onRequestUpgrade={() => setModalOpen(true)} />
                                </div>
                            </div>

                            <RealityCheckTimer isPremium={isPremium} onRequestUpgrade={() => setModalOpen(true)} />
                        </div>
                    </div>

                </div>
            </div>

            <PremiumModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </main>
    );
}
