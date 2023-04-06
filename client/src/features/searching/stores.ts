import { MovieType, TVType } from '@/types/types';
import { create } from 'zustand';

type MovieFiltersStore = {
  sort_by?: string;
  with_genres?: number[] | undefined;
  year?: number;
  addSortBy: (sortByValue: string) => void;
  addGenres: (newGenre: number) => void;
  addReleasedYear: (year: number) => void;
};

type TVFiltersStore = {
  sort_by?: string;
  with_genres?: number[] | undefined;
  first_air_date_year?: number;
  with_status?: string;
  with_type?: string;
  addSortBy: (sortByValue: string) => void;
  addGenres: (newGenre: number) => void;
  addReleasedYear: (year: number) => void;
  addStatus: (status: string) => void;
  addType: (type: string) => void;
};
// const log = (config: any) => (set: any, get: any, api: any) =>
//   config(
//     (...args: any) => {
//       console.log('  applying', args);
//       set(...args);
//       console.log('  new state', get());
//     },
//     get,
//     api,
//   );
type SectionBackdropItem = {
  trendingSectionBackdropItem?: MovieType | TVType;
  comingSoonSectionBackdropItem?: MovieType | TVType;
  airingSectionBackdropItem?: MovieType | TVType;
  getSectionBackdropItem: (section: string) => MovieType | TVType | undefined;
  setSectionBackdropItem: (section: string, newItem: MovieType | TVType) => void;
};

const useSectionBackdropItems = create<SectionBackdropItem>((set, get) => ({
  trendingSectionBackdropItem: undefined,
  comingSoonSectionBackdropItem: undefined,
  airingSectionBackdropItem: undefined,
  getSectionBackdropItem: (section) => {
    return section === 'trending'
      ? get().trendingSectionBackdropItem
      : section === 'comingSoon'
      ? get().comingSoonSectionBackdropItem
      : section === 'airing'
      ? get().airingSectionBackdropItem
      : undefined;
  },
  setSectionBackdropItem: (section, newItem) =>
    set((state) => ({
      trendingSectionBackdropItem:
        section === 'trending' ? newItem : state.trendingSectionBackdropItem,
      comingSoonSectionBackdropItem:
        section === 'comingSoon' ? newItem : state.comingSoonSectionBackdropItem,
      airingSectionBackdropItem: section === 'airing' ? newItem : state.airingSectionBackdropItem,
    })),
}));

const useMovieFiltersStore = create<MovieFiltersStore>((set) => ({
  sort_by: undefined,
  with_genres: undefined,
  year: undefined,
  addSortBy: (sortByValue: string) =>
    set(() => ({
      sort_by: sortByValue,
    })),
  addGenres: (newGenre: number) =>
    set((state) => {
      if (state.with_genres?.includes(newGenre)) {
        return {
          with_genres: [...state.with_genres.filter((element: number) => element !== newGenre)],
        };
      }
      return {
        with_genres: [...(state.with_genres ?? []), newGenre],
      };
    }),
  addReleasedYear: (year: number) =>
    set(() => ({
      year: year,
    })),
}));

const useTVFiltersStore = create<TVFiltersStore>((set) => ({
  sort_by: undefined,
  with_genres: undefined,
  first_air_date_year: undefined,
  with_status: undefined,
  with_type: undefined,
  addSortBy: (sortByValue: string) =>
    set(() => ({
      sort_by: sortByValue,
    })),
  addGenres: (newGenre: number) =>
    set((state) => {
      if (state.with_genres?.includes(newGenre)) {
        return {
          with_genres: [...state.with_genres.filter((element) => element !== newGenre)],
        };
      }
      return {
        with_genres: [...(state.with_genres ?? []), newGenre],
      };
    }),
  addReleasedYear: (year: number) =>
    set(() => ({
      first_air_date_year: year,
    })),
  addStatus: (status: string) =>
    set(() => ({
      with_status: status,
    })),
  addType: (type: string) =>
    set(() => ({
      with_type: type,
    })),
}));

export { useMovieFiltersStore, useTVFiltersStore, useSectionBackdropItems };
