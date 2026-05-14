import { useEffect, useState } from 'react';
import axios from 'axios'; // Usamos Axios como pide el TP

const obtenerIdDeUrl = (url) => url.split('/').pop();

function SeccionDetallePersonaje({ idPersonajeInicial, alSeleccionarEpisodio }) {
  // Estados para el buscador y selección
  const [inputId, setInputId] = useState(idPersonajeInicial ?? '');
  const [idSeleccionado, setIdSeleccionado] = useState(idPersonajeInicial ?? '');
  
  // Estados para los datos
  const [detalle, setDetalle] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  
  // Estados de carga y error (Requisito del TP)
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Sincronizar si cambia el ID desde afuera (ej: desde la lista)
  useEffect(() => {
    if (!idPersonajeInicial) return;
    const normalizado = String(idPersonajeInicial);
    setInputId(normalizado);
    setIdSeleccionado(normalizado);
  }, [idPersonajeInicial]);

  // Petición a la API con Axios
  useEffect(() => {
    if (!idSeleccionado) return;

    let montado = true;
    setCargando(true);
    setError('');
    setDetalle(null);
    setEpisodios([]);

    // 1. Endpoint: Detalle del Personaje
    axios.get(`https://rickandmortyapi.com/api/character/${idSeleccionado}`)
      .then(res => {
        if (!montado) return;
        const datosPersonaje = res.data;
        setDetalle(datosPersonaje);

        // Sacamos los IDs de los episodios
        const idsEpisodios = (datosPersonaje.episode ?? []).map(obtenerIdDeUrl);
        if (idsEpisodios.length === 0) return;

        // 2. Endpoint: Lista de Episodios (usando la misma API pero otro recurso)
        return axios.get(`https://rickandmortyapi.com/api/episode/${idsEpisodios.join(',')}`);
      })
      .then(resEpisodios => {
        if (!montado || !resEpisodios) return;
        // La API devuelve un objeto si es uno solo, o un array si son varios
        const normalizado = Array.isArray(resEpisodios.data) ? resEpisodios.data : [resEpisodios.data];
        setEpisodios(normalizado);
      })
      .catch(err => {
        if (!montado) return;
        setError('No se pudo encontrar el personaje o sus episodios.');
        console.error(err);
      })
      .finally(() => {
        if (montado) setCargando(false);
      });

    return () => { montado = false; };
  }, [idSeleccionado]);

  const manejarBusqueda = () => {
    if (!inputId.trim()) return;
    setIdSeleccionado(inputId);
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Detalle del Personaje</h2>
          <p>Explora la información y los episodios de este personaje.</p>
        </div>
        <div className="field">
          <label htmlFor="characterId">ID del Personaje</label>
          <div className="field-row">
            <input
              id="characterId"
              type="number"
              min="1"
              value={inputId}
              onChange={e => setInputId(e.target.value)}
              placeholder="Ej: 1"
            />
            <button onClick={manejarBusqueda}>Buscar</button>
          </div>
        </div>
      </div>

      {/* Manejo de estados de carga y error */}
      {cargando && <p className="state">Cargando información del multiverso...</p>}
      {error && <p className="state error">{error}</p>}

      {detalle && (
        <div className="detail">
          <div className="detail-card">
            <img src={detalle.image} alt={detalle.name} />
            <div>
              <h3>{detalle.name}</h3>
              <p><strong>Estado:</strong> {detalle.status} - {detalle.species}</p>
              <p><strong>Género:</strong> {detalle.gender}</p>
              <p><strong>Origen:</strong> {detalle.origin?.name}</p>
              <p><strong>Ubicación actual:</strong> {detalle.location?.name}</p>
            </div>
          </div>

          <div className="detail-list">
            <h3>Lista de episodios donde aparece:</h3>
            <div className="episode-list">
              {episodios.map(episodio => (
                <button
                  key={episodio.id}
                  className="episode-card"
                  onClick={() => alSeleccionarEpisodio(episodio.id)}
                >
                  <span>{episodio.episode}</span>
                  <strong>{episodio.name}</strong>
                  <small>Estreno: {episodio.air_date}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SeccionDetallePersonaje;