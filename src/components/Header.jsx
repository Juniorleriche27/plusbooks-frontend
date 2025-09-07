import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, me } from "../services/api";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return setUser(null);
    me()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const doLogout = async () => {
    try { await logout(); } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    nav("/");
  };

  return (
    <header className="header">
      <Link to="/" className="brand-wordmark" aria-label="PlusBooks, accueil">
        <span className="plus">Plus</span>
        <span className="dot" />
        <span className="books">Books</span>
      </Link>

      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/ebooks">E-books</Link>
        {user && <Link to="/ebooks/new">Publier</Link>}
        {user ? (
          <>
            <Link to="/profile">Profil</Link>
            <button className="btn outline" onClick={doLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link className="btn" to="/register">Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
}
