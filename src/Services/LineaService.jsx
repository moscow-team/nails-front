import axios from "axios";
import { API_URL } from "../App.config";

export async function obtenerLineas(consulta, page, pageSize) {
  const urlBase = API_URL + "/lineasPageQuery";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${pageSize}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw error;
  }
}

export async function obtenerLineas2() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/lineas`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw error;
  }
}

export async function obtenerLinea(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/linea/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar una linea:", error);
    throw error;
  }
}

export async function newLinea(linea) {
  try {
    if (linea.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/linea/${linea.id}`,
        data: linea,
      });
      return data;

    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/linea`,
        data: linea,
      });
      return data;

    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarLineas(id) {
  const urlBase = API_URL + "/lineaEliminar";
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${urlBase}/${id}`,
    });
    return true;
  } catch (error) {
    console.error(error);
  }
}
