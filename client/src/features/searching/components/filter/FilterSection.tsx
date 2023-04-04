import React from 'react';
import { useAtom } from 'jotai';
import { itemFilterListAtom } from '../../atoms';
import { isFilterAtom, mediaTypeAtom } from '@/App';

const FilterSection: React.FC = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [_, setIsFilter] = useAtom(isFilterAtom);
  const [itemFilterList, setItemFilterList] = useAtom(itemFilterListAtom);
  return (
    <div className='row-start-1 p-2  col-start-1  md:col-start-4 md:h-full'>
      <div className='md:sticky md:top-[10vh] min-h-1/2 w-full'>
        {/* <button onClick={() => setIsFilter(true)}>Fitler filter</button> */}
        <div>
          Movies | TV Shows
        </div>
        <div>
          Sort by
          {/* sort_by */}
        </div>
        <div>
          Genres 
          {/* with_genres */}
        </div>
        <div>
          From year
          {/* year/ first air date year */}
        </div>
        <div>
          With status
          {/* with_status */}
        </div>
        <div>
          With type
          {/* with_type */}
        </div>
      </div>
      {/* {Object.entries(
        mediaTypeConfig[`${mediaType}`].discover.paramList,
      ).map((pair: Array<string | string[] >, index) => {
        return (
          <div key={index}>
            {pair[0]}
            {(pair[1] as string[]).map((subOption: string, index) => {
              return (
                <button
                  key={index}
                  onClick={() =>
                    setItemFilterList((pre) => ({
                      ...pre,
                      [`${pair[0]}`]: [...(pair[0]?? []), subOption],
                    }))
                  }
                >
                  {subOption}
                </button>
              );
            })}
          </div>
        );
      })} */}
      {/* <GenreListFilter /> */}
    </div>
  );
};

export default FilterSection;
