"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Bell, BellOff, Plus, X } from 'lucide-react';

const TIMER_KEY = 'transurfing_timer';

const AWARENESS_PROMPTS = [
    "Are you awake right now? Which pendulum is shaping your current thoughts?",
    "Pause. Observe. What importance are you assigning right now?",
    "You are the observer. Watch the dream without being swept away.",
    "Is this thought yours, or a pendulum speaking through you?",
    "The Space of Variations is open. What sector are you tuned to?",
    "Breathe. Lower importance. Act without craving.",
    "Your world is a mirror. What image are you projecting right now?",
    "My world takes care of me. Everything is unfolding correctly.",
    "Release the how. Hold the what. Trust the direction.",
];

interface TimerConfig {
    enabled: boolean;
    times: string[];
}

function loadConfig(): TimerConfig {
    try {
        const raw = localStorage.getItem(TIMER_KEY);
        if (!raw) return { enabled: false, times: ['09:00', '13:00', '17:00'] };
        return JSON.parse(raw);
    } catch {
        return { enabled: false, times: ['09:00', '13:00', '17:00'] };
    }
}

function saveConfig(cfg: TimerConfig) {
    localStorage.setItem(TIMER_KEY, JSON.stringify(cfg));
}

export default function RealityCheckTimer({
    isPremium,
    onRequestUpgrade,
}: {
    isPremium: boolean;
    onRequestUpgrade: () => void;
}) {
    const [config, setConfig] = useState<TimerConfig>({ enabled: false, times: ['09:00', '13:00', '17:00'] });
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const lastFiredRef = useRef<Record<string, number>>({});

    // Load config on mount
    useEffect(() => {
        setConfig(loadConfig());
        if (typeof Notification !== 'undefined') {
            setPermission(Notification.permission);
        }
    }, []);

    // Persist config changes
    useEffect(() => {
        saveConfig(config);
    }, [config]);

    // Scheduler: check every 30 seconds
    useEffect(() => {
        if (!config.enabled || permission !== 'granted') return;

        const interval = setInterval(() => {
            const now = new Date();
            const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const nowTs = now.getTime();

            config.times.forEach((slot) => {
                if (slot === hhmm) {
                    const lastFired = lastFiredRef.current[slot] ?? 0;
                    // Only fire once per minute per slot
                    if (nowTs - lastFired > 60000) {
                        lastFiredRef.current[slot] = nowTs;
                        const prompt = AWARENESS_PROMPTS[Math.floor(Math.random() * AWARENESS_PROMPTS.length)];
                        new Notification('The Mirror Awakens', {
                            body: prompt,
                            icon: '/Transurfing/favicon.ico',
                        });
                    }
                }
            });
        }, 30000);

        return () => clearInterval(interval);
    }, [config.enabled, config.times, permission]);

    const requestPermission = async () => {
        if (typeof Notification === 'undefined') return;
        const result = await Notification.requestPermission();
        setPermission(result);
    };

    const updateTime = (index: number, value: string) => {
        const times = [...config.times];
        times[index] = value;
        setConfig((c) => ({ ...c, times }));
    };

    const addSlot = () => {
        if (config.times.length >= 9) return;
        setConfig((c) => ({ ...c, times: [...c.times, '20:00'] }));
    };

    const removeSlot = (index: number) => {
        setConfig((c) => ({ ...c, times: c.times.filter((_, i) => i !== index) }));
    };

    const toggleEnabled = () => {
        setConfig((c) => ({ ...c, enabled: !c.enabled }));
    };

    if (!isPremium) {
        return (
            <div className="relative w-full p-6 border border-white/8 bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[200px]">
                <Lock className="w-6 h-6 text-white/20 mb-3" />
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/50 mb-1">Reality Check Timer</h3>
                <p className="text-zinc-600 font-light text-center text-xs leading-relaxed mb-4 max-w-xs">
                    Schedule daily awareness reminders. Aligned with Ch. 15: The Awakened Dreamer.
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

    return (
        <div className="w-full p-6 border border-zinc-800/60 bg-zinc-950/80 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-white flex items-center gap-2">
                        <Bell size={12} className="text-blue-400/70" />
                        Reality Check Timer
                    </h3>
                    <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">Ch. 15: The Awakened Dreamer</p>
                </div>
                {/* Enable toggle */}
                <button
                    onClick={toggleEnabled}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest transition-all"
                >
                    <motion.div
                        className="w-2 h-2 rounded-full border"
                        style={{
                            backgroundColor: config.enabled ? '#4B9FFF' : 'transparent',
                            borderColor: config.enabled ? '#4B9FFF' : 'rgba(255,255,255,0.2)',
                            boxShadow: config.enabled ? '0 0 8px #4B9FFF' : 'none',
                        }}
                        animate={config.enabled ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span style={{ color: config.enabled ? '#4B9FFF' : 'rgba(255,255,255,0.2)' }}>
                        {config.enabled ? 'Active' : 'Off'}
                    </span>
                </button>
            </div>

            {/* Permission request */}
            {permission !== 'granted' && (
                <div className="mb-5 p-3 border border-blue-400/15 bg-blue-400/5 rounded-xl">
                    <p className="text-[11px] text-zinc-400 font-light mb-2 leading-relaxed">
                        Allow notifications to receive daily awareness prompts.
                    </p>
                    <button
                        onClick={requestPermission}
                        className="text-[10px] uppercase tracking-widest text-blue-400/70 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                        <Bell size={10} /> Allow Notifications
                    </button>
                    {permission === 'denied' && (
                        <p className="text-[10px] text-red-400/60 mt-2">
                            Notifications blocked in browser settings. Enable them manually.
                        </p>
                    )}
                </div>
            )}

            {/* Time slots */}
            <div className="space-y-2 mb-4">
                {config.times.map((time, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => updateTime(i, e.target.value)}
                            className="flex-1 bg-transparent border-b border-zinc-800 focus:border-white/30 text-sm font-light text-white focus:outline-none transition-colors py-1 px-1"
                            style={{ colorScheme: 'dark' }}
                        />
                        <button
                            onClick={() => removeSlot(i)}
                            className="text-zinc-700 hover:text-red-400 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>

            {config.times.length < 9 && (
                <button
                    onClick={addSlot}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                >
                    <Plus size={10} /> Add time slot
                </button>
            )}

            {config.enabled && permission === 'granted' && (
                <p className="text-[10px] text-blue-400/50 mt-4 tracking-wider">
                    {config.times.length} reminder{config.times.length !== 1 ? 's' : ''} scheduled daily.
                </p>
            )}
        </div>
    );
}
