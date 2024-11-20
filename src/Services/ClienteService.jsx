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
  
  //HACK para registrar el cliente
  //TODO - Cambiar la fecha de inicio y fecha de nacimiento
  const dataCliente = {
    ...cliente,
    contacto:cliente.razonSocial,
    fechaInicio:"2024-11-20T00:00:00.000+00:00",
    fechaNacimiento: "2024-11-20T00:00:00.000+00:00",
    letra: "A",
  }

  try {
    if (cliente.id > 0) {
      const { data } = await axios({
        method: "PUT",
        url: `${API_URL}/clientes/${cliente.id}`,
        data: dataCliente,
      });
      return data;
    } else {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/clientes`,
        data: dataCliente,
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
