import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="brand">PlusBooks</div>
      <nav className="nav">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/ebooks">E-books</NavLink>
        <NavLink to="/ebooks/new">Ajouter</NavLink>
        <NavLink to="/profile">Profil</NavLink>
        <NavLink to="/login">Connexion</NavLink>
        <NavLink to="/register">Inscription</NavLink>
      </nav>
    </header>
  )
}
