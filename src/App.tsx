import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  // Definimos el state
  const [busqueda, guardarBusqueda] = useState<string>("");
  const [imagenes, guardarImagenes] = useState<Array<JSON>>([]);
  const [paginaActual, guardarPaginaActual] = useState<number>(1);
  const [totalPaginas, guardarTotalPaginas] = useState<number>(1);

  // Método que se ejecuta cada vez que cambia la dependencia de búsqueda o cuando carga el componente
  useEffect(() => {
    const consultarAPI = async () => {
      // Evitamos que se ejecute cuando se carga por primera vez el componente
      if (busqueda === "") return;

      const imagenesPorPagina: number = 30;
      const key: string = "18127956-4ec3528366f70ed64b203a18d";
      const url: string = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const resultado = await (await fetch(url)).json();
      guardarImagenes(resultado.hits);

      // Calcular el total de páginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron?.scrollIntoView({behavior: 'smooth'});
    };
    consultarAPI();
  }, [busqueda, paginaActual]);

  // Definimos el método para irnos atrás en la paginación
  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  // Definimos el método para irnos hacia delante en la paginación
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button className="bbtn btn-info mr-1" onClick={paginaAnterior}>
            &laquo; Anterior
          </button>
        )}
        {paginaActual === totalPaginas ? null : (
          <button className="bbtn btn-info" onClick={paginaSiguiente}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
