import React from "react";
import Imagen from "./Imagen";

// Definimos la interfaz
interface IListadoImagenesProps {
  imagenes: Array<JSON>;
}
const ListadoImagenes = ({ imagenes }: IListadoImagenesProps) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes.map((imagen: any) => {
        return <Imagen key={imagen.id} imagen={imagen} />;
      })}
    </div>
  );
};

export default ListadoImagenes;
