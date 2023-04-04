import ButtonComponent from '@/components/ButtonComponent';
import LazyLoadImageComponent from '@/components/ui/LazyLoadImageComponent';
import { MovieType, TVType } from '@/types/types';
import React, { Dispatch } from 'react';

interface SwiperContainerProps {
  heroIndex: TVType | MovieType | null;
  setHeroIndex: Dispatch<TVType | MovieType | null>;
  data: any;
  mediaType: any;
  sliderName: string;
}
const SwiperContainer: React.FC<SwiperContainerProps> = (props) => {
  const { data, heroIndex, mediaType, setHeroIndex, sliderName } = props;

  const handleClick = () => {
    const slider = document.querySelector(`.${sliderName}`) as HTMLElement;
    const sliderIndex = Number(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const itemNum = Number(getComputedStyle(slider).getPropertyValue('--items-per-screen'));
    return { slider, sliderIndex, itemNum };
  };

  return (
    <div className='w-full absolute z-10 bottom-0 right-0 left-0 overflow-x-hidden overflow-y-visible h-[30vh]'>
      <ButtonComponent
        className='w-20 h-64 bottom-0 left-0 z-10 cursor-pointer bg-opacity-50 bg-gray-300 absolute text-[5rem] rounded-xl flex justify-center items-center'
        onClick={() => {
          const { slider, sliderIndex } = handleClick();
          if (sliderIndex > 0) {
            slider?.style.setProperty('--slider-index', (sliderIndex - 1).toString());
          }
        }}
      >
        <p className='mb-2'>&#8249;</p>
      </ButtonComponent>
      <div className={`w-full absolute bottom-0 flex slider ${sliderName} ml-20 -translate-x-[(calc(var(--slider-index)*(100%/var(--items-per-screen)*(var(--items-per-screen)-1))))] h-[20vh] transition-transform duration-500 gap-2`}>
        {/* grid grid-flow-col auto-cols-max */}
        {data?.results?.map((item: MovieType | TVType, index: number) => {
          return (
            <ButtonComponent
              onClick={() => setHeroIndex(item)}
              key={index}
              className={`max-w-[calc(100%/var(--items-per-screen))] flex justify-center items-center flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
              transition-all
              ease-in-out
              aspect-[9/16]
                duration-500
                ${
                  heroIndex?.id === item.id
                    ? 'opacity-100 shadow-[2rem] h-[30vh] -mt-[10vh]'
                    : 'shadow-2xl                opacity-90 h-[20vh]'
                }
                `}
            >
              <LazyLoadImageComponent
                className='object-cover
                  rounded-md 
                  h-full
                  aspect-[10/14]'
                path={item.poster_path}
                size={heroIndex?.id === item.id ? 'original' : 'w154'}
              />
              <div className='w-4/5 truncate'>
                {mediaType === 'movie' ? (item as MovieType).title : (item as TVType).name}
              </div>
            </ButtonComponent>
          );
        })}
      </div>
      <ButtonComponent
        className='w-20 h-64 absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-10 bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl '
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
  );
};

export default SwiperContainer;
