import axios from "axios";
import { API_URL } from "../app.config.js";

export async function obtenerClientesPorPagina(consulta, page, tamañoPagina) {
  const urlBase = API_URL + "/clientesPageQuery";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${tamañoPagina}`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerClientes() {
  const urlBase = API_URL + "/clientes";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerCliente(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/cliente/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw error;
  }
}

export async function nuevoCliente(cliente) {
  try {
    if (cliente.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/cliente/${cliente.id}`,
        data: cliente,
      });
      return data;
    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/cliente`,
        data: cliente,
      });
      return data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function eliminarCliente(id) {
  const urlBase = API_URL + "/clienteEliminar";
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
