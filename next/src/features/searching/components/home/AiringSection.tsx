import { mediaTypeAtom } from '@/components/Layout'
import Wrapper from '@/components/handling/Wrapper'
import { useAtom } from 'jotai'
import React from 'react'
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery'
import { mediaTypeConfig } from '../../queries'
import SwiperContainer from './SwiperContainer'
import SectionBackdrop from './SectionBackdrop'
import { useSectionBackdropItemsStore } from '../../stores'

import Link from 'next/link'
import HomeSectionSkeleton from '../skeletons/HomeSectionSkeleton'
import { iconHelper } from '@/config/icons'
import { Media } from '@/utils/media'

const AiringSection = () => {
  const [mediaType] = useAtom(mediaTypeAtom)
  const { data } = useFilteredItemListQuery(
    mediaTypeConfig[`${mediaType}`].home.paramList.airing
  )
  const sectionBackdropItemStore = useSectionBackdropItemsStore()
  const sectionBackdropItem =
    sectionBackdropItemStore.getSectionBackdropItem('airing')

  React.useEffect(() => {
    if (data?.pages[0].results) {
      sectionBackdropItemStore.setSectionBackdropItem(
        'airing',
        data.pages[0].results.sort((a, b) => 0.5 - Math.random())[0]
      )
    }
  }, [data])

  return (
    <div className="relative max-h-[50rem] xl:aspect-[15/5] lg:h-auto xs:h-[33rem] w-full flex justify-center items-center z-0 bg-stone-200 dark:bg-stone-900 py-4 rounded-lg shadow-lgstone-900">
      <div className="w-11/12 flex flex-col z-10">
        <div className="max-h-[50rem] xl:aspect-[22/14] lg:aspect-[12/9] z-20 w-full lg:h-auto xs:h-[33rem] font-poppins text-xl font-black tracking-[0.3rem] text-stone-500 dark:text-yellow-400 uppercase">
          <div className="py-2 border-b-2 border-stone-300 mb-4 dark:border-yellow-600">
            Now Airing
          </div>
          <div className="w-full py-2 flex gap-4 text-lg">
            <Media greaterThan="xs">
              <Link
                href={`/${mediaType}/${sectionBackdropItem?.id}`}
                className="text-stone-900   dark:text-yellow-900 flex ml-auto justify-center items-center gap-2 px-2 h-[2.4rem] py-[3px]  
                bg-gradient-to-r from-yellow-500 hover:from-yellow-600 hover:bg-gradient-to-r transition-full duration-200 hover:to-yellow-200 to-yellow-100  
                  cursor-pointer rounded-lg text-base"
              >
                <div
                  className="rounded-full bg-yellow-500  dark:bg-yellow-500 h-[2rem] w-[2rem] grid pl-[3px]
              place-content-center text-stone-600 dark:text-yellow-900 shadow-lg
              dark:bg-opacity-0"
                >
                  {iconHelper.play('text-[2rem]')}
                </div>
                Watch
              </Link>
            </Media>
          </div>
        </div>
        <SwiperContainer
          sliderName={'slider3'}
          data={data!.pages[0]}
          sectionName="airing"
          mediaType={mediaType}
        />
      </div>
      <Media greaterThan="xs">
        <SectionBackdrop section="airing" mediaType={mediaType} />
      </Media>
    </div>
  )
}

// eslint-disable-next-line react/display-name
export default () => (
  <Wrapper suspenseComponent={<HomeSectionSkeleton />}>
    <AiringSection />
  </Wrapper>
)
