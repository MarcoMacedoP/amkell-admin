import * as React from "react";

type LoaderProps = {};

export const Loader: React.FC<LoaderProps> = () => {
  return <div className="loader bg-red w-64 h-64"> Cargando...</div>;
};
