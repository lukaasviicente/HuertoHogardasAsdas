import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'

describe('Página Blog', () => {
  it('muestra el título principal y las tarjetas de artículos', () => {
    render(<Blog />)

    expect(screen.getByText('Blog: vida saludable y sostenibilidad')).toBeInTheDocument()
    expect(screen.getByText('Comer de temporada')).toBeInTheDocument()
    expect(screen.getByText('Huella de carbono')).toBeInTheDocument()
  })
})
