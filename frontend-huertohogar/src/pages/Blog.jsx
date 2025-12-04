export default function Blog(){
  return (
    <div className="container my-4">
      <h1>Blog: vida saludable y sostenibilidad</h1>
      <div className="row g-3 mt-2">
        <div className="col-12 col-md-6">
          <div className="card post-card hover" style={{maxWidth:420}}>
            <img src="/images/comidas.jpg" className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">Comer de temporada</h5>
              <p className="card-text">Elegir productos de estación es beneficioso porque son más frescos, sabrosos y nutritivos, además de ser más económicos y sostenibles. Al consumir frutas y verduras en su temporada natural, se apoya la producción local, se reduce el impacto ambiental del transporte y se aprovecha mejor su calidad y sabor.</p>
              
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card post-card hover" style={{maxWidth:420}}>
            <img src="/images/huella.jpg" className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">Huella de carbono</h5>
              <p className="card-text">Comprar productos locales ayuda a reducir las emisiones de CO₂ asociadas al transporte de mercancías. Además, apoya a los productores de la zona, fomenta la economía local y garantiza alimentos más frescos y de mejor calidad.</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
