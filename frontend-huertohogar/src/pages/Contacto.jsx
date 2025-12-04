export default function Contacto(){
  return (
    <div className="container my-4" style={{maxWidth:720}}>
      <h1>Contacto</h1>
      <form className="card p-4 hover">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" placeholder="Tu nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" placeholder="usuario@duoc.cl" />
        </div>
        <div className="mb-3">
          <label className="form-label">Comentario</label>
          <textarea className="form-control" rows={4} />
        </div>
        <button className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  )
}
