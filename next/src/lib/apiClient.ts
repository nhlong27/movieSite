import axios from 'axios';
import urls from '@/config/urls';

export const apiClient = axios.create({
  baseURL: urls.tmdb,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});

