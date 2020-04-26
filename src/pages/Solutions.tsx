import * as React from "react";
import { Link } from "react-router-dom";

type SolutionsProps = {};

export const Solutions: React.FC<SolutionsProps> = ({ children }) => {
  return (
    <>
      <h1>Soluciones</h1>
      <p className="mt-4">
        Desde aquí se pueden editar las diferentes soluciones.
      </p>
      <section className="mt-8">
        <Link
          to="/soluciones/planeacion"
          className="bg-gray-200 w-64 block transform p-4 transition-transform duration-200 ease-in-out rounded-md hover:scale-105"
        >
          <p className="mb-1">
            <strong>Planeacion</strong>
          </p>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint,
            cumque.
          </p>
        </Link>
      </section>
    </>
  );
};
