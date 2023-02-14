import React from 'react';
import { movieFilterListAtom, tvFilterListAtom } from '../atoms';
import { useAtom } from 'jotai';
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { appLoader } from '@/routes/router';
import { GenreType } from '@/types/types';

interface GenreListFilterProps {
  role: 'movie' | 'tv';
}
const GenreListFilter: React.FC<GenreListFilterProps> = (props) => {
  const { role } = props;
  const queryClient = useQueryClient();
  const [[movieGenreList], [TVGenreList]] = [getMovieGenresQuery(), getTVGenresQuery()].map(
    (each) => queryClient.getQueriesData<{ genres: GenreType[] }>(each),
  );
  if (role === 'movie') {
    const [filterList, setFilterList] = useAtom(movieFilterListAtom);
    return movieGenreList ? (
      <div className='flex gap-4'>
        {movieGenreList?.[1]?.genres?.map((genre: GenreType, index: number) => {
          return (
            <button
              onClick={() =>
                setFilterList((pre) => ({
                  ...pre,
                  with_genres: [...(filterList.with_genres ?? []), genre.id],
                }))
              }
              key={index}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    ) : (movieGenreList as UseQueryResult).error instanceof Error ? (
      <div>Error</div>
    ) : (
      <div>Loading..</div>
    );
  } else {
    const [filterList, setFilterList] = useAtom(tvFilterListAtom);
    return TVGenreList ? (
      <div className='flex gap-4'>
        {TVGenreList?.[1]?.genres?.map((genre: GenreType, index: number) => {
          return (
            <button
              onClick={() =>
                setFilterList((pre) => ({
                  ...pre,
                  with_genres: [...(filterList.with_genres ?? []), genre.id],
                }))
              }
              key={index}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    ) : (TVGenreList as UseQueryResult).error instanceof Error ? (
      <div>Error</div>
    ) : (
      <div>Loading..</div>
    );
  }
};

export default GenreListFilter;
