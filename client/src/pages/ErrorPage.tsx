import ButtonComponent from '@/components/generic/ButtonComponent';
import { iconHelper } from '@/config/icons';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const { isMd } = useMediaQueries();
  return (
    <>
      {isMd ? (
        <div className='bg-stone-700 min-h-screen grid place-items-center w-full'>
          <div className='bg-stone-500 rounded-xl shadow-xl w-1/2 aspect-square flex flex-col justify-center items-center'>
            <div className='text-[150px] text-stone-100 font-semibold leading-none grid place-items-center'>
              404
            </div>
            <div className='mt-6 text-stone-100 text-2xl text-center'>
              We encountered some troubles loading the resources you need
            </div>
            <div className='flex justify-center'>
              <Link
                to='/'
                className='px-8 py-2 bg-primary rounded-md text-stone-100 text-xl mt-8 inline-block hover:bg-yellow-400 transition
                hover:text-stone-700 duration-300 group'
              >
                Go to{' '}
                <span className='text-stone-200 group-hover:text-stone-700 font-bold'>
                  Homepage
                </span>
                , or
              </Link>
              <ButtonComponent
                className='px-8 py-2 bg-primary rounded-md text-stone-100 text-xl mt-8 hover:bg-yellow-400
                hover:text-stone-700 transition duration-300 flex gap-2 items-center ring-2 ring-stone-100'
                onClick={() => {
                  console.log('reloading the page..');
                  window.location.reload();
                }}
              >
                {iconHelper.reload()}
                Reload
              </ButtonComponent>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center w-full '>
          <div className='mt-20'>
            <p className='text-[150px] text-white font-semibold leading-none'>404</p>
            <p className='mt-6 text-white text-2xl text-center'>There is nothing here</p>
            <div className='flex justify-center'>
              <Link
                to='/'
                className='px-8 py-2 bg-primary rounded-md text-white text-xl mt-8 inline-block hover:bg-blue-600 transition duration-300'
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPage;
