import React from 'react';
import { useAtom } from 'jotai';
import { mediaTypeAtom } from '@/App';

const ToggleMediaType = () => {
  const [_, setMediaType] = useAtom(mediaTypeAtom);
  return (
    <div className='flex gap-4'>
      <button onClick={() => setMediaType('movie')}>Movie</button>
      <button onClick={() => setMediaType('tv')}>TV</button>
    </div>
  );
};

export default ToggleMediaType;
