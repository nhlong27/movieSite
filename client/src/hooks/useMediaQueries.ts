import { useMediaQuery } from 'react-responsive';

const useMediaQueries = () => {
  const isLg = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const isXxs = useMediaQuery({ query: '(min-width: 300px)' });
  const isXs = useMediaQuery({ query: '(min-width: 500px)' });
  const isSm = useMediaQuery({ query: '(min-width: 640px)' });
  const isXl = useMediaQuery({ query: '(min-width: 1280px)' });
  const is2xl = useMediaQuery({ query: '(min-width: 1536px)' });
  const isMd = useMediaQuery({
    query: '(min-width: 768px)',
  });
  const is4k = useMediaQuery({
    query: '(min-width: 2560px)',
  });
  return { isMd, isXxs, isLg, isSm, isXl, is2xl, isXs, is4k };
};

export { useMediaQueries };
