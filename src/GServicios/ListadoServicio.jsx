import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGEN_EDIT, IMAGEN_DELETE, ITEMS_PER_PAGE } from "../app.config.js";
import { ServicioContext } from "./ServicioContext";
import {
  // eliminarServicio,
  obtenerServicios,
} from "../Services/ServicioService";
import { FormatearFecha } from "../utils/FormateadorDeFecha";

export default function ListadoServicio() {
  const { servicios, setServicios } = useContext(ServicioContext);
  const [consulta, setConsulta] = useState("");
  const [pagina, setPagina] = useState(0);
  const [tamañoPagina, setTamañoPagina] = useState(ITEMS_PER_PAGE);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [configuracion, setConfiguracion] = useState({
    key: null,
    direction: "ascending",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, [pagina, tamañoPagina, consulta]);

  const obtenerDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await obtenerServicios(consulta, pagina, tamañoPagina);
      setServicios(response.content);
      setTotalPaginas(response.totalPages);
      setCargando(false);
    } catch (err) {
      console.error("Error fetching items:", err);
      setCargando(false);
    }
  };

  const cambiarPagina = (newPage) => {
    if (newPage >= 0 && newPage < totalPaginas) {
      setPagina(newPage);
    }
  };

  const cambiarConsulta = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {

      //TODO - Implementar la eliminación del servicio
      alert("No se puede eliminar el servicio");
      // try {
      //   const eliminacionExitosa = await eliminarServicio(id);
      //   if (eliminacionExitosa) {
      //     obtenerDatos();
      //   } else {
      //     console.error("Error al eliminar servicio");
      //   }
      // } catch (error) {
      //   console.error("Error al eliminar la línea:", error);
      // }
    }
  };

  const filtrar = (key) => {
    let direction = "ascending";
    if (configuracion.key === key && configuracion.direction === "ascending") {
      direction = "descending";
    }
    setConfiguracion({ key, direction });
  };

  const listadoFiltrado = () => {
    const sorted = [...servicios];
    if (configuracion.key !== null) {
      sorted.sort((a, b) => {
        if (a[configuracion.key] < b[configuracion.key]) {
          return configuracion.direction === "ascending" ? -1 : 1;
        }
        if (a[configuracion.key] > b[configuracion.key]) {
          return configuracion.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de Servicios</h1>
        <hr />
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control"
            type="search"
            placeholder="Buscar servicio"
            value={consulta}
            onChange={cambiarConsulta}
          />
        </div>
        <div className="col-1">
          <button
            onClick={() => obtenerDatos()}
            className="btn btn-outline-success"
          >
            Buscar
          </button>
        </div>
      </div>
      <hr />

      {cargando ? (
        <div className="text-center">Cargando...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th scope="col" onClick={() => filtrar("id")}>
                  #
                  {configuracion.key === "id" && (
                    <span>
                      {configuracion.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>

                <th scope="col" onClick={() => filtrar("cliente")}>
                  Cliente
                  {configuracion.key === "cliente" && (
                    <span>
                      {configuracion.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col" onClick={() => filtrar("fecha")}>
                  Fecha
                  {configuracion.key === "fecha" && (
                    <span>
                      {configuracion.direction === "ascending" ? " 🔽" : " 🔼"}
                    </span>
                  )}
                </th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listadoFiltrado().map((servicio, indice) => (
                <tr key={indice}>
                  <th scope="row">{servicio.id}</th>
                  <td>{servicio.clienteRazonSocial}</td>
                  <td>{FormatearFecha(servicio.fechaDocumento)}</td>
                  <td className="text-center">
                    <div>
                      <button
                        onClick={() => alert("No se puede editar el servicio")}
                        className="btn btn-link btn-sm me-3"
                      >
                        <img
                          src={IMAGEN_EDIT}
                          style={{ width: "20px", height: "20px" }}
                        />
                        Editar
                      </button>
                      <button
                        onClick={() => eliminar(servicio.id)}
                        className="btn btn-link btn-sm me-3"
                      >
                        <img
                          src={IMAGEN_DELETE}
                          style={{ width: "20px", height: "20px" }}
                        />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="d-md-flex justify-content-md-end">
            <button
              className="btn btn-outline-primary me-2"
              disabled={pagina === 0}
              onClick={() => cambiarPagina(pagina - 1)}
            >
              Anterior
            </button>
            <button
              className="btn btn-outline-primary"
              disabled={pagina >= totalPaginas - 1}
              onClick={() => cambiarPagina(pagina + 1)}
            >
              Siguiente
            </button>
          </div>

          <div className="row d-md-flex justify-content-md-end mt-3">
            <div className="col-4">
              <Link to={`/servicio`} className="btn btn-success btn-sm">
                Nuevo
              </Link>
            </div>
            <div className="col-4">
              <Link to={`/`} className="btn btn-info btn-sm">
                Regresar
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
