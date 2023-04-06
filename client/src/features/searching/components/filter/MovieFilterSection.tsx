import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';

import { useMovieFiltersStore } from '../../stores';
import { GenreType } from '@/types/types';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { mediaTypeConfig } from '../../queries';

interface MovieFilterSectionProps {}
const MovieFilterSection: React.FC<MovieFilterSectionProps> = (props) => {
  const movieFiltersStore = useMovieFiltersStore();
  return (
    <div>
      <div>
        Sort by
        <SelectComponent
          options={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'release_date.desc', label: 'Most recent' },
            { value: 'vote_average.desc', label: 'Best rated' },
            { value: 'vote_count.desc', label: 'Most votes' },
          ]}
          name={'sort_by'}
          className='ring-2 ring-blue-300'
          placeholder={'Select'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => movieFiltersStore.addSortBy(val?.value)}
        />
      </div>
      <div className='flex gap-2 flex-wrap'>
        Genres
        {mediaTypeConfig.movie.discover.paramList.with_genres?.map(
          (genreObject: GenreType, index: number) => (
            <ButtonComponent
              className={`ring-2 ring-black ${
                movieFiltersStore.with_genres?.includes(genreObject.id!) ? 'text-red-200' : ''
              }`}
              onClick={() => movieFiltersStore.addGenres(genreObject.id!)}
              key={index}
            >
              {genreObject.name}
            </ButtonComponent>
          ),
        )}
      </div>
      <div>
        From year
        <SelectComponent
          options={[
            ...Array.from(
              { length: new Date().getFullYear() - 1950 },
              (x, i) => new Date().getFullYear() - i,
            ),
          ].map((year) => ({ value: year.toString(), label: year.toString() }))}
          name={'year'}
          className='ring-2 ring-blue-300'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => movieFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
    </div>
  );
};

export default MovieFilterSection;
