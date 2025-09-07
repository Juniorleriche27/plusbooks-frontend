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


// Posts
export const listPosts = (params={}) => api.get(`/posts`, { params }).then(r=>r.data);
export const getPost = (id) => api.get(`/posts/${id}`).then(r=>r.data);
export const createPost = (payload) => api.post(`/posts`, payload).then(r=>r.data);
export const updatePost = (id, payload) => api.put(`/posts/${id}`, payload).then(r=>r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`).then(r=>r.data);

// Comments
export const listComments = (postId, page=1) => api.get(`/posts/${postId}/comments`, { params:{ page } }).then(r=>r.data);
export const createComment = (postId, body) => api.post(`/posts/${postId}/comments`, { body }).then(r=>r.data);
export const deleteComment = (id) => api.delete(`/comments/${id}`).then(r=>r.data);

// Messages
export const threadWith = (userId) => api.get(`/messages/with/${userId}`).then(r=>r.data);
export const sendMessage = (payload) => api.post(`/messages`, payload).then(r=>r.data);
export const unreadCount = () => api.get(`/messages/unread_count`).then(r=>r.data);

// Groups
export const listGroups = (page=1) => api.get(`/groups`, { params:{ page } }).then(r=>r.data);
export const getGroup = (id) => api.get(`/groups/${id}`).then(r=>r.data);
export const createGroup = (payload) => api.post(`/groups`, payload).then(r=>r.data);
export const updateGroup = (id, payload) => api.put(`/groups/${id}`, payload).then(r=>r.data);
export const deleteGroup = (id) => api.delete(`/groups/${id}`).then(r=>r.data);
export const joinGroup = (id) => api.post(`/groups/${id}/join`).then(r=>r.data);
export const leaveGroup = (id) => api.post(`/groups/${id}/leave`).then(r=>r.data);
export const groupMembers = (id) => api.get(`/groups/${id}/members`).then(r=>r.data);
export const makeAdmin = (id, userId) => api.post(`/groups/${id}/members/${userId}/make-admin`).then(r=>r.data);

export const sendContact = (payload) =>
  api.post(`/contact`, payload).then((r) => r.data);
