import React, { useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Inscription\nNom: ${name}\nEmail: ${email}`)
  }

  return (
    <section className="stack">
      <h2>Inscription</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" />
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <button className="btn" type="submit">Créer mon compte</button>
      </form>
    </section>
  )
}
