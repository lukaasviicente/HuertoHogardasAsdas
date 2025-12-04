import { render, screen } from '@testing-library/react'
import Nosotros from './Nosotros.jsx'

describe('Página Nosotros', () => {
  it('muestra el título principal y las ubicaciones', () => {
    render(<Nosotros />)

    expect(screen.getByText('Sobre HuertoHogar')).toBeInTheDocument()
    expect(screen.getByText('Nuestras ubicaciones')).toBeInTheDocument()
    expect(
      screen.getByText(/Santiago, Puerto Montt, Villarrica/i)
    ).toBeInTheDocument()
  })
})
