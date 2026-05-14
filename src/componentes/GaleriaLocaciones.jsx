const GALERIA_LOCACIONES = [
  {
    nombre: 'Ciudadela de los Ricks',
    imagen: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  },
  {
    nombre: 'Tierra Cronenberg',
    imagen: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
  },
  {
    nombre: 'Parque Anatómico',
    imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    nombre: 'Gazorpazorp',
    imagen: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80',
  },
]

function GaleriaLocaciones() {
  return (
    <div className="galeria">
      <div className="galeria-encabezado">
        <h2>Galería de locaciones</h2>
        <p>Un vistazo rápido a los mundos más icónicos.</p>
      </div>
      <div className="galeria-grilla">
        {GALERIA_LOCACIONES.map((loc) => (
          <div key={loc.nombre} className="galeria-tarjeta">
            <img src={loc.imagen} alt={loc.nombre} />
            <div>
              <span>{loc.nombre}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GaleriaLocaciones