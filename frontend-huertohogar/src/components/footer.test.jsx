import { render, screen } from '@testing-library/react'
import Footer from './footer.jsx'

describe('Footer', () => {
  it('muestra el copyright y el lema', () => {
    render(<Footer />)

    expect(screen.getByText('© 2025 HuertoHogar')).toBeInTheDocument()
    expect(
      screen.getByText('Frescura directa del campo a tu mesa.')
    ).toBeInTheDocument()
  })
})
