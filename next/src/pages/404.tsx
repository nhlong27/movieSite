import ButtonComponent from '@/components/generic/ButtonComponent'
import { iconHelper } from '@/config/icons'
import { Media } from '@/utils/media'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <div className=" min-h-screen grid place-items-center w-full bg-stone-900">
          <div className=" rounded-xl px-8 bg-opacity-70 shadow-xl w-1/2 aspect-square flex flex-col justify-center items-center bg-yellow-500 ">
            <div className="text-[100px] font-semibold leading-none grid place-items-center text-stone-900">
              404
            </div>
            <div className="mt-6 text-xl text-center text-stone-900">
              We encountered some troubles loading the resources you need
            </div>
            <div className="flex justify-center">
              <Link
                href="/"
                className="px-8 py-2 bg-primary rounded-md text-stone-100 text-lg mt-8 inline-block hover:bg-yellow-400 transition
                 duration-300 group hover:text-stone-900"
              >
                Go to{' '}
                <span className="text-stone-200 group-hover:text-stone-700 font-bold">
                  Homepage
                </span>
                , or
              </Link>
              <ButtonComponent
                className="px-4 bg-primary rounded-md text-lg mt-8 hover:bg-yellow-400
                 transition duration-300 flex gap-2 items-center hover:ring-2  hover:ring-stone-800 hover:text-stone-900 bg-stone-900 text-yellow-500 ring-yellow-500"
                onClick={() => {
                  console.log('reloading the page..')
                  window.location.reload()
                }}
              >
                {iconHelper.reload()}
                Reload
              </ButtonComponent>
            </div>
          </div>
        </div>
      </Media>
      <Media lessThan="md">
        <div className="bg-black min-h-screen flex flex-col justify-start items-center w-full ">
          <div className="mt-20 w-full px-8">
            <p className="text-[100px] text-center text-yellow-500 font-semibold leading-none">
              404
            </p>
            <p className="mt-6 text-white text-lg text-center">
              We encountered some troubles loading the resources you need
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="px-8 py-2 bg-primary rounded-md text-stone-100 text-lg mt-8 inline-block hover:bg-yellow-400 transition
                 duration-300 group hover:text-stone-900"
              >
                Go to{' '}
                <span className="text-stone-200 group-hover:text-stone-700 font-bold">
                  Homepage
                </span>
              </Link>
              <ButtonComponent
                className="px-4 bg-primary rounded-md text-lg mt-8 hover:bg-yellow-400
                 transition duration-300 flex gap-2 items-center hover:ring-2  hover:ring-stone-800 hover:text-stone-900 bg-stone-900 text-yellow-500 ring-yellow-500"
                onClick={() => {
                  console.log('reloading the page..')
                  window.location.reload()
                }}
              >
                {iconHelper.reload()}
                Reload
              </ButtonComponent>
            </div>
          </div>
        </div>
      </Media>
    </>
  )
}

export default ErrorPage
