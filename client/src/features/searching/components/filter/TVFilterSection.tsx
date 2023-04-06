import React from 'react';
import SelectComponent from '../../../../components/generic/SelectComponent';
import { useTVFiltersStore } from '../../stores';
import { mediaTypeConfig } from '../../queries';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { GenreType } from '@/types/types';

interface TVFilterSectionProps {}
const TVFilterSection: React.FC<TVFilterSectionProps> = (props) => {
  const tvFiltersStore = useTVFiltersStore();

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
          placeholder='Select'
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addSortBy(val.value)}
        />
      </div>
      <div className='flex gap-2 flex-wrap'>
        Genres
        {mediaTypeConfig.tv.discover.paramList.with_genres?.map(
          (genreObject: GenreType, index: number) => (
            <ButtonComponent
              className={`ring-2 ring-black ${
                tvFiltersStore.with_genres?.includes(genreObject.id!) ? 'text-red-200' : ''
              }`}
              onClick={() => tvFiltersStore.addGenres(genreObject.id!)}
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
          name={'first_air_date_year'}
          className='ring-2 ring-blue-300'
          placeholder={`${new Date().getFullYear().toString()}`}
          extras={{ isSearchable: true, isClearable: false }}
          handleOnChange={(val: any) => tvFiltersStore.addReleasedYear(parseInt(val?.value))}
        />
      </div>
      <div>
        With status
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
          className='ring-2 ring-blue-300'
          placeholder={`Select status`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addStatus(val?.value)}
        />
      </div>
      <div>
        With type
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
          className='ring-2 ring-blue-300'
          placeholder={`Select type`}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => tvFiltersStore.addType(val?.value)}
        />
      </div>
    </div>
  );
};

export default TVFilterSection;
