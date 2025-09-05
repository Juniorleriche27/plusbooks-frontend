import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      {/* Barre de navigation */}
      <header className="navbar">
        <div className="container row" style={{justifyContent: "space-between", alignItems: "center"}}>
          <Link to="/" className="brand">PlusBooks</Link>

          <nav className="row" style={{gap: 12}}>
            <NavLink to="/" end className="btn outline">Accueil</NavLink>
            <NavLink to="/ebooks" className="btn outline">E-books</NavLink>
            <NavLink to="/ebooks/new" className="btn">Publier</NavLink>
            <NavLink to="/profile" className="btn outline">Profil</NavLink>
            <NavLink to="/login" className="btn outline">Connexion</NavLink>
            <NavLink to="/register" className="btn outline">Inscription</NavLink>
          </nav>
        </div>
      </header>

      {/* Contenu des routes enfants */}
      <main className="container" style={{paddingTop: 24, paddingBottom: 48}}>
        <Outlet />
      </main>

      {/* Pied de page */}
      <footer className="container muted" style={{padding: "24px 0", borderTop: "1px solid var(--border)"}}>
        © {new Date().getFullYear()} PlusBooks. Tous droits réservés.
      </footer>
    </div>
  );
}
