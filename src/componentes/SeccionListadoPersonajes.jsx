import { useEffect, useState } from 'react'
import axios from 'axios'
import GaleriaLocaciones from './GaleriaLocaciones'

const OPCIONES_ESTADO = [
  { etiqueta: 'Todos', valor: 'all' },
  { etiqueta: 'Vivo', valor: 'alive' },
  { etiqueta: 'Muerto', valor: 'dead' },
]

function SeccionListadoPersonajes({ onSeleccionarPersonaje, onCambioResumen }) {
  const [filtroEstado, setFiltroEstado] = useState('all')
  const [pagina, setPagina] = useState(1)
  const [personajes, setPersonajes] = useState([])
  const [infoLista, setInfoLista] = useState({ pages: 1 })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true
    setCargando(true)
    setError('')

    const estadoQuery = filtroEstado === 'all' ? '' : `&status=${filtroEstado}`

    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pagina}${estadoQuery}`)
      .then((res) => {
        if (!activo) return
        setPersonajes(res.data.results || [])
        setInfoLista(res.data.info || { pages: 1 })
      })
      .catch(() => {
        if (!activo) return
        setError('No hay resultados para esos filtros.')
        setPersonajes([])
        setInfoLista({ pages: 1 })
      })
      .finally(() => {
        if (!activo) return
        setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [pagina, filtroEstado])

  useEffect(() => {
    if (!onCambioResumen) return
    const etiquetaEstado =
      OPCIONES_ESTADO.find((op) => op.valor === filtroEstado)?.etiqueta || 'Todos'

    onCambioResumen({
      paginas: infoLista.pages,
      cantidadPersonajes: personajes.length,
      etiquetaEstado,
    })
  }, [personajes.length, infoLista.pages, onCambioResumen, filtroEstado])

  const handleCambioEstado = (valor) => {
    setFiltroEstado(valor)
    setPagina(1)
  }

  return (
    <section className="panel">
      <div className="panel-encabezado">
        <div>
          <h2>Listado de personajes</h2>
          <p>Filtra por estado y navega las páginas.</p>
        </div>
        <div className="filtros">
          {OPCIONES_ESTADO.map((op) => (
            <button
              key={op.valor}
              className={filtroEstado === op.valor ? 'filtro activo' : 'filtro'}
              onClick={() => handleCambioEstado(op.valor)}
            >
              {op.etiqueta}
            </button>
          ))}
        </div>
      </div>

      <div className="paginacion">
        <button onClick={() => setPagina((p) => Math.max(p - 1, 1))} disabled={pagina === 1}>
          Anterior
        </button>
        <span>Página {pagina} de {infoLista.pages}</span>
        <button
          onClick={() => setPagina((p) => Math.min(p + 1, infoLista.pages))}
          disabled={pagina === infoLista.pages}
        >
          Siguiente
        </button>
      </div>

      {cargando && <p className="estado">Cargando personajes...</p>}
      {error && <p className="estado error">{error}</p>}

      <div className="grilla-tarjetas">
        {personajes.map((personaje) => (
          <article key={personaje.id} className="tarjeta">
            <img src={personaje.image} alt={personaje.name} />
            <div className="tarjeta-cuerpo">
              <h3>{personaje.name}</h3>
              <p>{personaje.status} - {personaje.species}</p>
              <button className="enlace" onClick={() => onSeleccionarPersonaje(personaje.id)}>
                Ver detalle
              </button>
            </div>
          </article>
        ))}
      </div>

      <GaleriaLocaciones />
    </section>
  )
}

export default SeccionListadoPersonajes