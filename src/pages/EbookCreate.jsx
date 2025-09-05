import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEbook } from "../services/api";

export default function EbookCreate() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!title.trim()) { setErr("Le titre est obligatoire."); return; }
    setLoading(true);
    try {
      await createEbook({ title, description, price: Number(price || 0), file });
      nav("/"); // retour à l’accueil
    } catch (e) {
      console.error(e);
      setErr("Échec de la publication. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Publier un e-book</h2>

      <form className="form" onSubmit={submit}>
        {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}

        <div>
          <label htmlFor="title">Titre</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Prix (€)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="file">Fichier PDF (optionnel)</label>
          <input id="file" type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])} />
        </div>

        <div className="row">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Publication…" : "Publier"}
          </button>
          <button className="btn outline" type="button" onClick={() => nav("/")}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
