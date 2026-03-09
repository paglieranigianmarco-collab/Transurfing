import Constellation from '@/components/Constellation';
import FocusMode from '@/components/FocusMode';
import OrbitLegend from '@/components/OrbitLegend';
import Link from 'next/link';

export default function SpaceOfVariations() {
    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <Constellation />
            <FocusMode />
            <OrbitLegend />

            {/* Minimal header */}
            <div className="absolute top-8 left-8 z-40 pointer-events-none fade-in">
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/20">Space of Variations</p>
                <p className="text-[9px] text-white/12 mt-1 tracking-wider" style={{ color: 'rgba(255,255,255,0.1)' }}>
                    Select an orbit node to enter
                </p>
            </div>

            {/* Dashboard link */}
            <Link
                href="/dashboard"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 px-7 py-2.5 border border-white/12 rounded-full text-[10px] uppercase tracking-[0.25em] bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all text-white/40 hover:text-black"
            >
                Practitioner Dashboard
            </Link>
        </main>
    );
}
