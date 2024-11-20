import axios from "axios";
import { API_URL } from "../App.config";

export async function obtenerTiposServiciosPorPagina(consulta, page, tamañoPagina) {
  try {
    const urlBase = API_URL + "/tiposServiciosPageQuery";
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${tamañoPagina}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando tipos de servicios:", error);
    throw error;
  }
}

export async function obtenerTiposServicios() {
  try {
    const urlBase = API_URL + "/tiposServicios";
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando tipos de servicios:", error);
    throw error;
  }
}

export async function obtenerTipoServicio(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/tiposServicios/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar un tipo servicio", error);
    throw error;
  }
}

export async function nuevoTipoServicio(tipoServicio) {
  try {
    if (tipoServicio.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/tipoServicios/${tipoServicio.id}`,
        data: tipoServicio,
      });
      return data;
    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/tiposServicios`,
        data: tipoServicio,
      });
      return data;
    }
  } catch (error) {
     console.error(error);
    // if (e.response && e.response.status === 400) {
    //     //setMensaje('Error: Los datos proporcionados son inválidos');
    //     alert('Error: Los datos proporcionados son inválidos');
    // }
    // else {
    //     alert(e.response);
    //     alert(e.response.status);
    //     // setMensaje('Error al conectarse con el servidor');
    // }
    return null;
  }
}

export async function eliminarTipoServicio(id) {
  const urlBase = API_URL + "/tipoServicioEliminar";
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${urlBase}/${id}`,
    });
    return true;
  } catch (error) {
    console.error("Error eliminando tipo de servicio:", error);
    throw error;
  }
}
