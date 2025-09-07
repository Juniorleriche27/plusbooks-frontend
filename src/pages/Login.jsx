import React, { useState, useEffect } from "react";
import { login, me } from "../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [search] = useSearchParams();
  const next = search.get("next") || "/profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
    // si déjà connecté, va directement sur profil (ou next)
    const t = localStorage.getItem("token");
    if (!t) return;
    me().then(()=>nav(next, { replace:true })).catch(()=>{});
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      nav(next, { replace: true });
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className="auth-grid">
        <div className="auth-aside">
          <h1>Heureux de vous revoir</h1>
          <p className="muted">Accédez à votre bibliothèque et à votre tableau de bord.</p>
        </div>

        <form className="auth-card" onSubmit={onSubmit}>
          <h2>Connexion</h2>
          {error && <div className="error">{error}</div>}

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

          <button className="btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="auth-links">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
            <span>•</span>
            <Link to={`/register?next=${encodeURIComponent(next)}`}>Créer un compte</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
