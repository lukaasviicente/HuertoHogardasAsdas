
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../Context/cartcontext.jsx'
import { useAuth } from '../Context/authcontext.jsx'

export default function Header(){
  const { count } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="bg-white">
      <nav className="container d-flex align-items-center justify-content-between py-2">
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <img src="/images/Logo_HUERTO_HOGAR.png" alt="Logo HuertoHogar" />
          <span className="text-success">HuertoHogar</span>
        </Link>

        <ul className="nav">
          <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/products">Productos</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>

          {!user && (
            <>
              <li className="nav-item"><NavLink className="nav-link" to="/login">Acceder</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/registrarse">Registrarse</NavLink></li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <span className="nav-link disabled">
                  {user.role === 'admin' ? 'Admin' : 'Cliente'}: {user.email}
                </span>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
              )}
              <li className="nav-item">
                <button className="btn btn-link nav-link" type="button" onClick={logout}>
                  Salir
                </button>
              </li>
            </>
          )}
        </ul>

        <Link to="/carrito" className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
          <span aria-hidden="true">🛒</span>
          <span className="badge">{count}</span>
        </Link>
      </nav>
    </header>
  )
}
