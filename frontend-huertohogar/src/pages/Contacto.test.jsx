import { render, screen } from '@testing-library/react'
import Contacto from './Contacto.jsx'

describe('Página Contacto', () => {
  it('muestra el formulario de contacto', () => {
    render(<Contacto />)

    expect(screen.getByText('Contacto')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Correo')).toBeInTheDocument()
    expect(screen.getByText('Comentario')).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })
})
