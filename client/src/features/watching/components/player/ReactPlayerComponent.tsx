import React from 'react';
import { VideoType } from '../../types';
import ReactPlayer from 'react-player';
import urls from '@/config/urls';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';

interface ReactPlayerComponentProps {
  episodeNumber?: string;
  seasonNumber?: string;
  trailerSource?: VideoType;
  trailerType?: string;
  className?: string;
  serverSource?: string;
}

const serverSources = ({
  mediaId,
  mediaType,
  seasonNumber,
  episodeNumber,
}: {
  mediaId: string;
  mediaType: string;
  seasonNumber?: string;
  episodeNumber?: string;
}) => ({
  '2embed.to': `${urls.embed}/${mediaType}?id=${mediaId}&s=${seasonNumber}&e=${episodeNumber}`,
  '2embed.org': `${urls.embed2}/${mediaType}?tmdb=${mediaId}&s=${seasonNumber}&e=${episodeNumber}`,
  'vidsrc.me': `${urls.embed3}/${mediaId}/${seasonNumber}-${episodeNumber}`,
});

const ReactPlayerComponent: React.FC<ReactPlayerComponentProps> = (props) => {
  const { params, data } = useGetItemDetailQuery();
  const { episodeNumber, seasonNumber, serverSource, trailerSource, trailerType = 'video', className } =
    props;
  if (trailerSource)
    return (
      <div className={className}>
        {trailerType === 'video' ? (
          <ReactPlayer
            config={{
              youtube: {
                embedOptions: { color: 'white' },
              },
            }}
            controls={true}
            width={'100%'}
            height={'100%'}
            url={`${urls.yt}${trailerSource.key}`}
          />
        ) : (
          <img className='w-full h-full' src={`${urls.yt_img(trailerSource.key)}`} alt='' />
        )}
      </div>
    );
  if (seasonNumber || episodeNumber)
    return (
      <iframe
        allowFullScreen={true}
        className={className}
        width={500}
        height={500}
        src={
          (
            serverSources({
              mediaId: params.id!,
              mediaType: 'tv',
              seasonNumber: seasonNumber,
              episodeNumber: episodeNumber,
            }) as any
          )[`${serverSource}`]
        }
        title={`TV Media Video Player - server : ${serverSource}`}
        frameBorder='0'
        // allowFullScreen
      />
    );
  return (
    <iframe
      allowFullScreen={true}
      className={className}
      width={500}
      height={500}
      src={
        (
          serverSources({
            mediaId: params.id!,
            mediaType: 'movie',
          }) as any
        )[`${serverSource}`]
      }
      title={`Movie Media Video Player - server : ${serverSource}`}
      frameBorder='0'
      // allowFullScreen
    />
  );
};

export default ReactPlayerComponent;
