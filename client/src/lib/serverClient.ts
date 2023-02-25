import axios from 'axios';
import urls from '@/config/urls';

export const serverClient = axios.create({
  baseURL: urls.server,
  params: {},
});
