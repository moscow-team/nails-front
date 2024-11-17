import React, { createContext, useState } from "react";

export const ArticuloVentaContext = createContext();
import PropTypes from 'prop-types';
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

const ArticuloVentaProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);

  return (
    <ArticuloVentaContext.Provider value={{ articulos, setArticulos }}>
      {children}
    </ArticuloVentaContext.Provider>
  );
};

export default ArticuloVentaProvider;
