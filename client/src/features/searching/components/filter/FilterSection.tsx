import React from 'react';
import { useAtom } from 'jotai';
import { itemFilterListAtom } from '../../atoms';
import { mediaTypeAtom } from '@/App';
import { mediaTypeConfig } from '../../queries';


const FilterSection: React.FC = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [itemFilterList, setItemFilterList] = useAtom(itemFilterListAtom);
  console.log({itemFilterList})
  return (
    <div>
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
