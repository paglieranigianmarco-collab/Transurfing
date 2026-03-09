"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JournalEntry {
    id: string;
    date: string;
    type: 'Wave of Fortune' | 'Coordination';
    content: string;
}

export default function IntentionJournal() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newType, setNewType] = useState<'Wave of Fortune' | 'Coordination'>('Wave of Fortune');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('transurfing_journal');
        if (saved) {
            setEntries(JSON.parse(saved));
        }
    }, []);

    const saveEntries = (newEntries: JournalEntry[]) => {
        setEntries(newEntries);
        localStorage.setItem('transurfing_journal', JSON.stringify(newEntries));
    };

    const handleAdd = () => {
        if (!newContent.trim()) return;
        const entry: JournalEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: newType,
            content: newContent
        };
        saveEntries([entry, ...entries]);
        setNewContent('');
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        saveEntries(entries.filter(e => e.id !== id));
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-light tracking-widest text-white uppercase flex items-center gap-2">
                    <BookOpen size={16} className="text-white/50" />
                    Intention Journal
                </h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-1 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                    <Plus size={14} /> New Entry
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 overflow-hidden"
                    >
                        <div className="p-6 border border-zinc-800 bg-zinc-900/50 rounded-xl space-y-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setNewType('Wave of Fortune')}
                                    className={`flex-1 py-2 text-xs tracking-widest uppercase border rounded transition-colors ${newType === 'Wave of Fortune' ? 'border-emerald-500 text-emerald-500' : 'border-zinc-800 text-zinc-500 hover:text-white'}`}
                                >
                                    Wave of Fortune
                                </button>
                                <button
                                    onClick={() => setNewType('Coordination')}
                                    className={`flex-1 py-2 text-xs tracking-widest uppercase border rounded transition-colors ${newType === 'Coordination' ? 'border-blue-500 text-blue-500' : 'border-zinc-800 text-zinc-500 hover:text-white'}`}
                                >
                                    Coordination
                                </button>
                            </div>
                            <textarea
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                placeholder={newType === 'Wave of Fortune' ? "Log a small win to catch the wave..." : "Log how you coordinated a negative event into a positive one..."}
                                className="w-full h-24 bg-transparent border border-zinc-800 rounded p-4 text-sm font-light focus:outline-none focus:border-white/50 resize-none text-white"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={!newContent.trim()}
                                    className="px-6 py-2 bg-white text-black text-xs uppercase tracking-widest rounded hover:bg-zinc-200 disabled:opacity-50"
                                >
                                    Save Entry
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                {entries.length === 0 && !isAdding && (
                    <div className="text-center py-12 border border-zinc-900 border-dashed rounded-xl">
                        <p className="text-sm font-light text-zinc-600">No journal entries yet. Log your first victory.</p>
                    </div>
                )}

                {entries.map((entry) => (
                    <motion.div
                        layout
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 border border-zinc-800/50 hover:border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900/50 rounded-xl transition-all group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${entry.type === 'Wave of Fortune' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : 'border-blue-500/30 text-blue-500 bg-blue-500/10'}`}>
                                    {entry.type}
                                </span>
                                <span className="text-xs text-zinc-600 font-mono tracking-wider">{entry.date}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <p className="text-zinc-300 font-light text-sm leading-relaxed mt-3">
                            {entry.content}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
