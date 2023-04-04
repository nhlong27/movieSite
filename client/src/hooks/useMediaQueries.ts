import { useMediaQuery } from 'react-responsive';

const useMediaQueries = () => {
  const isLg = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const isSm = useMediaQuery({ query: '(min-width: 640px)' });
  const isXl = useMediaQuery({ query: '(min-width: 1280px)' });
  const is2xl = useMediaQuery({ query: '(min-width: 1536px)' });
  const isMd = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return { isMd, isLg, isSm, isXl, is2xl };
};

export { useMediaQueries };
