import React from "react";

// Interfaz para los props
interface IErrorProps {
  mensaje: string;
}

const Error = ({ mensaje }: IErrorProps) => {
  return (
    <p className="my-3 p-4 text-center alert alert-primary">
      {mensaje}
    </p>
  );
};

export default Error;
