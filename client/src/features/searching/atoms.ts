import { atom } from 'jotai';
import { MovieFilterList, TVFilterList } from './types';

const queryAtom = atom<string | undefined>(undefined);
const itemFilterListAtom = atom<MovieFilterList | TVFilterList>({ sort_by: 'popularity.desc' });

export { queryAtom, itemFilterListAtom };
