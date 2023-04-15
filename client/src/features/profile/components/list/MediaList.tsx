import React from 'react';
import { MultipleShowsQueryResponseType } from '../../types';
import ProfileMediaCard from './ProfileMediaCard';

const MediaList = ({
  mediaList,
  status,
}: {
  mediaList: MultipleShowsQueryResponseType;
  status: string;
}) => {
  return status === 'isFavorited' ? (
    <>
      {mediaList
        ?.filter((media) => media.isFavorited)
        .map((media, index) => {
          return <ProfileMediaCard key={index} media={media} />;
        })}
    </>
  ) : status === 'All' ? (
    <>
      {mediaList?.map((media, index) => {
        return <ProfileMediaCard key={index} media={media} />;
      })}
    </>
  ) : (
    <>
      {mediaList
        ?.filter((media) => media.status === status)
        .map((media, index) => {
          return <ProfileMediaCard key={index} media={media} />;
        })}
    </>
  );
};

export default MediaList;
