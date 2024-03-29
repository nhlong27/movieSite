import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';
import { useTVFiltersStore } from '../../stores';
import { mediaTypeConfig } from '../../queries';
import ButtonComponent from '@/components/generic/ButtonComponent';

interface TVFilterSectionProps {}
const TVFilterSection: React.FC<TVFilterSectionProps> = (props) => {
  const tvFiltersStore = useTVFiltersStore();

  return (
    <div className='w-full lg:min-h-screen flex flex-col justify-start items-center dark:bg-stone-800'>
      <div className='w-full text-base text-slate-900 font-normal px-4 py-2 mt-4 dark:text-yellow-400  dark:border-b-2 dark:border-none'>
      <span className='pl-2 border-l-4 text-lg border-slate-300 dark:border-yellow-500'>Status</span>
        <SelectComponent
          options={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'release_date.desc', label: 'Most recent' },
            { value: 'vote_average.desc', label: 'Best rated' },
            { value: 'vote_count.desc', label: 'Most votes' },
          ]}
          name={'sort_by'}
          className=' rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder='Most popular'
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addSortBy(val.value)}
        />
      </div>
      <div className='w-full text-base text-slate-900 font-normal px-4 py-2 pb-8 dark:text-yellow-400  dark:border-b-2 dark:border-none mt-4'>
      <h1 className='pl-2 border-l-4 text-lg border-slate-300 dark:border-yellow-500'>
          Genres
        </h1>
        <div className='mt-4 w-full px-4 py-4 flex-wrap flex shadow-inner gap-4 rounded-xl ring-2 ring-slate-300 bg-slate-100 dark:bg-stone-700  dark:ring-stone-900'>
          {[...(mediaTypeConfig.tv.discover.paramList.with_genres ?? [])].map((genreObject) => (
            <ButtonComponent
            className={`rounded-xl dark:ring-2 px-2 py-[2px] shadow-md dark:ring-stone-900 ${
              tvFiltersStore.with_genres?.has(genreObject[0]!)
              ? 'bg-slate-500 text-lime-300 dark:bg-stone-800  dark:text-lime-300'
              : 'bg-slate-200 dark:bg-stone-500 dark:text-stone-900 dark:hover:bg-stone-600 text-slate-900'
            }`}
              onClick={() => tvFiltersStore.addGenres(genreObject[0]!)}
              key={genreObject[0]}
            >
              {genreObject[1]}
            </ButtonComponent>
          ))}
        </div>
      </div>
      <div className='w-full text-base text-slate-900 font-normal px-4 py-2 dark:text-yellow-400  dark:border-b-2 dark:border-none mt-4'>
      <h1 className='pl-2 border-l-4 text-lg border-slate-300 dark:border-yellow-500'>From year</h1>
        <SelectComponent
          options={[
            ...Array.from(
              { length: new Date().getFullYear() - 1950 },
              (x, i) => new Date().getFullYear() - i,
            ),
          ].map((year) => ({ value: year.toString(), label: year.toString() }))}
          name={'first_air_date_year'}
          className=' rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => tvFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
      <div className='w-full text-base text-slate-900 font-normal px-4 py-2 dark:text-yellow-400  dark:border-b-2 dark:border-none mt-4'>
        <h1 className='pl-2 border-l-4 text-lg border-slate-300 dark:border-yellow-500'>With status</h1>
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
          className='rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder={`Select`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addStatus(val?.value)}
        />
      </div>
      <div className='w-full text-base text-slate-900 font-normal px-4 py-2 dark:text-yellow-400  dark:border-b-2 dark:border-none mt-4'>
        <h1 className='pl-2 border-l-4 text-lg border-slate-300 dark:border-yellow-500'>With type</h1>
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
          className='rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2'
          placeholder={`Select`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addType(val?.value)}
        />
      </div>
    </div>
  );
};

export default TVFilterSection;
