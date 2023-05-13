import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';

import { useMovieFiltersStore } from '../../stores';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { mediaTypeConfig } from '../../queries';

const MovieFilterSection = () => {
  const movieFiltersStore = useMovieFiltersStore();
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center'>
      <div className='w-11/12 text-xl text-stone-400 font-black py-2 mt-4 border-t-4 border-stone-400'>
        Sort by
        <SelectComponent
          options={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'release_date.desc', label: 'Most recent' },
            { value: 'vote_average.desc', label: 'Best rated' },
            { value: 'vote_count.desc', label: 'Most votes' },
          ]}
          name={'sort_by'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2'
          placeholder={'Most popular (default)'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => movieFiltersStore.addSortBy(val?.value)}
        />
      </div>
      <div className='w-11/12 flex gap-4 flex-wrap font-poppins text-lg font-bold'>
        <h1 className='w-full text-xl text-stone-400 font-black  py-2 mt-4 border-t-4 border-stone-400'>
        Genres
        </h1>
      {[...mediaTypeConfig.movie.discover.paramList.with_genres?? []].map(
          (genreObject) => (
            <ButtonComponent
              className={`rounded-xl ring-2 ring-stone-500 px-4 py-2 bg-stone-300 text-stone-600 ${
                movieFiltersStore.with_genres?.has(genreObject[0]!) ? 'bg-amber-200' : ''
              }`}
              onClick={() => movieFiltersStore.addGenres(genreObject[0]!)}
              key={genreObject[0]}
            >
              {genreObject[1]}
            </ButtonComponent>
          ),
        )}
      </div>
      <div className='w-11/12 flex gap-4 font-poppins text-lg font-bold py-2 items-center mt-16 border-t-4 justify-between border-stone-400'>
      <h1 className='text-xl text-stone-400 font-black '>
        From year
        </h1>
        <SelectComponent
          options={[
            ...Array.from(
              { length: new Date().getFullYear() - 1950 },
              (x, i) => new Date().getFullYear() - i,
            ),
          ].map((year) => ({ value: year.toString(), label: year.toString() }))}
          name={'year'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => movieFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
    </div>
  );
};

export default MovieFilterSection;
