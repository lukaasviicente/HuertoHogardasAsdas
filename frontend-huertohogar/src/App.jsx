import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import CartProvider from './Context/cartcontext.jsx'
import AuthProvider from './Context/authcontext.jsx'

import Products from './pages/Shop/Products.jsx'
import ProductDetail from './pages/Shop/ProductDetail.jsx'
import Carrito from './pages/Shop/Carrito.jsx'
import Checkout from './pages/Shop/Checkout.jsx'
import Boleta from './pages/Shop/Boleta.jsx'

import Blog from './pages/Blog.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'
import AdminProducts from './pages/AdminProducts.jsx'

// Portada simple
function Home(){
  return (
    <div className="container my-4">
      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <h1 className="mb-3">Frescura del campo directo a tu hogar</h1>
          <p>
            Conecta con agricultores locales y recibe frutas, verduras y productos orgánicos
            seleccionados con cariño.
          </p>
          <div className="d-flex gap-2 mt-3">
            <Link to="/products" className="btn btn-success">
              Ver catálogo
            </Link>
            <Link to="/nosotros" className="btn btn-outline-success">
              Conócenos
            </Link>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/images/Logo_HUERTO_HOGAR.png"
            alt="HuertoHogar"
            style={{maxWidth: 260}}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/producto/:code" element={<ProductDetail />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/boleta" element={<Boleta />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
        </Routes>

        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}
