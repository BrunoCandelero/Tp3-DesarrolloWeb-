function EncabezadoHero({ paginas, cantidadPersonajes, etiquetaEstado }) {
  return (
    <header className="hero">
      <div>
        <h1>Centro de Control de Rick & Morty</h1>
        <p className="subtitulo">
          Navega por personajes y episodios
        </p>
      </div>
      <div className="hero-card">
        <p className="hero-etiqueta">Datos en vivo</p>
        <div className="hero-stats">
          <div>
            <span>Páginas</span>
            <strong>{paginas}</strong>
          </div>
          <div>
            <span>Personajes</span>
            <strong>{cantidadPersonajes}</strong>
          </div>
          <div>
            <span>Filtro</span>
            <strong>{etiquetaEstado}</strong>
          </div>
        </div>
      </div>
    </header>
  )
}

export default EncabezadoHero