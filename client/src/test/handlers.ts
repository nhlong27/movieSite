import {rest} from 'msw';
import urls from '@/config/urls';

export const handlers = [
  rest.get(`${urls.tmdb}/search/multi`, (req, res, ctx)=> {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '123',
          title: 'The Movie'
        },
        {
          id: '234',
          name: 'The Movie'
        }
      ]
        // poster_path: z.string().nullable().optional(),
        // adult: z.boolean().optional(),
        // overview: z.string().optional(),
        // release_date: z.string().optional(),
        // original_title: z.string().optional(),
        // genre_ids: z.array(z.number()).optional(),
        // id: z.number().optional(),
        // media_type: z.literal('movie').optional(),
        // original_language: z.string().optional(),
        // title: z.string().optional(),
        // backdrop_path: z.string().nullable().optional(),
        // popularity: z.number().optional(),
        // vote_count: z.number().optional(),
        // video: z.boolean().optional(),
        // vote_average: z.number().optional(),

      )
    )
  })
]