import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const obtenerIdDeUrl = (url) => url.split('/').pop()

function SeccionDetallePersonaje() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [inputId, setInputId] = useState(id || '')
  const [detallePersonaje, setDetallePersonaje] = useState(null)
  const [episodiosPersonaje, setEpisodiosPersonaje] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setInputId(id || '')
  }, [id])

  useEffect(() => {
    if (!id) return

    let activo = true
    setCargando(true)
    setError('')
    setDetallePersonaje(null)
    setEpisodiosPersonaje([])

    const fetchPersonaje = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        if (!activo) return

        setDetallePersonaje(res.data)
        const idsEpisodios = (res.data.episode || []).map(obtenerIdDeUrl)
        if (idsEpisodios.length === 0) return

        const resEpisodios = await axios.get(
          `https://rickandmortyapi.com/api/episode/${idsEpisodios.join(',')}`,
        )
        if (!activo) return

        const normalizados = Array.isArray(resEpisodios.data)
          ? resEpisodios.data
          : [resEpisodios.data]
        setEpisodiosPersonaje(normalizados)
      } catch {
        if (!activo) return
        setError('No se pudo cargar el detalle del personaje.')
      } finally {
        if (!activo) return
        setCargando(false)
      }
    }

    fetchPersonaje()
    return () => {
      activo = false
    }
  }, [id])

  const handleBuscar = () => {
    if (!inputId.trim()) return
    navigate(`/personaje/${inputId.trim()}`)
  }

  return (
    <section className="panel">
      <div className="panel-encabezado">
        <div>
          <h2>Detalle del personaje</h2>
          <p>Ingresá un ID para ver los datos del personaje.</p>
        </div>
        <div className="campo">
          <label htmlFor="idPersonaje">ID del personaje</label>
          <div className="campo-fila">
            <input
              id="idPersonaje"
              type="number"
              min="1"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="Ej: 1"
            />
            <button onClick={handleBuscar}>Buscar</button>
          </div>
        </div>
      </div>

      {cargando && <p className="estado">Cargando detalle...</p>}
      {error && <p className="estado error">{error}</p>}

      {detallePersonaje && (
        <div className="detalle">
          <div className="detalle-tarjeta">
            <img src={detallePersonaje.image} alt={detallePersonaje.name} />
            <div>
              <h3>{detallePersonaje.name}</h3>
              <p>
                {detallePersonaje.status} - {detallePersonaje.species}
              </p>
              <p>Género: {detallePersonaje.gender}</p>
              <p>Origen: {detallePersonaje.origin?.name}</p>
              <p>Ubicación: {detallePersonaje.location?.name}</p>
            </div>
          </div>

          <div className="detalle-lista">
            <h3>Episodios donde aparece</h3>
            <div className="lista-episodios">
              {episodiosPersonaje.map((episodio) => (
                <button
                  key={episodio.id}
                  className="tarjeta-episodio"
                  onClick={() => navigate(`/episodio/${episodio.id}`)}
                >
                  <span>{episodio.episode}</span>
                  <strong>{episodio.name}</strong>
                  <small>{episodio.air_date}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SeccionDetallePersonaje