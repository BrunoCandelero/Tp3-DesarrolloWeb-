import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const getIdDesdeUrl = (url) => url.split('/').pop()

function SeccionDetalleEpisodio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [inputId, setInputId] = useState(id || '')
  const [detalleEpisodio, setDetalleEpisodio] = useState(null)
  const [personajesEpisodio, setPersonajesEpisodio] = useState([])
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
    setDetalleEpisodio(null)
    setPersonajesEpisodio([])

    const fetchEpisodio = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
        if (!activo) return

        setDetalleEpisodio(res.data)
        const idsPersonajes = (res.data.characters || []).map(getIdDesdeUrl)
        if (idsPersonajes.length === 0) return

        const resPersonajes = await axios.get(
          `https://rickandmortyapi.com/api/character/${idsPersonajes.join(',')}`,
        )
        if (!activo) return

        const normalizados = Array.isArray(resPersonajes.data)
          ? resPersonajes.data
          : [resPersonajes.data]
        setPersonajesEpisodio(normalizados)
      } catch {
        if (!activo) return
        setError('No se pudo cargar el detalle del episodio.')
      } finally {
        if (!activo) return
        setCargando(false)
      }
    }

    fetchEpisodio()
    return () => {
      activo = false
    }
  }, [id])

  const handleBuscarPorId = () => {
    if (!inputId.trim()) return
    navigate(`/episodio/${inputId.trim()}`)
  }

  return (
    <section className="panel">
      <div className="panel-encabezado">
        <div>
          <h2>Detalle del episodio</h2>
          <p>Ingresá un ID para ver los datos del episodio.</p>
        </div>
        <div className="campo">
          <label htmlFor="idEpisodio">ID del episodio</label>
          <div className="campo-fila">
            <input
              id="idEpisodio"
              type="number"
              min="1"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="Ej: 10"
            />
            <button onClick={handleBuscarPorId}>Buscar</button>
          </div>
        </div>
      </div>

      {cargando && <p className="estado">Cargando episodio...</p>}
      {error && <p className="estado error">{error}</p>}

      {detalleEpisodio && (
        <div className="detalle">
          <div className="detalle-tarjeta">
            <div>
              <h3>{detalleEpisodio.name}</h3>
              <p>
                Código: {detalleEpisodio.episode} | Estreno: {detalleEpisodio.air_date}
              </p>
            </div>
          </div>
          <div className="detalle-lista">
            <h3>Personajes del episodio</h3>
            <div className="grilla-tarjetas compacta">
              {personajesEpisodio.map((personaje) => (
                <article key={personaje.id} className="tarjeta mini">
                  <img src={personaje.image} alt={personaje.name} />
                  <div className="tarjeta-cuerpo">
                    <h4>{personaje.name}</h4>
                    <p>{personaje.species}</p>
                    <button className="enlace" onClick={() => navigate(`/personaje/${personaje.id}`)}>
                      Ver personaje
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SeccionDetalleEpisodio