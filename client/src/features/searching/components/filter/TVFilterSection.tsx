import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';
import { useTVFiltersStore } from '../../stores';
import { mediaTypeConfig } from '../../queries';
import ButtonComponent from '@/components/generic/ButtonComponent';

interface TVFilterSectionProps {}
const TVFilterSection: React.FC<TVFilterSectionProps> = (props) => {
  const tvFiltersStore = useTVFiltersStore();

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
          placeholder='Select'
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addSortBy(val.value)}
        />
      </div>
      <div className='w-11/12 font-poppins text-lg font-bold'>
        <h1 className='w-full text-xl text-stone-400 font-black  py-2 mt-4 border-t-4 border-stone-400'>
          Genres
        </h1>
        <div className='w-full py-4 px-2 flex-wrap flex gap-4 rounded-xl ring-2 ring-stone-400 bg-stone-300 shadow-inner'>
          {[...(mediaTypeConfig.tv.discover.paramList.with_genres ?? [])].map((genreObject) => (
            <ButtonComponent
              className={`rounded-xl ring-2 ring-stone-500 px-4 py-2 shadow-lg  text-stone-600 ${
                tvFiltersStore.with_genres?.has(genreObject[0]!) ? 'bg-amber-200' : 'bg-stone-200'
              }`}
              onClick={() => tvFiltersStore.addGenres(genreObject[0]!)}
              key={genreObject[0]}
            >
              {genreObject[1]}
            </ButtonComponent>
          ))}
        </div>
      </div>
      <div className='w-11/12 flex gap-4 font-poppins text-lg font-bold py-2 items-center mt-16 border-t-4 justify-between border-stone-400'>
        <h1 className='text-xl text-stone-400 font-black '>From year</h1>
        <SelectComponent
          options={[
            ...Array.from(
              { length: new Date().getFullYear() - 1950 },
              (x, i) => new Date().getFullYear() - i,
            ),
          ].map((year) => ({ value: year.toString(), label: year.toString() }))}
          name={'first_air_date_year'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => tvFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
      <div className='w-11/12 flex gap-4 font-poppins text-lg font-bold py-2 justify-between items-center mt-4 border-t-4 border-stone-400'>
        <h1 className='text-xl text-stone-400 font-black '>With status</h1>
        <SelectComponent
          options={[
            { value: '0', label: 'Returning Series' },
            { value: '1', label: 'Planned' },
            { value: '2', label: 'In Production' },
            { value: '3', label: 'Ended' },
            { value: '4', label: 'Cancelled' },
            { value: '5', label: 'Pilot' },
          ]}
          name={'with_status'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2 min-w-[10rem]'
          placeholder={`Select`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addStatus(val?.value)}
        />
      </div>
      <div className='w-11/12 flex gap-4 font-poppins text-lg font-bold py-2 items-center mt-4 border-t-4 justify-between border-stone-400'>
        <h1 className='text-xl text-stone-400 font-black '>With type</h1>
        <SelectComponent
          options={[
            { value: '0', label: 'Documentary' },
            { value: '1', label: 'News' },
            { value: '2', label: 'Miniseries' },
            { value: '3', label: 'Reality' },
            { value: '4', label: 'Scripted' },
            { value: '5', label: 'Talk Show' },
            { value: '6', label: 'Video' },
          ]}
          name={'with_type'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2 min-w-[10rem]'
          placeholder={`Select`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addType(val?.value)}
        />
      </div>
    </div>
  );
};

export default TVFilterSection;
