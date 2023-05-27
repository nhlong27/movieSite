import LoaderSpinnerComponent from '@/components/generic/LoaderSpinnerComponent'
import { Media } from '@/utils/media'
import React from 'react'

const LoadingPage = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <div className="bg-stone-900 min-h-screen flex flex-col justify-center items-center w-full">
          <div>
            <LoaderSpinnerComponent />
          </div>
        </div>
      </Media>
      <Media lessThan="md">
        <div className="bg-stone-900 min-h-screen flex flex-col justify-start items-center w-full ">
          <div className="mt-20">
            <LoaderSpinnerComponent />
          </div>
        </div>
      </Media>
    </>
  )
}

export default LoadingPage
