import React from 'react';
import { useAtom } from 'jotai';
import { movieFilterListAtom, tvFilterListAtom } from '../atoms';
import GenreListFilter from './GenreListFilter';

interface FilterSectionProps {
  role: 'tv' | 'movie';
}
const FilterSection: React.FC<FilterSectionProps> = (props) => {
  const { role } = props;
  if (role === 'movie') {
    const [filterList, setFilterList] = useAtom(movieFilterListAtom);
    return (
      <div>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'popularity.desc' }))}>
          Popular
        </button>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'vote_average.desc' }))}>
          Top rated
        </button>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'vote_count.desc' }))}>
          Most rated
        </button>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'release_date.desc' }))}>
          Latest
        </button>
        <GenreListFilter role={role} />
        <button
          onClick={() =>
            setFilterList((pre) => ({ ...pre, include_adult: !filterList.include_adult }))
          }
        >
          Adult
        </button>
      </div>
    );
  } else {
    const [_, setFilterList] = useAtom(tvFilterListAtom);

    return (
      <div>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'popularity.desc' }))}>
          Popular
        </button>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'vote_average.desc' }))}>
          Top rated
        </button>
        <button onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'vote_count.desc' }))}>
          Most rated
        </button>
        <button
          onClick={() => setFilterList((pre) => ({ ...pre, sort_by: 'first_air_date.desc' }))}
        >
          Latest
        </button>
        <GenreListFilter role={role} />
        {/* <button onClick={()=>setFilterList(pre=>({...pre, status: }))}>Adult</button> */}
        {/* <button onClick={()=>setFilterList(pre=>({...pre, type: }))}>Adult</button> */}
      </div>
    );
  }
};

export default FilterSection;
