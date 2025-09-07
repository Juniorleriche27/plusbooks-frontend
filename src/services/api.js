import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://plusbooks-backend.onrender.com";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Ajoute automatiquement le token si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchEbooks = (page = 1) =>
  api.get(`/ebooks?page=${page}`).then((r) => r.data);
export const fetchEbook = (id) =>
  api.get(`/ebooks/${id}`).then((r) => r.data);
export const createEbook = (data) =>
  api.post(`/ebooks`, data).then((r) => r.data);

// Auth
export const register = (payload) =>
  api.post(`/register`, payload).then((r) => r.data);
export const login = (payload) =>
  api.post(`/login`, payload).then((r) => r.data);
export const me = () => api.get(`/me`).then((r) => r.data);
export const logout = () => api.post(`/logout`);

export default api;
