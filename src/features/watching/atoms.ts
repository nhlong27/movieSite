import { atom } from 'jotai';
import { MovieDetailType, PersonDetailType, TVDetailType } from './types';

const movieDetailAtom = atom<MovieDetailType | null>(null);
const tvDetailAtom = atom<TVDetailType | null>(null);
const personDetailAtom = atom<PersonDetailType | null>(null);
const itemDetailAtom = atom<TVDetailType | MovieDetailType | PersonDetailType | null>(null);

export { movieDetailAtom, tvDetailAtom, personDetailAtom, itemDetailAtom };
