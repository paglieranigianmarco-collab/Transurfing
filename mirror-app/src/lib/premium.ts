import { Chapter } from './types';

// ── Storage keys ─────────────────────────────────────────────────────
export const PREMIUM_STORAGE_KEY  = 'transurfing_premium';
export const VISITED_STORAGE_KEY  = 'transurfing_visited';
export const FIRST_VISIT_KEY      = 'transurfing_first_visit';

// ── License key hash (SHA-256 of "MIRROR-PRACTITIONER-2026") ─────────
// To rotate: node -e "require('crypto').createHash('sha256').update('NEW-KEY').digest('hex')"
const EXPECTED_KEY_HASH = '6cc15d447ec0377248645859f74ba3b1c6afa9444a1b07d436c2909a29af56da';

// ── License key validation (Web Crypto API) ───────────────────────────
export async function validateLicenseKey(key: string): Promise<boolean> {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(key.trim().toUpperCase());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex === EXPECTED_KEY_HASH;
    } catch {
        return false;
    }
}

// ── Premium status ────────────────────────────────────────────────────
export function readPremiumStatus(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const raw = localStorage.getItem(PREMIUM_STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        return parsed?.activated === true;
    } catch {
        return false;
    }
}

export function writePremiumUnlock(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify({
        activated: true,
        at: new Date().toISOString(),
    }));
}

// ── Visited chapters ──────────────────────────────────────────────────
export function readVisitedChapters(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        const raw = localStorage.getItem(VISITED_STORAGE_KEY);
        if (!raw) return new Set();
        return new Set(JSON.parse(raw) as string[]);
    } catch {
        return new Set();
    }
}

export function writeVisitedChapter(id: string): void {
    if (typeof window === 'undefined') return;
    const existing = readVisitedChapters();
    existing.add(id);
    localStorage.setItem(VISITED_STORAGE_KEY, JSON.stringify([...existing]));
}

// ── First visit / day count ───────────────────────────────────────────
export function ensureFirstVisit(): void {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
        localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    }
}

export function getPracticeDay(): number {
    if (typeof window === 'undefined') return 1;
    const raw = localStorage.getItem(FIRST_VISIT_KEY);
    if (!raw) return 1;
    const firstVisit = new Date(raw).getTime();
    const now = Date.now();
    return Math.max(1, Math.floor((now - firstVisit) / 86400000) + 1);
}

// ── Daily oracle helpers ──────────────────────────────────────────────
export function getDailyOracleIndex(): number {
    const day = Math.floor(Date.now() / 86400000);
    return day % 19;
}

export function getDailyStepIndex(): number {
    const day = Math.floor(Date.now() / 86400000);
    return day % 3;
}
