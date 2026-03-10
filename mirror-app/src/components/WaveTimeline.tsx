"use client";

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const JOURNAL_KEY = 'transurfing_journal';

interface JournalEntry {
    id: string;
    date: string;       // e.g. "Jan 5, 2025"
    type: 'Wave of Fortune' | 'Coordination';
    content: string;
}

interface WeekData {
    weekLabel: string;
    wave: number;
    coord: number;
}

function parseWeekNumber(dateStr: string): string {
    // Approximate: group by first 3 chars of month + year
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr.slice(0, 6);
        const year = d.getFullYear();
        const week = Math.floor((d.getTime() - new Date(year, 0, 1).getTime()) / 604800000);
        return `${year}-W${String(week).padStart(2, '0')}`;
    } catch { return 'unk'; }
}

function groupByWeek(entries: JournalEntry[]): WeekData[] {
    const map: Record<string, { wave: number; coord: number }> = {};
    entries.forEach((e) => {
        const wk = parseWeekNumber(e.date);
        if (!map[wk]) map[wk] = { wave: 0, coord: 0 };
        if (e.type === 'Wave of Fortune') map[wk].wave++;
        else map[wk].coord++;
    });

    const sorted = Object.keys(map).sort();
    // Show last 8 weeks
    const last8 = sorted.slice(-8);
    return last8.map((wk) => ({ weekLabel: wk.slice(-3), wave: map[wk].wave, coord: map[wk].coord }));
}

function smoothPath(points: [number, number][]): string {
    if (points.length < 2) return '';
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev[0] + curr[0]) / 2;
        d += ` C ${cpx} ${prev[1]}, ${cpx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
    }
    return d;
}

export default function WaveTimeline({
    isPremium,
    onRequestUpgrade,
}: {
    isPremium: boolean;
    onRequestUpgrade: () => void;
}) {
    const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

    const weeks = useMemo(() => {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem(JOURNAL_KEY);
            if (!raw) return [];
            const entries: JournalEntry[] = JSON.parse(raw);
            return groupByWeek(entries);
        } catch { return []; }
    }, []);

    const svgRef = useRef<SVGSVGElement>(null);

    const W = 560, H = 140, PAD_X = 32, PAD_Y = 20;
    const plotW = W - PAD_X * 2;
    const plotH = H - PAD_Y * 2;
    const maxVal = Math.max(1, ...weeks.map(w => Math.max(w.wave, w.coord)));

    const xFor = (i: number) => PAD_X + (i / Math.max(weeks.length - 1, 1)) * plotW;
    const yFor = (v: number) => PAD_Y + plotH - (v / maxVal) * plotH;

    const wavePoints: [number, number][] = weeks.map((w, i) => [xFor(i), yFor(w.wave)]);
    const coordPoints: [number, number][] = weeks.map((w, i) => [xFor(i), yFor(w.coord)]);

    // Path lengths for draw-in animation (approximate)
    const wavePath = smoothPath(wavePoints);
    const coordPath = smoothPath(coordPoints);

    if (!isPremium) {
        return (
            <div className="relative w-full p-6 border border-white/8 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[180px]">
                <Lock className="w-6 h-6 text-white/20 mb-3" />
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/50 mb-1">Wave of Fortune Timeline</h3>
                <p className="text-zinc-600 font-light text-center text-xs leading-relaxed mb-4 max-w-xs">
                    Visualize your practice momentum as a flowing wave over time.
                </p>
                <button
                    onClick={onRequestUpgrade}
                    className="px-5 py-1.5 border border-amber-400/30 text-amber-400/60 rounded-full text-[10px] uppercase tracking-widest hover:bg-amber-400/10 transition-all"
                >
                    Unlock Access
                </button>
            </div>
        );
    }

    if (weeks.length === 0) {
        return (
            <div className="w-full p-6 border border-zinc-800/60 bg-zinc-950/80 rounded-2xl">
                <h3 className="text-xs uppercase tracking-[0.25em] text-white mb-1">Wave of Fortune Timeline</h3>
                <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider mb-4">Ch. 3: The Golden Current</p>
                <p className="text-sm font-light text-zinc-600 text-center py-8">
                    No journal entries yet. Start logging your waves to see them here.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full p-6 border border-zinc-800/60 bg-zinc-950/80 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-white">Wave of Fortune Timeline</h3>
                    <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">Ch. 3: The Golden Current</p>
                </div>
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-emerald-400/60">
                        <span className="w-4 h-px bg-emerald-500 inline-block" /> Wave
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-400/60">
                        <span className="w-4 h-px bg-blue-500 inline-block" /> Coord.
                    </span>
                </div>
            </div>

            {/* SVG chart */}
            <div className="relative overflow-hidden">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full"
                    style={{ height: 140 }}
                    onMouseLeave={() => setTooltip(null)}
                >
                    {/* Grid lines */}
                    {[0, 0.5, 1].map((t) => (
                        <line
                            key={t}
                            x1={PAD_X} y1={PAD_Y + plotH * (1 - t)}
                            x2={W - PAD_X} y2={PAD_Y + plotH * (1 - t)}
                            stroke="rgba(255,255,255,0.04)" strokeWidth="1"
                        />
                    ))}

                    {/* Wave of Fortune path */}
                    {wavePath && (
                        <motion.path
                            d={wavePath}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                        />
                    )}

                    {/* Coordination path */}
                    {coordPath && (
                        <motion.path
                            d={coordPath}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                        />
                    )}

                    {/* Data points + tooltips */}
                    {weeks.map((w, i) => (
                        <g key={i}>
                            {w.wave > 0 && (
                                <circle
                                    cx={xFor(i)} cy={yFor(w.wave)} r={3}
                                    fill="#10B981" opacity={0.9}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={(e) => {
                                        const rect = svgRef.current?.getBoundingClientRect();
                                        if (!rect) return;
                                        setTooltip({ x: xFor(i), y: yFor(w.wave) - 16, text: `${w.wave} wave${w.wave !== 1 ? 's' : ''}` });
                                    }}
                                />
                            )}
                            {w.coord > 0 && (
                                <circle
                                    cx={xFor(i)} cy={yFor(w.coord)} r={3}
                                    fill="#3B82F6" opacity={0.9}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => {
                                        setTooltip({ x: xFor(i), y: yFor(w.coord) - 16, text: `${w.coord} coord.` });
                                    }}
                                />
                            )}
                            {/* Week label */}
                            <text
                                x={xFor(i)} y={H - 4}
                                textAnchor="middle"
                                fontSize="7"
                                fill="rgba(255,255,255,0.2)"
                                fontFamily="var(--font-dm-sans), system-ui"
                            >
                                {w.weekLabel}
                            </text>
                        </g>
                    ))}

                    {/* Tooltip */}
                    {tooltip && (
                        <g>
                            <rect x={tooltip.x - 24} y={tooltip.y - 14} width={48} height={16} rx={4} fill="rgba(0,0,0,0.85)" />
                            <text x={tooltip.x} y={tooltip.y - 3} textAnchor="middle" fontSize="8" fill="white" fontFamily="system-ui">
                                {tooltip.text}
                            </text>
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
}
