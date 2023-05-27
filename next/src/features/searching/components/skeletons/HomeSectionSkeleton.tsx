import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import { Media } from '@/utils/media'

const HomeSectionSkeleton = (props: Record<string, any>) => {
  return (
    <div className="relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0">
      <div className="absolute top-0 h-full w-11/12 z-10">
        <Skeleton className="h-full w-full" />
      </div>
      <Media greaterThan="xs">
        <div
          className={`z-20 w-full xs:h-[20rem] lg:h-[24rem] absolute bottom-0 left-0 right-0
      `}
        >
          <div className="absolute bottom-0 left-0 right-0 w-full h-full">
            <div className="w-20 h-full bottom-0 left-0 cursor-pointer z-30 bg-opacity-50 bg-gray-300 absolute  rounded-xl">
              <Skeleton className="h-full w-full" />
            </div>
            <div
              className={`w-full justify-between absolute bottom-0 flex slider ml-20 h-full`}
            >
              {Array(6)
                .fill(0)
                .map((item, index: number) => {
                  return (
                    <div
                      className="max-w-[calc(100%/var(--items-per-screen))]
                          w-[10rem] 
                          h-full
                          shadow-lg
                        "
                      key={index}
                    >
                      <Skeleton className="h-full w-full" />
                    </div>
                  )
                })}
            </div>
            <div className="w-20 z-30 h-full absolute bottom-0 right-0 cursor-pointer  bg-opacity-50 bg-gray-300 rounded-xl ">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      </Media>
      <Media at="xs">
        <div className={`relative z-20 w-full h-[24rem] overflow-hidden`}>
          <div className="w-16 absolute h-full z-30 cursor-pointer bg-opacity-50 bg-gray-300 rounded-xl">
            <Skeleton className="h-full w-full" />
          </div>
          <div className={`w-full h-full absolute inset-0 slider`}>
            <Skeleton className="h-full w-full" />
          </div>
          <div className="w-16 h-full absolute bottom-0 right-0 cursor-pointer z-30 bg-opacity-50 bg-gray-300 rounded-xl ">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </Media>
    </div>
  )
}

export default HomeSectionSkeleton
