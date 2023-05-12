// Don't need this
export const mediaTypeConfig: Record<string, unknown> = {
  movie: {
    statusList: ['trending', 'upcoming', 'now_playing'],
    filterList: ['sort_by', 'year', 'with_genres', 'include_adult'],
    trendingBy: ['day', 'week'],
    sort_by: ["popularity.asc" , "popularity.desc" , "release_date.desc" , "vote_average.desc" , "vote_average.asc" , "vote_count.desc" , "vote_count.asc"],
  },
  tv: {
    statusList: ['trending', 'on_the_air', 'airing_today'],
    filterList: ['sort_by', 'first_air_date_year', 'with_genres', 'with_status', 'with_type'],
    trendingBy: ['day', 'week'],
    sort_by: ["popularity.asc" , "popularity.desc" , "first_air_date.desc" , "vote_average.desc" , "vote_average.asc" , "vote_count.desc" , "vote_count.asc"],
    with_status: ['Planned', 'In Production', 'Ended', 'Cancelled', 'Pilot'],
    with_type: ['Documentary', 'News', 'Miniseries', 'Reality', 'Scripted', 'Talk Show', 'Video']
  },
};
