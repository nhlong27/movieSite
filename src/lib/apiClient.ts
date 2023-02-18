import axios from 'axios';
import urls from '@/config/urls'

export const apiClient = axios.create({
  baseURL: urls.tmdb,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY
  }
}) 