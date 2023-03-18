// Don't need this
export const mediaTypeConfig: {[key:string] : any} = {
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

// const [[movieGenreList], [TVGenreList]] = [getMovieGenresQuery(), getTVGenresQuery()].map(
  //   (each) => queryClient.getQueriesData<{ genres: GenreType[] }>(each),
  // );


// Movie Detail
// {
//   "adult": false,
//   "backdrop_path": "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
//   "belongs_to_collection": {
//       "id": 422834,
//       "name": "Ant-Man Collection",
//       "poster_path": "/tmIrZCZo2Doe3bCSvN4hNXTbni5.jpg",
//       "backdrop_path": "/2KjtWUBiksmN8LsUouaZnxocu5N.jpg"
//   },
//   "budget": 0,
//   "genres": [
//       {
//           "id": 12,
//           "name": "Adventure"
//       },
//       {
//           "id": 878,
//           "name": "Science Fiction"
//       },
//       {
//           "id": 35,
//           "name": "Comedy"
//       }
//   ],
//   "homepage": "https://www.marvel.com/movies/ant-man-and-the-wasp-quantumania",
//   "id": 640146,
//   "imdb_id": "tt10954600",
//   "original_language": "en",
//   "original_title": "Ant-Man and the Wasp: Quantumania",
//   "overview": "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
//   "popularity": 367.535,
//   "poster_path": "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
//   "production_companies": [
//       {
//           "id": 420,
//           "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
//           "name": "Marvel Studios",
//           "origin_country": "US"
//       },
//       {
//           "id": 176762,
//           "logo_path": null,
//           "name": "Kevin Feige Productions",
//           "origin_country": "US"
//       }
//   ],
//   "production_countries": [
//       {
//           "iso_3166_1": "US",
//           "name": "United States of America"
//       }
//   ],
//   "release_date": "2023-02-10",
//   "revenue": 0,
//   "runtime": 125,
//   "spoken_languages": [
//       {
//           "english_name": "English",
//           "iso_639_1": "en",
//           "name": "English"
//       }
//   ],
//   "status": "Released",
//   "tagline": "Witness the beginning of a new dynasty.",
//   "title": "Ant-Man and the Wasp: Quantumania",
//   "video": false,
//   "vote_average": 7.964,
//   "vote_count": 28
// }