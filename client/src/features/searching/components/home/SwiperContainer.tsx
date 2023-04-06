import ButtonComponent from '@/components/generic/ButtonComponent';
import SimpleShowCard from '@/components/specific/SimpleShowCard';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useSectionBackdropItems } from '../../stores';
import { useMediaQueries } from '@/hooks/useMediaQueries';

interface SwiperContainerProps {
  section?: string;
  data: any;
  mediaType: any;
  sliderName: string;
  className?: string;
  role?: string;
}
const SwiperContainer: React.FC<SwiperContainerProps> = (props) => {
  const { data, mediaType, section, sliderName, className, role } = props;

  const [slideIndex, setSlideIndex] = React.useState(0);
  const sectionBackdropItems = useSectionBackdropItems();

  const handleClick = () => {
    const slider = document.querySelector(`.${sliderName}`) as HTMLElement;
    const sliderIndex = Number(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const itemNum = Number(getComputedStyle(slider).getPropertyValue('--items-per-screen'));
    return { slider, sliderIndex, itemNum };
  };

  const { isXs, is4k, isXl } = useMediaQueries();
  return !isXs ? (
    <div className={`${className} relative z-10 w-full h-80 overflow-hidden`}>
      <ButtonComponent
        className='w-16 absolute h-full z-10 cursor-pointer bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl flex justify-center items-center'
        onClick={() => {
          if (slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
          }
        }}
      >
        <p className='mb-2'>&#8249;</p>
      </ButtonComponent>
      <div
        className={`w-full h-full z-0 absolute inset-0 flex slider ${sliderName} transition-transform duration-500 gap-2`}
      >
        <SimpleShowCard
          item={data?.results[slideIndex]}
          options={{
            wrapperComponent: {
              className: `w-full flex justify-center items-center flex-col shadow-2xl`,
            },
            lazyImageComponent: {
              size: 'w200',
            },
            overviewComponent: {
              className: 'flex justify-between w-full',
            },
          }}
          mediaType={mediaType}
        />
      </div>
      <ButtonComponent
        className='w-16 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-10 bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl '
        onClick={() => {
          const { itemNum } = handleClick();
          if (slideIndex < data.results.length / itemNum) {
            setSlideIndex((prev) => prev + 1);
          }
        }}
      >
        <p className='mb-2'>&#8250;</p>
      </ButtonComponent>
    </div>
  ) : (
    <div
      className={`${className?? 'absolute bottom-0 left-0 right-0'}  z-10 w-full overflow-x-hidden overflow-y-visible md:h-[20rem] xl:h-[28rem] 4k:h-[32rem]`}
    >
      <div className='absolute bottom-0 left-0 right-0 z-10 w-full md:h-5/6 4k:h-[90%]'>
        <ButtonComponent
          className='w-20 h-full bottom-0 left-0 z-10 cursor-pointer bg-opacity-50 bg-gray-300 absolute text-[5rem] rounded-xl flex justify-center items-center'
          onClick={() => {
            const { slider, sliderIndex } = handleClick();
            if (sliderIndex > 0) {
              slider?.style.setProperty('--slider-index', (sliderIndex - 1).toString());
            }
          }}
        >
          <p className='mb-2'>&#8249;</p>
        </ButtonComponent>
        <div
          className={`w-full gap-6 absolute bottom-0 flex slider ${sliderName} ml-20 -translate-x-[(calc(var(--slider-index)*(100%/var(--items-per-screen)*(var(--items-per-screen)-1))))] h-full transition-transform duration-500`}
        >
          {data?.results?.map((item: MovieType | TVType, index: number) => {
            return (
              <SimpleShowCard
                role={role ?? 'button'}
                key={index}
                handleClick={() => {
                  section && sectionBackdropItems.setSectionBackdropItem(section, item);
                }}
                item={item}
                options={{
                  wrapperComponent: {
                    className: `max-w-[calc(100%/var(--items-per-screen))] flex justify-center items-center flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
                    transition-all
                    ease-in-out
                    
                    duration-500
                  ${
                    sectionBackdropItems.getSectionBackdropItem(section ?? '')?.id === item.id
                      ? 'opacity-100 shadow-[2rem] -mt-[2rem] 4k:-mt-[2rem] mx-2'
                      : 'shadow-lg                opacity-90 h-full'
                  }
                    `,
                  },
                  lazyImageComponent: {
                    size: is4k ? 'w300' : isXl ? 'w200' : 'w154',
                    className: '4k:aspect-[8/12] aspect-[9/16]',
                  },
                  overviewComponent: {
                    className: 'flex flex-col justify-end w-full',
                  },
                }}
                mediaType={mediaType}
              />
            );
          })}
        </div>
        <ButtonComponent
          className='w-20 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-10 bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl '
          onClick={() => {
            const { slider, sliderIndex, itemNum } = handleClick();
            if (sliderIndex < data.results.length / itemNum) {
              slider?.style.setProperty('--slider-index', (sliderIndex + 1).toString());
            }
          }}
        >
          <p className='mb-2'>&#8250;</p>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default SwiperContainer;
