import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminProducts from './AdminProducts.jsx'
import { PRODUCTS } from '../data/products.js'

const mockUseCart = vi.fn()

vi.mock('../Context/cartcontext.jsx', () => ({
  useCart: () => mockUseCart()
}))

describe('Página AdminProducts', () => {
  beforeEach(() => {
    mockUseCart.mockReset()
    mockUseCart.mockReturnValue({
      inventory: PRODUCTS,
      addProduct: vi.fn()
    })
  })

  it('muestra el listado de productos del inventario', () => {
    render(
      <MemoryRouter>
        <AdminProducts />
      </MemoryRouter>
    )

    expect(screen.getByText('Listado de Productos')).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes(PRODUCTS[0].name))
    ).toBeInTheDocument()
  })

  it('permite agregar un nuevo producto llamando a addProduct', async () => {
    const addProductMock = vi.fn()
    mockUseCart.mockReturnValue({
      inventory: PRODUCTS,
      addProduct: addProductMock
    })

    render(
      <MemoryRouter>
        <AdminProducts />
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText('Código'), 'TEST001')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Producto de prueba')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Test')
    await userEvent.type(screen.getByLabelText('Precio'), '1990')
    await userEvent.type(screen.getByLabelText('Unidad'), 'bandeja')

    await userEvent.click(screen.getByRole('button', { name: 'Guardar producto' }))

    expect(addProductMock).toHaveBeenCalled()
    const arg = addProductMock.mock.calls[0][0]
    expect(arg.code).toBe('TEST001')
    expect(arg.name).toBe('Producto de prueba')
    expect(arg.category).toBe('Test')
    expect(arg.price).toBe(1990)
  })
})
