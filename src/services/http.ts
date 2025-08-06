import { environment } from '@/environnments/environnment';
import axios from 'axios';
import router from '@/router/index.ts';

const http = axios.create({
  baseURL: environment.API_MILES_DREAMS_URL
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      router.push({ path: '/login', query: { sessionExpired: '401' } });
    }
    return Promise.reject(error);
  }
);

export default http;
