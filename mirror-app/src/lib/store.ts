import { create } from 'zustand';
import { Chapter, ChapterTier } from './types';

interface AppState {
    intention: string;
    setIntention: (intention: string) => void;
    submitted: boolean;
    setSubmitted: (v: boolean) => void;
    selectedChapter: Chapter | null;
    setSelectedChapter: (chapter: Chapter | null) => void;
    isFocusMode: boolean;
    setFocusMode: (isFocus: boolean) => void;
    orbitFilter: ChapterTier | 'all';
    setOrbitFilter: (tier: ChapterTier | 'all') => void;
    flyTarget: [number, number, number] | null;
    setFlyTarget: (pos: [number, number, number] | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    intention: '',
    setIntention: (intention) => set({ intention }),
    submitted: false,
    setSubmitted: (submitted) => set({ submitted }),
    selectedChapter: null,
    setSelectedChapter: (chapter) => set({ selectedChapter: chapter }),
    isFocusMode: false,
    setFocusMode: (isFocusMode) => set({ isFocusMode }),
    orbitFilter: 'all',
    setOrbitFilter: (orbitFilter) => set({ orbitFilter }),
    flyTarget: null,
    setFlyTarget: (flyTarget) => set({ flyTarget }),
}));
