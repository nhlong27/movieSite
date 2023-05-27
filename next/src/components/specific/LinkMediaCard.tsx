import React from 'react'
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent'
import Link from 'next/link'
import { MovieType, TVType } from '@/types/types'
import { SimilarMovieType, SimilarTVType } from '@/features/watching/types'
import { imageHelper } from '@/config/images'

interface LinkMediaCardProps {
  media: MovieType | TVType | SimilarTVType | SimilarMovieType
  styles?: Record<string, any>
  role?: 'linkMovieCard' | 'linkTVCard' | 'linkMultipleCard'
}

const LinkMediaCard: React.FC<LinkMediaCardProps> = (props) => {
  const { media, styles, role } = props

  return role === 'linkMovieCard' ? (
    <Link
      href={`/movie/${media.id}`}
      className={
        styles?.link ??
        'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size,
          image:
            styles?.image ??
            'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black ',
        }}
        path={media.poster_path ?? imageHelper.poster}
      />
      <div
        className={
          styles?.detail ??
          'flex flex-col pb-2 absolute  inset-0 bg-gradient-to-t from-stone-900 to-transparent px-4 font-poppins'
        }
      >
        <h1 className="truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-white mb-2">
          {(media as MovieType | SimilarMovieType).title}
        </h1>
        <div className="flex justify-between font-poppins  text-sm">
          <p className="tracking-[0.3rem] text-stone-300">
            {(media as MovieType | SimilarMovieType).release_date
              ? parseInt(
                  (media as MovieType | SimilarMovieType).release_date ?? '404'
                )
              : 'Movie'}
          </p>
          <div className="px-2 bg-amber-100 rounded-lg shadow-md text-base grid place-items-center text-yellow-600 font-semibold tracking-[0.1rem] dark:text-yellow-500 dark:bg-stone-900">
            {media?.vote_average?.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  ) : role === 'linkTVCard' ? (
    <Link
      href={`/tv/${media.id}`}
      className={
        styles?.link ??
        'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size,
          image:
            styles?.image ??
            'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black',
        }}
        path={media.poster_path ?? imageHelper.poster}
      />
      <div
        className={
          styles?.detail ??
          'flex flex-col pb-2 absolute  inset-0 bg-gradient-to-t from-stone-900 to-transparent px-4 font-poppins'
        }
      >
        <h1 className="truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-white mb-2">
          {(media as TVType | SimilarTVType).name}
        </h1>
        <div className="flex justify-between font-poppins  text-sm">
          <p className="tracking-[0.3rem] text-stone-300">
            {(media as TVType | SimilarTVType).first_air_date
              ? parseInt(
                  (media as TVType | SimilarTVType).first_air_date ?? '404'
                )
              : 'TV'}
          </p>
          <p className="px-2 bg-amber-100 rounded-lg shadow-md text-base grid place-items-center text-yellow-600 font-semibold tracking-[0.1rem] dark:text-yellow-500 dark:bg-stone-900">
            {media.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      href={
        (media as any).media_type === 'movie'
          ? `/movie/${media.id}`
          : `/tv/${media.id}`
      }
      className={
        'relative w-full xs:flex-[0_0_calc(100%_/_var(--items-per-screen))] xs:max-w-[calc(100%/var(--items-per-screen))] transition-all ease-in-out      duration-300 h-full rounded-xl overflow-hidden bg-gradient-to-t dark:from-stone-900 dark:to-yellow-500 flex flex-col items-center justify-center '
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: '500px',
          size: 'w500',
          image:
            styles?.image ??
            'overflow-hidden bg-gradient-to-tr from-white to-black dark:from-yellow-500 object-cover',
        }}
        path={media.backdrop_path ?? imageHelper.backdrop}
      />
      <div
        className={
          styles?.detail ??
          'flex flex-col pb-2 absolute  inset-0 bg-gradient-to-t from-stone-900 to-transparent px-4 font-poppins'
        }
      >
        {(media as any).media_type === 'movie' ? (
          <h1 className="truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-yellow-400 mb-2">
            {(media as any).title}
          </h1>
        ) : (
          <h1 className="truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-yellow-400 mb-2">
            {(media as any).name}
          </h1>
        )}
        <div className="flex justify-between text-lime-200 text-sm">
          <p>
            Last watched{' '}
            <span className="">
              {new Date(Date.parse((media as any).updatedAt)).toLocaleString(
                'sv'
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="absolute top-0 h-full w-full  grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-lg font-poppins font-black uppercase tracking-wider opacity-0 transition-full duration-200 hover:opacity-100 text-stone-300 ">
        Continue
      </div>
    </Link>
  )
}

export default LinkMediaCard
