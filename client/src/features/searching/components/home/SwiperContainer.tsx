import ButtonComponent from '@/components/generic/ButtonComponent';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import ButtonMediaCard from '@/components/specific/ButtonMediaCard';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import { FilteredMovieListType, FilteredTVListType } from '../../types';
import { Link } from 'react-router-dom';
import { undefined } from 'zod';
import { iconHelper } from '@/config/icons';

interface SwiperContainerProps {
  sectionName?: 'trending' | 'comingSoon' | 'airing' | 'popular' | 'top_rated' | 'history';
  data: FilteredMovieListType | FilteredTVListType | Record<string, any>;
  mediaType: any;
  sliderName: string;
  styles?: Record<string, string>;
}
const SwiperContainer: React.FC<SwiperContainerProps> = (props) => {
  const { data, mediaType, sectionName, sliderName, styles } = props;

  const [slideIndex, setSlideIndex] = React.useState(0);
  const sectionBackdropItems = useSectionBackdropItemsStore();

  const sectionBackdropItem = sectionName
    ? sectionBackdropItems.getSectionBackdropItem(sectionName)
    : null;

  const handleClick = () => {
    const slider = document.querySelector(`.${sliderName}`) as HTMLElement;
    const sliderIndex = Number(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const itemNum = Number(getComputedStyle(slider).getPropertyValue('--items-per-screen'));
    return { slider, sliderIndex, itemNum };
  };

  const { isXs, is4k, isXl } = useMediaQueries();
  return isXs ? (
    <div
      className={`z-20 w-full xs:h-[20rem] lg:h-[21rem] overflow-x-clip ${
        styles?.swiper ?? 'absolute bottom-0 left-0 right-0'
      }`}
    >
      <div className='absolute bottom-0 left-0 right-0 w-full h-full'>
        <ButtonComponent
          className='w-20 h-full bottom-0 left-0 cursor-pointer z-30 opacity-50 absolute text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 flex justify-center items-center hover:opacity-70 dark:from-stone-900 dark:to-stone-800 dark:text-yellow-200'
          onClick={() => {
            const { slider, sliderIndex } = handleClick();
            if (sliderIndex > 0) {
              slider?.style.setProperty('--slider-index', (sliderIndex - 1).toString());
            }
          }}
        >
          {iconHelper.before()}
        </ButtonComponent>
        <div
          className={`w-full gap-x-custom-x-max-normal absolute bottom-0 flex slider ml-20 -translate-x-[(calc(var(--slider-index)*(100%/var(--items-per-screen)*(var(--items-per-screen)-1))))] h-full transition-transform duration-500 ${sliderName}`}
        >
          {data?.results?.map((media: MovieType | TVType, index: number) => {
            return (
              <React.Fragment key={index}>
                {sectionName === 'popular' ||
                sectionName === 'top_rated' ||
                sectionName === 'history' ? (
                  <LinkMediaCard
                    role={
                      mediaType === 'multiple'
                        ? 'linkMultipleCard'
                        : mediaType === 'movie'
                        ? 'linkMovieCard'
                        : 'linkTVCard'
                    }
                    media={media}
                    styles={{
                      link: `max-w-[calc(100%/var(--items-per-screen))] flex justify-center items-center flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] 
                      transition-all
                      ease-in-out
                      duration-100 h-full shadow-lg shadow-stone-900 dark:shadow-yellow-900  overflow-hidden bg-gradient-to-t from-stone-300 to-stone-200 dark:from-yellow-500 dark:to-yellow-500 dark:text-stone-900 dark:font-black rounded-lg dark:hover:shadow-2xl dark:hover:shadow-yellow-500 hover:shadow-xl hover:shadow-stone-900`,
                      image:
                        'overflow-hidden bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow ',
                      size: media.poster_path
                        ? is4k
                          ? 'original'
                          : isXl
                          ? 'w500'
                          : 'w400'
                        : undefined,
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
                      button: `max-w-[calc(100%/var(--items-per-screen))] flex flex-col flex-[0_0_calc(100%_/_var(--items-per-screen))] transition-all
                      ease-in-out
                      duration-500
                      h-full rounded-xl overflow-hidden bg-gradient-to-tr dark:shadow-yellow-900
                      shadow-lg from-stone-700 to-stone-500 dark:from-yellow-500 dark:to-yellow-500 dark:text-stone-900 dark:font-black 
                      flex flex-col items-center dark:hover:shadow-xl dark:hover:shadow-yellow-500 hover:shadow-xl hover:shadow-stone-900
                        
                      ${
                        sectionName
                          ? sectionBackdropItems.getSectionBackdropItem(sectionName)?.id ===
                            media.id
                            ? ' dark:shadow-yellow-300 ring-2 dark:ring-yellow-500 -mt-16 relative   shadow-2xl '
                            : ''
                          : ''
                      }
                      `,
                      image:
                        'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                      size: media.poster_path
                        ? is4k
                          ? 'original'
                          : isXl
                          ? 'w500'
                          : 'w400'
                        : undefined,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <ButtonComponent
          className='w-20 z-30 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer opacity-50 text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 hover:opacity-70 dark:from-stone-900 dark:to-stone-800 dark:text-yellow-200'
          onClick={() => {
            const { slider, sliderIndex, itemNum } = handleClick();
            if (sliderIndex < (data?.results?.length ?? 0) / itemNum) {
              slider?.style.setProperty('--slider-index', (sliderIndex + 1).toString());
            }
          }}
        >
          {iconHelper.next()}
        </ButtonComponent>
      </div>
    </div>
  ) : (
    <div className={`relative z-20 w-full h-[24rem] overflow-hidden ${styles?.swiper}`}>
      {sectionName === 'trending' || sectionName === 'comingSoon' || sectionName === 'airing' ? (
        <Link
          to={`/${mediaType}/${sectionBackdropItem?.id}`}
          className='w-full grid place-items-end text-xl absolute top-0 z-30 '
        >
          <div className='rounded-xl flex items-center mr-20 justify-center px-4 py-2 bg-stone-700 font-poppins text-stone-50 font-black text-sm gap-2 shadow-lg ring-2 ring-stone-200 dark:ring-stone-900 dark:bg-yellow-500 dark:text-stone-900'>
            {iconHelper.play('text-xl font-bold')}
            Watch
          </div>
        </Link>
      ) : null}

      <ButtonComponent
        className='w-16 absolute h-full z-30 cursor-pointer opacity-50 hover:opacity-70 text-[5rem] rounded-lg bg-gradient-to-l from-stone-100 to-stone-200 flex justify-center items-center dark:from-stone-900 dark:to-stone-800 dark:text-yellow-200'
        onClick={() => {
          if (slideIndex > 0) {
            setSlideIndex((prev) => prev - 1);
          }
        }}
      >
        {iconHelper.before()}
      </ButtonComponent>
      <div
        className={`w-full h-full absolute inset-0 flex slider transition-transform duration-500 gap-2 ${sliderName}`}
      >
        {data?.results ? (
          <LinkMediaCard
            role={
              mediaType === 'multiple'
                ? 'linkMultipleCard'
                : mediaType === 'movie'
                ? 'linkMovieCard'
                : 'linkTVCard'
            }
            media={data?.results[slideIndex]}
            styles={{
              link: `w-full flex justify-center items-center flex-col`,
              image:
                ' rounded-xl shadow-xl  overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
              height: '320px',
              width: '320px',
              detail:
                'relative flex -mt-4 z-20 flex-col bg-stone-100 w-[300px] rounded-xl shadow-xl px-8 py-2 dark:bg-yellow-500',
              size: data?.results[slideIndex].poster_path ? 'original' : undefined,
            }}
          />
        ) : null}
      </div>
      <ButtonComponent
        className='w-16 h-full absolute bottom-0 right-0 flex justify-center items-center cursor-pointer z-30 opacity-50 hover:opacity-70 rounded-lg bg-gradient-to-r from-stone-100 to-stone-200 text-[5rem] dark:from-stone-900 dark:to-stone-800 dark:text-yellow-200'
        disabled={data?.results?.length === 1}
        onClick={() => {
          const { itemNum } = handleClick();
          if (slideIndex < (data?.results?.length ?? 0) / itemNum) {
            setSlideIndex((prev) => prev + 1);
          }
        }}
      >
        {iconHelper.next()}
      </ButtonComponent>
    </div>
  );
};

export default SwiperContainer;
