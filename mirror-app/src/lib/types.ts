export type ChapterTier = 'beginner' | 'practitioner' | 'master';

export interface Chapter {
    id: string;
    book: number;
    chapterNumber: number;
    zenTitle: string;
    title: string;
    tier: ChapterTier;
    surfacePrinciple: string;
    quote: string;
    deepDive: string;
    practicalSteps: [string, string, string];
}

export interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
}
