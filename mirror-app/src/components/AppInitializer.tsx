"use client";

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { readPremiumStatus, readVisitedChapters, ensureFirstVisit } from '@/lib/premium';

/**
 * Renders nothing. Bootstraps persistent state (premium status, visited chapters)
 * from localStorage into the Zustand store on first mount.
 */
export default function AppInitializer() {
    const { setPremium, initVisited } = useAppStore();

    useEffect(() => {
        ensureFirstVisit();
        if (readPremiumStatus()) {
            setPremium(true);
        }
        const visited = readVisitedChapters();
        if (visited.size > 0) {
            initVisited([...visited]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
