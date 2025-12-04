
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authcontext.jsx'

export default function Register(){
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password || !password2) {
      setError('Completa todos los campos')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      register(email, password, 'cliente')
      setSuccess('Cuenta creada correctamente. Ahora puedes iniciar sesión.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta')
    }
  }

  return (
    <div className="container my-4" style={{maxWidth:720}}>
      <h1>Crear cuenta nueva</h1>
      <form className="card p-4 hover" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

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
        <div className="mb-3">
          <label className="form-label">Repetir contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password2}
            onChange={(e)=>setPassword2(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Crear cuenta
        </button>
      </form>
    </div>
  )
}
