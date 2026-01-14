import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) =>
    api.post('/auth/register', data),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const albumAPI = {
  getModels: () => api.get('/albums/models'),
  getCategories: (modelId: string) => api.get(`/albums/models/${modelId}/categories`),
};

export const orderAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
};

export default api;
