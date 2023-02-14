import React from 'react';
import { useAtom } from 'jotai';
import { movieFilterListAtom, tvFilterListAtom } from '../../atoms';
import GenreListFilter from './GenreListFilter';
import { mediaTypeAtom } from '@/App';
import { mediaTypeConfig } from '@/config/constants';

const FilterSection: React.FC = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [_, setMovieFilterList] = useAtom(movieFilterListAtom);
  const [__, setTVFilterList] = useAtom(tvFilterListAtom);
  return (
    <div>
      {mediaTypeConfig[mediaType].sort_by.map((option: string, index: number) => {
        return (
          <button
            key={index}
            onClick={() =>
              mediaType === 'movie'
                ? setMovieFilterList((pre) => ({
                    ...pre,
                    sort_by: option,
                    include_adult:
                      option === 'include_adult' ? !pre.include_adult : pre.include_adult,
                  }))
                : setTVFilterList((pre) => ({ ...pre, sort_by: option }))
            }
          >
            {option}
          </button>
        );
      })}
      <GenreListFilter />
    </div>
  );
};

export default FilterSection;
