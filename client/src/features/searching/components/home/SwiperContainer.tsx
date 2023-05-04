import ButtonComponent from '@/components/generic/ButtonComponent';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import ButtonMediaCard from '@/components/specific/ButtonMediaCard';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import { FilteredMovieListType, FilteredTVListType } from '../../types';

interface SwiperContainerProps {
  sectionName?: 'trending' | 'comingSoon' | 'airing' | 'popular' | 'top_rated';
  data: FilteredMovieListType | FilteredTVListType | Record<string, any>;
  mediaType: any;
  sliderName: string;
  styles?: Record<string, string>;
}
const SwiperContainer: React.FC<SwiperContainerProps> = (props) => {
  const { data, mediaType, sectionName, sliderName, styles } = props;

  const [slideIndex, setSlideIndex] = React.useState(0);
  const sectionBackdropItems = useSectionBackdropItemsStore();

  const handleClick = () => {
    const slider = document.querySelector(`.${sliderName}`) as HTMLElement;
    const sliderIndex = Number(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const itemNum = Number(getComputedStyle(slider).getPropertyValue('--items-per-screen'));
    return { slider, sliderIndex, itemNum };
  };

  const { isXs, is4k, isXl } = useMediaQueries();
  return isXs ? (
    <div
      className={`z-20 w-full xs:h-[20rem] lg:h-[24rem]  ${
        styles?.swiper ?? 'absolute bottom-0 left-0 right-0'
      }`}
    >
      <div className='absolute bottom-0 left-0 right-0 w-full h-full'>
        <ButtonComponent
          className='w-20 h-full bottom-0 left-0 cursor-pointer z-30 bg-opacity-50 bg-gray-300 absolute text-[5rem] rounded-xl flex justify-center items-center'
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
          className={`w-full gap-x-custom-x-max-normal absolute bottom-0 flex slider ml-20 -translate-x-[(calc(var(--slider-index)*(100%/var(--items-per-screen)*(var(--items-per-screen)-1))))] h-full transition-transform duration-500 ${sliderName}`}
        >
          {data?.results?.map((media: MovieType | TVType, index: number) => {
            return (
              <React.Fragment key={index}>
                {sectionName === 'popular' || sectionName === 'top_rated' ? (
                  <LinkMediaCard
                    role={(media.media_type?? mediaType) === 'movie' ? 'linkMovieCard' : 'linkTVCard'}
                    media={media}
                    styles={{
                      link: `max-w-[calc(100%/var(--items-per-screen))] flex justify-center items-center flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
                      transition-all
                      ease-in-out
                      duration-500 h-full`,
                      image: 'overflow-hidden',
                      size: is4k ? 'original' : isXl ? 'w500' : 'w400',
                      detail: 'flex flex-col justify-end w-full',
                    }}
                  />
                ) : (
                  <ButtonMediaCard
                    role={mediaType === 'movie' ? 'buttonMovieCard' : 'buttonTVCard'}
                    handleButtonClick={() => {
                      sectionName &&
                        sectionBackdropItems.setSectionBackdropItem(sectionName, media);
                    }}
                    media={media}
                    styles={{
                      button: `max-w-[calc(100%/var(--items-per-screen))] flex flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
                      transition-all
                      ease-in-out
                      duration-500
                      h-full
                      ${
                        sectionName
                        ? sectionBackdropItems.getSectionBackdropItem(sectionName)?.id === media.id
                        ? 'shadow-[2rem] -mt-[4rem] 4k:-mt-[6rem] mx-2'
                        : 'shadow-lg'
                        : ''
                        }
                      `,
                      image: 'overflow-hidden',
                      size: is4k ? 'original' : isXl ? 'w500' : 'w400',
                      detail: 'flex flex-col justify-end w-full mt-auto',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <ButtonComponent
          className='w-20 z-30 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer  bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl '
          onClick={() => {
            const { slider, sliderIndex, itemNum } = handleClick();
            if (sliderIndex < (data?.results?.length ?? 0) / itemNum) {
              slider?.style.setProperty('--slider-index', (sliderIndex + 1).toString());
            }
          }}
        >
          <p className='mb-2'>&#8250;</p>
        </ButtonComponent>
      </div>
    </div>
  ) : (
    <div className={`relative z-20 w-full h-[24rem] overflow-hidden ${styles?.swiper}`}>
      <ButtonComponent
        className='w-16 absolute h-full z-30  cursor-pointer bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl flex justify-center items-center'
        onClick={() => {
          if (slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
          }
        }}
      >
        <p className='mb-2'>&#8249;</p>
      </ButtonComponent>
      <div
        className={`w-full h-full absolute inset-0 flex slider transition-transform duration-500 gap-2 ${sliderName}`}
      >
        {data?.results ? (
          <LinkMediaCard
            role={mediaType === 'movie' ? 'linkMovieCard' : 'linkTVCard'}
            media={data?.results[slideIndex]}
            styles={{
              link: `w-full flex justify-center items-center flex-col shadow-2xl`,
              image: 'overflow-hidden',
              height: '320px',
              width: '320px',
              detail: 'flex flex-col w-[200px]',
              size: 'original'
            }}
          />
        ) : null}
      </div>
      <ButtonComponent
        className='w-16 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-30 bg-opacity-50 bg-gray-300 text-[5rem] rounded-xl '
        onClick={() => {
          const { itemNum } = handleClick();
          if (slideIndex < (data?.results?.length ?? 0) / itemNum) {
            setSlideIndex((prev) => prev + 1);
          }
        }}
      >
        <p className='mb-2'>&#8250;</p>
      </ButtonComponent>
    </div>
  );
};

export default SwiperContainer;
