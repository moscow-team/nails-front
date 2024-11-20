
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nuevoServicio, obtenerServicio } from "../Services/ServicioService";
import { obtenerClientes } from "../Services/ClienteService";
import { obtenerTiposServicios } from "../Services/TipoServicioService";
import { FormetearPrecio } from "../utils/FormateadorDePrecio";
import PropTypes from 'prop-types';
Servicio.propTypes = {
  title: PropTypes.string.isRequired,
};
export default function Servicio({ title }) {
  let navegacion = useNavigate();
  const { id } = useParams();

  const [servicio, setServicio] = useState({
    denominacion: "",
  });
  const [listaClientes, setListaClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  //TODO: VERIFICAR EL FORMATO DE LA FECHA
  const [fecha, setFecha] = useState(new Date());
  const [tiposServicio, setTiposServicio] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [total, setTotal] = useState(0); // Estado para el total
  const [errores, setErrores] = useState({
    fecha: "",
    cliente: "",
    servicios: Array(servicios.length).fill({ tipoServicio: "", precio: "" }),
  });

  useEffect(() => {
    cargarModel();
    cargarClientes();
    cargarTipoServicios();
  }, []);

  // Calcular el total cada vez que cambie la lista de servicios
  useEffect(() => {
    const nuevoTotal = servicios.reduce(
      (acc, servicio) => acc + (parseFloat(servicio.precio) || 0),
      0,
    );
    setTotal(nuevoTotal);
  }, [servicios]);

  // const cargarModel2 = async () => {
  //   if (id > 0) {
  //     const resultado = await obtenerServicio(id);
  //     setServicio(resultado);
  //     setSelectedCliente(resultado.cliente.id); // Establecer el cliente seleccionado
  //     setFecha(new Date(resultado.fechaDocumento).toISOString().split("T")[0]); // Establecer la fecha
  //     setServicios(resultado.listaItems); // Establecer los item servicios cargados
  //   }
  // };
  const cargarModel = async () => {
    if (id > 0) {
      const resultado = await obtenerServicio(id);
      setServicio(resultado);
      setSelectedCliente(String(resultado.cliente.id)); // Convertir a string
      setFecha(new Date());
      setServicios(resultado.listaItems);
    }
  };

  const cargarClientes = async () => {
    const resultado = await obtenerClientes();
    setListaClientes(resultado);
  };

  const cargarTipoServicios = async () => {
    const resultado = await obtenerTiposServicios();
    setTiposServicio(resultado);
  };

  const agregarServicio = () => {
    setServicios([
      ...servicios,
      { tipoServicio: "", precio: "", observaciones: "" },
    ]);
  };

  const removerServicio = (index) => {
    const newServicios = [...servicios];
    newServicios.splice(index, 1);
    setServicios(newServicios);
  };

  // const handleServicioChangeBoorar = (index, event) => {
  //   const { name, value } = event.target;
  //   const newServicios = [...servicios];
  //   newServicios[index] = { ...newServicios[index], [name]: value };
  //   setServicios(newServicios);
  // };

  const cambiarServicio = (index, event) => {
    const { name, value } = event.target;
    const newServicios = [...servicios];

    if (name === "tipoServicio") {
      const tipoServicioSeleccionado = tiposServicio.find(
        (tipo) => tipo.id === parseInt(value),
      );
      newServicios[index] = {
        ...newServicios[index],
        tipoServicioId: tipoServicioSeleccionado.id,
        tipoServicio: tipoServicioSeleccionado.denominacion,
      };
    } else {
      newServicios[index] = { ...newServicios[index], [name]: value };
    }
    setServicios(newServicios);
  };

  const registrar = async (e) => {
    e.preventDefault();
    const fechaActual = new Date();
    const fechaSeleccionada = new Date (fecha);

    if ( fechaSeleccionada < fechaActual) {
      setErrores((prevErrors) => ({
        ...prevErrors,
        fecha: "La fecha no puede ser menor a la actual",
      }));
      return;
    } else {
      setErrores((prevErrors) => ({ ...prevErrors, fecha: "" }));
    }

    if (!selectedCliente) {
      setErrores((prevErrors) => ({
        ...prevErrors,
        cliente: "Debe seleccionar un cliente",
      }));
      return;
    } else {
      setErrores((prevErrors) => ({ ...prevErrors, cliente: "" }));
    }

    const newServiciosErrors = servicios.map((item) => {
      const itemErrors = {};
      if (!item.tipoServicio)
        itemErrors.tipoServicio = "Debe seleccionar un tipo de servicio";
      if (!item.precio) itemErrors.precio = "Debe ingresar un precio";
      return itemErrors;
    });

    if (newServiciosErrors.some((item) => Object.keys(item).length !== 0)) {
      setErrores((prevErrors) => ({
        ...prevErrors,
        servicios: newServiciosErrors,
      }));
      return;
    } else {
      setErrores((prevErrors) => ({
        ...prevErrors,
        servicios: Array(servicios.length).fill({
          tipoServicio: "",
          precio: "",
        }),
      }));
    }

    const data = {
      ...servicio,
      fechaDocumento: fechaSeleccionada,
      cliente: +  selectedCliente,
      total: total,
      listaItems: servicios.map((item) => ({
        ...item,
        tipoServicioId: item.tipoServicioId,
      })),
    };
    await nuevoServicio(data);
    navegacion("/servicioList");
  };

  return (
    <div className="container">
      <div>
      <h1>Gestión de servicio / {title}</h1>
      <hr />
      </div>

      <form onSubmit={registrar}>
      <div className="mb-3">
        <div>
        <label htmlFor="listaClientes">Selecciona un cliente: </label>
        <br />
        <select
          id="listaClientes"
          value={selectedCliente}
          onChange={(e) => setSelectedCliente(e.target.value)}
        >
          <option value="">Seleccione...</option>
          {listaClientes.map((cliente) => (
          <option key={cliente.id} value={String(cliente.id)}>
            {cliente.razonSocial}
          </option>
          ))}
        </select>
        {errores.cliente && <div className="error">{errores.cliente}</div>}
        </div>

        <div>
        <label htmlFor="fecha">Fecha: </label>
        <br />
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        {errores.fecha && <div className="error">{errores.fecha}</div>}
        </div>
      </div>

      <label>Detalle del Servicio:</label>
      <hr />

      <table className="table table-responsive table-striped">
        <thead className="thead-dark">
        <tr>
          <th>Tipo de Servicio</th>
          <th>Precio</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {servicios.map((servicio, index) => (
          <tr key={index}>
          <td>
            <select
            name="tipoServicio"
            value={servicio.tipoServicioId || ""}
            onChange={(e) => cambiarServicio(index, e)}
            >
            <option value="">Seleccione un tipo de servicio</option>
            {tiposServicio.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
              {tipo.denominacion}
              </option>
            ))}
            </select>
            {errores.servicios[index]?.tipoServicio && (
            <div className="error">
              {errores.servicios[index].tipoServicio}
            </div>
            )}
          </td>
          <td>
            <input
            type="number"
            name="precio"
            value={servicio.precio}
            onChange={(e) => cambiarServicio(index, e)}
            />
            {errores.servicios[index]?.precio && (
            <div className="error">{errores.servicios[index].precio}</div>
            )}
          </td>
          <td>
            <input
            type="text"
            name="observaciones"
            value={servicio.observaciones}
            onChange={(e) => cambiarServicio(index, e)}
            />
          </td>
          <td>
            <button type="button" onClick={() => removerServicio(index)}>
            Eliminar
            </button>
          </td>
          </tr>
        ))}
        </tbody>
      </table>

      <button type="button" onClick={agregarServicio}>
        Agregar Servicio
      </button>

      <div>
        <h4>Total: {FormetearPrecio(total)}</h4>
      </div>

      <button type="submit">Guardar</button>
      </form>
    </div>
    );
}
