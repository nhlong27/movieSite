import React from 'react';
import { movieFilterListAtom, tvFilterListAtom } from '../../atoms';
import { useAtom } from 'jotai';
import { GenreType } from '@/types/types';
import { mediaTypeAtom } from '@/App';
import { mediaTypeConfig } from '@/config/constants';

const GenreListFilter: React.FC = () => {
  const [mediaType] = useAtom(mediaTypeAtom);

  // if (mediaType === 'movie') {
  const [_, setMovieFilterList] = useAtom(movieFilterListAtom);
  const [__, setTVFilterList] = useAtom(tvFilterListAtom);
  return (
    <div>
      {mediaTypeConfig[mediaType]['with_genres'].map((genre: GenreType, index: number) => {
        return (
          <button
            key={index}
            onClick={() => {
              mediaType === 'movie'
                ? setMovieFilterList((pre) => ({
                    ...pre,
                    with_genres: [...(pre.with_genres ?? []), genre.id],
                  }))
                : setTVFilterList((pre) => ({
                    ...pre,
                    with_genres: [...(pre.with_genres ?? []), genre.id],
                  }));
            }}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default GenreListFilter;
