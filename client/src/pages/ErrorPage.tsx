import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const { isMd } = useMediaQueries();
  return (
    <>
      {isMd ? (
        <div className='bg-black min-h-screen flex flex-col justify-center items-center w-full'>
          <div>
            <p className='text-[150px] text-white font-semibold leading-none grid place-items-center'>404</p>
            <p className='mt-6 text-white text-2xl text-center'>
              Error loading the resources you need
            </p>
            <div className='flex justify-center'>
              <Link
                to='/'
                className='px-8 py-2 bg-primary rounded-md text-white text-xl mt-8 inline-block hover:bg-blue-600 transition duration-300'
              >
                Go to Homepage, or
              </Link>
              <ButtonComponent
                className='px-8 py-2 bg-primary rounded-md text-white text-xl mt-8 inline-block hover:bg-blue-600 transition duration-300'
                onClick={() => {
                  console.log('reloading the page..');
                  window.location.reload();
                }}
              >
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
