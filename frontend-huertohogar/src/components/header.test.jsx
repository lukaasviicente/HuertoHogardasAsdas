import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './header.jsx'

// Mock del contexto del carrito
vi.mock('../Context/cartcontext.jsx', () => ({
  useCart: () => ({ count: 5 })
}))

// Mock del contexto de autenticación
vi.mock('../Context/authcontext.jsx', () => ({
  useAuth: () => ({
    user: null,        // usuario NO logueado
    logout: vi.fn()
  })
}))

describe('Header', () => {
  it('muestra el logo, el nombre de la marca y los enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // Logo por rol img
    const logo = screen.getByRole('img')
    expect(logo).toHaveAttribute('src', '/images/Logo_HUERTO_HOGAR.png')

    // Nombre de la marca
    expect(screen.getByText('HuertoHogar')).toBeInTheDocument()

    // Enlaces principales
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Nosotros')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('muestra los enlaces de Acceder y Registrarse cuando no hay usuario autenticado', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Acceder')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
  })

  it('muestra la cantidad del carrito que viene del contexto', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const badge = screen.getByText('5')
    expect(badge).toBeInTheDocument()
  })
})
