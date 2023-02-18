import { atom } from 'jotai';
import { MovieDetailType, TVDetailType } from './types';

const itemDetailAtom = atom<TVDetailType | MovieDetailType | null>(null);

export { itemDetailAtom };
