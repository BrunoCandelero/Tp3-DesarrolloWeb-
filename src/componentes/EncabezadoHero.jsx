function EncabezadoHero({ paginas, cantidadPersonajes, etiquetaEstado }) {
  return (
    <header className="encabezado-principal">
      <div>
        <h1>Centro de Control de Rick & Morty</h1>
        <p className="encabezado-subtitulo">
          Navega por personajes y episodios
        </p>
      </div>
      <div className="tarjeta-datos">
        <p className="etiqueta-datos">Datos en vivo</p>
        <div className="lista-datos">
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