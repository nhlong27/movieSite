import { atom } from 'jotai';
import { MovieFilterList, StatusList, TVFilterList } from './types';

const queryAtom = atom<string | null>(null);
const movieFilterListAtom = atom<MovieFilterList>({ sort_by: 'popularity.desc', include_adult: false });
const tvFilterListAtom = atom<TVFilterList>({ sort_by: 'popularity.desc' });
const itemStatusAtom = atom<StatusList>({status: 'trending', period: 'day'});

export { queryAtom, movieFilterListAtom, tvFilterListAtom, itemStatusAtom };
