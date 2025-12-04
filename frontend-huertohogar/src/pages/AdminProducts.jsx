import { useState } from 'react'
import { fmtCLP } from '../utils.js'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/cartcontext.jsx'

export default function AdminProducts(){
  const { inventory, addProduct } = useCart()

  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('kg')
  const [img, setImg] = useState('/images/comidas.jpg') // valor por defecto simple

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code || !name || !category || !price) return

    addProduct({
      code,
      name,
      category,
      price: Number(price),
      unit,
      img,
      desc: ''
    })

    // limpiar formulario
    setCode('')
    setName('')
    setCategory('')
    setPrice('')
  }

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-12 col-lg-3">
          <div className="card p-3">
            <h6 className="mb-3">Productos</h6>
            <Link className="btn btn-outline-primary w-100" to="/admin">Volver</Link>
          </div>

          <div className="card p-3 mt-3">
            <h6 className="mb-3">Agregar nuevo producto</h6>
            <form onSubmit={handleSubmit} className="small">
              <div className="mb-2">
                <label className="form-label" htmlFor="code">Código</label>
                <input id="code"
                  className="form-control form-control-sm"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ej: FR010"
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="name">Nombre</label>
                <input id="name"
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="category">Categoría</label>
                <input id="category"
                  className="form-control form-control-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Frutas Frescas, Verduras, etc."
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="price">Precio</label>
                <input id="price"
                  type="number"
                  min="0"
                  className="form-control form-control-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej: 1990"
                />
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="unit">Unidad</label>
                <input id="unit"
                  className="form-control form-control-sm"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="kg, bandeja, unidad..."
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary w-100">
                Guardar producto
              </button>
            </form>
          </div>
        </div>

        <div className="col">
          <h1>Listado de Productos</h1>
          <div className="card mt-3">
            <div className="card-body">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock referencial</th>
                  </tr>
                </thead>
                <tbody>
                  {(inventory || []).map((p, i) => (
                    <tr key={p.code}>
                      <td>{p.code}</td>
                      <td>Inventario: {p.name}</td>
                      <td>{p.category}</td>
                      <td>{fmtCLP(p.price)}</td>
                      <td>{[150,200,250,100,80,120,50,60,90][i % 9]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
