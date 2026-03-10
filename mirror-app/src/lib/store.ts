import { create } from 'zustand';
import { Chapter, ChapterTier } from './types';

interface AppState {
    // ── Intention / mirror entry ──────────────────────────────────────
    intention: string;
    setIntention: (intention: string) => void;
    submitted: boolean;
    setSubmitted: (v: boolean) => void;

    // ── 3D space ──────────────────────────────────────────────────────
    selectedChapter: Chapter | null;
    setSelectedChapter: (chapter: Chapter | null) => void;
    isFocusMode: boolean;
    setFocusMode: (isFocus: boolean) => void;
    orbitFilter: ChapterTier | 'all';
    setOrbitFilter: (tier: ChapterTier | 'all') => void;
    flyTarget: [number, number, number] | null;
    setFlyTarget: (pos: [number, number, number] | null) => void;

    // ── Premium ───────────────────────────────────────────────────────
    isPremium: boolean;
    setPremium: (v: boolean) => void;

    // ── Progress tracking ─────────────────────────────────────────────
    visitedChapterIds: Set<string>;
    markChapterVisited: (id: string) => void;
    initVisited: (ids: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
    // ── Intention ─────────────────────────────────────────────────────
    intention: '',
    setIntention: (intention) => set({ intention }),
    submitted: false,
    setSubmitted: (submitted) => set({ submitted }),

    // ── 3D space ──────────────────────────────────────────────────────
    selectedChapter: null,
    setSelectedChapter: (selectedChapter) => set({ selectedChapter }),
    isFocusMode: false,
    setFocusMode: (isFocusMode) => set({ isFocusMode }),
    orbitFilter: 'all',
    setOrbitFilter: (orbitFilter) => set({ orbitFilter }),
    flyTarget: null,
    setFlyTarget: (flyTarget) => set({ flyTarget }),

    // ── Premium ───────────────────────────────────────────────────────
    isPremium: false,
    setPremium: (isPremium) => set({ isPremium }),

    // ── Progress tracking ─────────────────────────────────────────────
    visitedChapterIds: new Set<string>(),
    markChapterVisited: (id) =>
        set((state) => ({ visitedChapterIds: new Set([...state.visitedChapterIds, id]) })),
    initVisited: (ids) =>
        set({ visitedChapterIds: new Set(ids) }),
}));
