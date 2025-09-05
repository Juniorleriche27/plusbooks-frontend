import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Connexion\nEmail: ${email}`)
  }

  return (
    <section className="stack">
      <h2>Connexion</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" />
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <button className="btn" type="submit">Se connecter</button>
      </form>
      <p className="muted">Pas de compte ? <a href="/register">Créer un compte</a></p>
    </section>
  )
}
