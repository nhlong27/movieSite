import { atom } from 'jotai';

const seasonAndEpisodeAtom = atom<{ season?: number; episode?: number } | null>(null);

export { seasonAndEpisodeAtom };
