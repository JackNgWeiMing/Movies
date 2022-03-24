import Axios from 'axios';

/**
 * Initialization
 */
const axios = Axios.create();
axios.defaults.params = {};
axios.defaults.params.apiKey = '6fc87060';
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

/**
 * API Wrapper for ombdbAPI
 * see also: https://www.omdbapi.com/
 */
type ResultType = 'movie' | 'series' | 'episode';

export interface GetMovieListAPIResponse {
  Response: 'True';
  Search: Movie[];
  totalResults: number;
}

const getMovieList = (data: {
  keyword: string;
  resultType?: ResultType;
  pageIndex?: number;
  pageSize?: number;
}) => {
  const {
    keyword,
    // resultType = 'movie' ,
    // pageIndex = 1
  } = data;

  return axios
    .get<GetMovieListAPIResponse>('https://www.omdbapi.com', {
      params: {s: keyword || 'Marvel'},
    })
    .then(response => {
      return response.data;
    });
};

export interface GetMovieByIdResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: {Source: string; Value: string}[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

const getMovieListById = (movieId: string) => {
  return axios
    .get<GetMovieByIdResponse>('https://www.omdbapi.com', {
      params: {
        i: movieId,
      },
    })
    .then(response => {
      return response.data;
    });
};

export const omdbAPI = {
  getMovieList,
  getMovieListById,
};
