import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useDebounce } from 'use-debounce';
import { queryAtom } from '../atoms';
import { getItemListQuery } from '../queries';

export const useItemListQuery = () => {
  const [query] = useAtom(queryAtom);
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useQuery(getItemListQuery(debouncedQuery[0] ?? ''));
  return { data };
};
