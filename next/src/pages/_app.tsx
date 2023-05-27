import '@/styles/globals.css'
import '@/styles/authPage.css'

import type { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries'
import { watch_queries } from '@/features/watching'
import { SkeletonTheme } from 'react-loading-skeleton'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { MediaContextProvider } from '@/utils/media'

const queryClient = new QueryClient()

export const appLoader = async (queryClient: QueryClient) => {
  return await Promise.all(
    [getMovieGenresQuery, getTVGenresQuery].map((query) => {
      return queryClient.ensureQueryData(query())
    })
  )
}

export const itemLoader = async ({
  params,
  queryClient,
}: {
  params: any
  queryClient: QueryClient
}) => {
  return await queryClient.ensureQueryData(
    watch_queries.getItemDetailQuery((params as any).mediaType, params.id)
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fir Media</title>
      </Head>
      <SkeletonTheme baseColor="#1c1917" highlightColor="#737373">
        <Provider>
          <QueryClientProvider client={queryClient}>
            <MediaContextProvider disableDynamicMediaQueries>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MediaContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </SkeletonTheme>
    </>
  )
}
