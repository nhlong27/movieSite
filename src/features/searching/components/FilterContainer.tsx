import React from 'react'
import MovieFilterResult from './MovieFilterResult'
import FilterSection from './FilterSection'
import TVFilterResult from './TVFilterResult'

const FilterContainer = () => {
  const [itemType, setItemType] = React.useState<'movie'|'tv'>('movie')
  return (
    <div>
      <button onClick={()=>setItemType('movie')}>Movie</button>
      <button onClick={()=>setItemType('tv')}>TV</button>
      <FilterSection role={itemType} />
      {itemType==='movie' ? <MovieFilterResult /> : <TVFilterResult />}
    </div>
  )
}

export default FilterContainer