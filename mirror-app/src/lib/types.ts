export interface Chapter {
    id: string;
    book: number;
    chapterNumber: number;
    title: string;
    surfacePrinciple: string;
    deepDive: string;
}

export interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
}
