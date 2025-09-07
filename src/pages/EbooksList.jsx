import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEbooks } from "../services/api";

export default function Ebooks() {
  const nav = useNavigate();
  const [data, setData] = useState({ items: [], page: 1, loading: true });

  useEffect(() => {
    setData((d) => ({ ...d, loading: true }));
    fetchEebooksSafe(1);
    async function fetchEebooksSafe(p) {
      try {
        const res = await fetchEbooks(p);
        setData({ items: res.data || res.items || res, page: p, loading: false });
      } catch {
        setData({ items: [], page: 1, loading: false });
      }
    }
  }, []);

  const handleDownload = (ebook) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirige vers login, puis retour à la page détail ou liste
      const next = ebook?.id ? `/ebooks/${ebook.id}` : `/ebooks`;
      nav(`/login?next=${encodeURIComponent(next)}`);
      return;
    }
    // TODO: appeler l’endpoint de téléchargement si dispo
    alert("Téléchargement (à connecter à l’API).");
  };

  if (data.loading) return <div className="container">Chargement…</div>;

  return (
    <section className="container stack">
      <h1>Catalogue des e-books</h1>
      <div className="grid">
        {data.items.map((eb) => (
          <article key={eb.id} className="card">
            <h3>{eb.title || `E-book #${eb.id}`}</h3>
            <p className="muted">{eb.description || "Aucune description."}</p>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <Link className="btn outline" to={`/ebooks/${eb.id}`}>Voir</Link>
              <button className="btn" onClick={() => handleDownload(eb)}>Télécharger</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
