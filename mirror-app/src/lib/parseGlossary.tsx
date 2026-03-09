import React from 'react';
import { glossary } from '@/data/glossary';

// Highlight glossary terms in the text and enable hover tooltips
export function renderWithGlossaryTooltips(text: string) {
    // Sort by length descending to prevent partial word matching (e.g. matching "Intent" inside "Intention")
    const terms = [...glossary].sort((a, b) => b.term.length - a.term.length);

    // Create a regex to find all terms exactly, ignoring case boundaries
    const regexPattern = new RegExp(`\\b(${terms.map(t => t.term).join('|')})\\b`, 'gi');

    // Split string by the regex 
    const parts = text.split(regexPattern);

    return parts.map((part, i) => {
        const termObj = terms.find(t => t.term.toLowerCase() === part.toLowerCase());

        if (termObj) {
            return (
                <span key={i} className="relative group cursor-help text-white font-medium border-b border-white/30 border-dashed pb-[1px] hover:border-white transition-colors">
                    {part}

                    {/* Tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left leading-relaxed">
                        <strong className="block text-white mb-1 uppercase tracking-widest text-[10px]">{termObj.term}</strong>
                        {termObj.definition}
                    </span>
                </span>
            );
        }

        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}
