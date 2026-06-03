import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'dealer'|'user'>('user')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name || !email || !password) {
      setMessage('Completa todos los campos.')
      return
    }
    register(name, email, password, role)
      .then(() => {
        setMessage('Registro exitoso. Redirigiendo...')
        setTimeout(() => navigate('/login'), 900)
      })
      .catch((err: unknown) => setMessage(String(err)))
  }

  return (
    <section style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <h2>Crear cuenta</h2>
      <p>Regístrate para acceder a la plataforma de compra, venta y alquiler de carros.</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14, marginTop: 24 }}>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Nombre completo
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            style={{ padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@drivepoint.com"
            style={{ padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            style={{ padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '12px 18px', borderRadius: 8, background: '#10b981', color: '#020617', border: 'none', fontWeight: 700, cursor: 'pointer' }}
        >
          Registrarse
        </button>
        {message ? <p style={{ color: '#a5b4fc' }}>{message}</p> : null}
      </form>
    </section>
  )
}
