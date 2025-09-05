import React from 'react'
import { Link } from 'react-router-dom'

const demo = [
  { id: 1, title: 'E-book 1', price: 5.99 },
  { id: 2, title: 'E-book 2', price: 7.49 },
]

export default function EbooksList() {
  return (
    <section className="stack">
      <h2>Liste des e-books</h2>
      <div className="grid">
        {demo.map((b) => (
          <Link className="card" key={b.id} to={`/ebooks/${b.id}`}>
            <h3>{b.title}</h3>
            <p className="muted">Prix: {b.price} €</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
