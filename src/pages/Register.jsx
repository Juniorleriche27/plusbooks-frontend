import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    domain: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await register(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      nav("/profile");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Échec de l'inscription. Vérifie les champs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="stack">
      <h1>Créer un compte</h1>
      <form className="card stack" onSubmit={onSubmit}>
        {error && <div className="error">{error}</div>}
        <label>
          Nom
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Type de compte
          <select name="role" value={form.role} onChange={onChange}>
            <option value="user">Utilisateur</option>
            <option value="coach">Coach</option>
          </select>
        </label>

        <label>
          Domaine (ex: Développement personnel, Finances…)
          <input name="domain" value={form.domain} onChange={onChange} />
        </label>

        <label>
          À propos / Bio
          <textarea name="bio" value={form.bio} onChange={onChange} rows={4} />
        </label>

        <button className="btn" disabled={loading}>
          {loading ? "Création..." : "Créer le compte"}
        </button>
      </form>
    </section>
  );
}
