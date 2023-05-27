import React from 'react'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms'
import { currentURLPathAtom, hasQueryFiltersAtom } from '@/components/Layout'
import ButtonComponent from '@/components/generic/ButtonComponent'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { iconHelper } from '@/config/icons'
import { Media } from '@/utils/media'

export const handleQueryInput = (input: string) => {
  if (input !== '') {
    let queryHistorySet = new Set(
      JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([]))
    )
    if (queryHistorySet.has(input)) {
      queryHistorySet.delete(input)
    }
    queryHistorySet.add(input)

    let queryHistory = [...queryHistorySet]

    if (queryHistory.length > 5) {
      queryHistory?.shift()
    }

    localStorage.setItem('queries', JSON.stringify(queryHistory))
  }
}
const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom)
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom)

  const [inputValue, setInputValue] = React.useState('')

  const [currentURLPath] = useAtom(currentURLPathAtom)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [animationParentRef] = useAutoAnimate()
  return (
    <ButtonComponent
      onClick={() => {
        inputRef.current?.focus()
        setHasQueryFilters(false)
        window.scrollTo(0, 0)
      }}
      className="flex w-full justify-end align-baseline md:h-[2.5rem] lg:min-h-[2.6rem] h-[2.4rem] min-w-[2.4rem] lg:min-w-[2.6rem]"
    >
      <Media greaterThanOrEqual="md">
        <div
          className={`${
            currentURLPath === 'discover' && !hasQueryFilters
              ? 'w-3/4'
              : 'min-w-[2.5rem] lg:min-w-[2.6rem]'
          } overflow-hidden h-full rounded-full flex justify-end items-center`}
        >
          <input
            ref={inputRef}
            type="text"
            className={`${
              currentURLPath === 'discover' && !hasQueryFilters
                ? 'w-full pl-4'
                : 'w-0 opacity-0'
            } transition-all h-full duration-300 shadow-inner  bg-stone-300  dark:bg-yellow-400  rounded-l-full`}
            value={inputValue ?? ''}
            onChange={(e) => {
              setInputValue(() => e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleQueryInput(inputValue)
                setQuery(() => inputValue)
              }
            }}
            placeholder={inputValue ?? 'Search a movie or tv show'}
          />
          <div className=" bg-stone-300  dark:bg-yellow-500 h-full w-[2.4rem] lg:w-[2.6rem] grid place-items-center p-2">
            {iconHelper.search('h-6 w-6 text-stone-600')}
          </div>
        </div>
      </Media>
      <Media lessThan="md">
        <div
          ref={animationParentRef}
          className=" overflow-hidden h-full rounded-full min-w-[2.4rem] flex"
        >
          <div className=" bg-stone-300  dark:bg-yellow-500  h-full w-[2.4rem] grid place-items-center p-2">
            {iconHelper.search('h-6 w-6 text-stone-600')}
          </div>
          {currentURLPath === 'discover' && !hasQueryFilters ? (
            <input
              ref={inputRef}
              type="text"
              className={`h-full w-full shadow-inner bg-stone-300  dark:bg-yellow-500  rounded-r-full`}
              value={inputValue ?? ''}
              onChange={(e) => {
                setInputValue(() => e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleQueryInput(inputValue)
                  setQuery(() => inputValue)
                }
              }}
              placeholder={inputValue ?? 'Search a movie or tv show'}
            />
          ) : null}
        </div>
      </Media>
    </ButtonComponent>
  )
}

export default SearchBar
