import { create } from 'zustand';
import { Chapter } from './types';

interface AppState {
    intention: string;
    setIntention: (intention: string) => void;
    selectedChapter: Chapter | null;
    setSelectedChapter: (chapter: Chapter | null) => void;
    isFocusMode: boolean;
    setFocusMode: (isFocus: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    intention: '',
    setIntention: (intention) => set({ intention }),
    selectedChapter: null,
    setSelectedChapter: (chapter) => set({ selectedChapter: chapter }),
    isFocusMode: false,
    setFocusMode: (isFocus) => set({ isFocusMode: isFocus }),
}));
