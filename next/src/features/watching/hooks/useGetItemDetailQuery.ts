import { itemLoader } from '@/pages/_app'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getItemDetailQuery } from '../queries'
import { MovieDetailType, TVDetailType } from '../types'
import React from 'react'

export const useGetItemDetailQuery =  () => {
  const [initialData, setInitialData] = React.useState<
    MovieDetailType | TVDetailType | null
  >(null)
  const params = useRouter().query;
  const queryClient = useQueryClient();
  React.useEffect(() => {
    itemLoader({params, queryClient}).then(response=>setInitialData(response as  MovieDetailType | TVDetailType ))
  }, [])

  const { data }: { data: MovieDetailType | TVDetailType } =  useQuery({
    ...getItemDetailQuery((params as any).mediaType, params.id as string),
    initialData: initialData,
  })

  return { data, params }
}
