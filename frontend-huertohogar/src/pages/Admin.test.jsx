import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Admin from './Admin.jsx'

const mockUseAuth = vi.fn()

vi.mock('../Context/authcontext.jsx', () => ({
  useAuth: () => mockUseAuth()
}))

describe('Página Admin', () => {
  beforeEach(() => {
    mockUseAuth.mockReset()
  })

  it('bloquea acceso a usuarios que no son admin', () => {
    mockUseAuth.mockReturnValue({
      user: { email: 'cliente@duoc.cl', role: 'cliente' },
      logout: vi.fn()
    })

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Acceso solo para administradores. Inicia sesión con una cuenta de administrador.')
    ).toBeInTheDocument()
  })

  it('muestra el panel cuando el usuario es admin', () => {
    mockUseAuth.mockReturnValue({
      user: { email: 'admin@duoc.cl', role: 'admin' },
      logout: vi.fn()
    })

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    )

    expect(screen.getByText('Panel de administración')).toBeInTheDocument()
    expect(screen.getByText('Resumen de ventas')).toBeInTheDocument()
    expect(screen.getByText('Inventario')).toBeInTheDocument()
  })
})
