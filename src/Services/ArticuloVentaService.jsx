import axios from "axios";
import { API_URL } from "../App.config";

const urlBase = API_URL + "/articulosPageQuery";
export async function obtenerArticulosVenta(consulta, page, pageSize) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${pageSize}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando articulos:", error);
    throw error;
  }
}

export async function obtenerArticuloVenta(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/articulos/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar una articulo:", error);
    throw error;
  }
}

export async function newArticuloVenta(model) {
  try {
    if (model.id > 0) {
      window.alert("entra por el put");
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/articulos/${model.id}`,
        data: model,
      });
    } else {
      window.alert("entra por el post");
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/articulos`,
        data: model,
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarArticulosVenta(id) {
  const urlBase = API_URL + "/articulosEliminar";
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${urlBase}/${id}`,
    });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
