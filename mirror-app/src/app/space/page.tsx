import Constellation from '@/components/Constellation';
import FocusMode from '@/components/FocusMode';
import Link from 'next/link';

export default function SpaceOfVariations() {
    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <Constellation />
            <FocusMode />

            {/* Title/Header inside Space */}
            <div className="absolute top-8 left-8 z-40 pointer-events-none fade-in">
                <h1 className="text-sm tracking-[0.3em] uppercase text-white/40">Space of Variations</h1>
                <p className="text-xs text-white/20 mt-1 font-light">Select a sector to tune your frequency</p>
            </div>

            <Link
                href="/dashboard"
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 px-6 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-colors"
            >
                Enter Practitioner Dashboard
            </Link>
        </main>
    );
}
