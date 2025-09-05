import axios from "axios";

// --- Configuration de base Axios ---
const api = axios.create({
  baseURL: "https://plusbooks-backend.onrender.com", // URL de ton backend Render
  headers: {
    "Accept": "application/json",
  },
});

// --- Récupérer la liste des e-books ---
export async function fetchEbooks(page = 1) {
  const { data } = await api.get(`/api/ebooks?page=${page}`);
  return data;
}

// --- Créer un nouvel e-book (avec ou sans fichier PDF) ---
export async function createEbook({ title, description, price, file }) {
  const form = new FormData();
  form.append("title", title);
  form.append("description", description || "");
  form.append("price", price || 0);
  if (file) {
    form.append("file", file);
  }

  const { data } = await api.post("/api/ebooks", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// --- Récupérer un e-book précis ---
export async function getEbook(id) {
  const { data } = await api.get(`/api/ebooks/${id}`);
  return data;
}

// --- Mettre à jour un e-book ---
export async function updateEbook(id, { title, description, price, file }) {
  const form = new FormData();
  if (title) form.append("title", title);
  if (description) form.append("description", description);
  if (price) form.append("price", price);
  if (file) {
    form.append("file", file);
  }

  const { data } = await api.post(`/api/ebooks/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// --- Supprimer un e-book ---
export async function deleteEbook(id) {
  const { data } = await api.delete(`/api/ebooks/${id}`);
  return data;
}

export default api;
