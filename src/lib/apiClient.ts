import axios from 'axios';
import * as urls from '@/config/urls'

export const apiClient = axios.create({
  baseURL: urls.tmdb,
  params: {
    api_key: import.meta.env.API_KEY
  }
}) 