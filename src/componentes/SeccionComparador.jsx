import { useState } from 'react'
import axios from 'axios'

function SeccionComparador() {
  const [idIzquierdo, setIdIzquierdo] = useState('')
  const [idDerecho, setIdDerecho] = useState('')
  const [datosComparacion, setDatosComparacion] = useState({ izquierdo: null, derecho: null })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const handleComparar = async () => {
    if (!idIzquierdo.trim() || !idDerecho.trim()) {
      setError('Debes ingresar dos IDs para comparar.')
      return
    }

    setError('')
    setCargando(true)
    setDatosComparacion({ izquierdo: null, derecho: null })

    try {
      const [resIzq, resDer] = await Promise.all([
        axios.get(`https://rickandmortyapi.com/api/character/${idIzquierdo}`),
        axios.get(`https://rickandmortyapi.com/api/character/${idDerecho}`),
      ])
      setDatosComparacion({ izquierdo: resIzq.data, derecho: resDer.data })
    } catch {
      setError('No se pudo cargar la comparación.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="panel">
      <div className="panel-encabezado">
        <div>
          <h2>Comparador de personajes</h2>
          <p>Ingresá dos IDs y compará características básicas.</p>
        </div>
        <div className="controles-comparador">
          <div className="campo">
            <label htmlFor="idIzquierdo">ID izquierdo</label>
            <input
              id="idIzquierdo"
              type="number"
              min="1"
              value={idIzquierdo}
              onChange={(e) => setIdIzquierdo(e.target.value)}
              placeholder="Ej: 1"
            />
          </div>
          <div className="campo">
            <label htmlFor="idDerecho">ID derecho</label>
            <input
              id="idDerecho"
              type="number"
              min="1"
              value={idDerecho}
              onChange={(e) => setIdDerecho(e.target.value)}
              placeholder="Ej: 2"
            />
          </div>
          <button onClick={handleComparar}>Comparar</button>
        </div>
      </div>

      {cargando && <p className="estado">Comparando...</p>}
      {error && <p className="estado error">{error}</p>}

      {datosComparacion.izquierdo && datosComparacion.derecho && (
        <div className="grilla-comparador">
          {[datosComparacion.izquierdo, datosComparacion.derecho].map((personaje) => (
            <div key={personaje.id} className="tarjeta-comparador">
              <img src={personaje.image} alt={personaje.name} />
              <h3>{personaje.name}</h3>
              <ul>
                <li>Estado: {personaje.status}</li>
                <li>Especie: {personaje.species}</li>
                <li>Género: {personaje.gender}</li>
                <li>Origen: {personaje.origin?.name}</li>
                <li>Ubicación: {personaje.location?.name}</li>
                <li>Episodios: {personaje.episode?.length ?? 0}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default SeccionComparador