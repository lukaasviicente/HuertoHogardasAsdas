import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Login from './Login.jsx'

const mockLogin = vi.fn()

vi.mock('../Context/authcontext.jsx', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}))

describe('Página Login', () => {
  it('muestra el formulario de acceso', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    expect(screen.getByText('Acceder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('correo@duoc.cl')).toBeInTheDocument()
  })

  it('llama a login cuando el formulario es válido', async () => {
    mockLogin.mockReturnValue({ email: 'admin@duoc.cl', role: 'admin' })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    await userEvent.type(screen.getByPlaceholderText('correo@duoc.cl'), 'admin@duoc.cl')
    await userEvent.type(screen.getByPlaceholderText('********'), '1234')
    await userEvent.click(screen.getByRole('button', { name: 'Acceder' }))

    expect(mockLogin).toHaveBeenCalledWith('admin@duoc.cl', '1234')
  })
})
