import React, { useState } from "react";
import Error from "./Error";

// Definimos la interfaz para los props
interface IFormularioProps {
  guardarBusqueda: Function;
}

const Formulario = ({ guardarBusqueda }: IFormularioProps) => {
  // Definimos el state de formulario
  const [termino, guardarTermino] = useState<string>("");
  const [error, guardarError] = useState<boolean>(false);

  // Definimos el método que se ejecuta cada vez que el usuairo escribe algo en el input
  const handledOnChange = (e: any) => {
    guardarTermino(e.target.value);
  };

  // Definimos el método que se ejecuta cada vez que hacemos submit del formulario
  const buscarImagenes = (e: any) => {
    e.preventDefault();

    // Validamos
    if (termino.trim() === "") {
      guardarError(true);
      return;
    }

    // Enviamos el término al componente principal
    guardarError(false);
    guardarBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen..."
            onChange={handledOnChange}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error ? <Error mensaje="Agrega un término de búsqueda" /> : null}
    </form>
  );
};

export default Formulario;
