
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authcontext.jsx'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión')
    }
  }

  return (
    <div className="container my-4" style={{maxWidth:720}}>
      <h1>Inicio de sesión</h1>
      <form className="card p-4 hover" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="correo@duoc.cl"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Acceder
        </button>
      </form>
    </div>
  )
}
