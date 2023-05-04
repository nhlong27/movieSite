import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useDebounce } from 'use-debounce';
import { queryAtom } from '../atoms';
import { getItemListQuery } from '../queries';
import { ItemListType } from '../types';

export const useItemListQuery = (select: (data: ItemListType)=> ItemListType['results']) => {
  const [query] = useAtom(queryAtom);
    const debouncedQuery = useDebounce(query, 1000);
    const { data } = useQuery({...getItemListQuery(debouncedQuery[0] ?? ''), select: select});
    return { data };
};
