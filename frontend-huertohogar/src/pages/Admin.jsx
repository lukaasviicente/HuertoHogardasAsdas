
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authcontext.jsx'

export default function Admin(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user || user.role !== 'admin') {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">
          Acceso solo para administradores. Inicia sesión con una cuenta de administrador.
        </div>
        <Link className="btn btn-primary" to="/login">Ir a inicio de sesión</Link>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-12 col-lg-3">
          <div className="card p-3">
            <h6 className="mb-3">Panel de administración</h6>
            <p className="small text-muted mb-2">Conectado como<br />{user.email}</p>
            <Link className="btn btn-outline-primary w-100 mb-2" to="/admin/productos">Productos</Link>
            <Link className="btn btn-outline-primary w-100 mb-2" to="/">Ir a tienda</Link>
            <button className="btn btn-outline-secondary w-100" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
        <div className="col">
          <h1>Administrador</h1>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="tile">
                <div className="text-muted small">Resumen de ventas</div>
                <div className="display-6">+9 demo</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tile">
                <div className="text-muted small">Inventario</div>
                <h3>Admin / Vendedor / Cliente</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tile">
                <div className="text-muted small">Carrito</div>
                <h3>0 ítems</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
