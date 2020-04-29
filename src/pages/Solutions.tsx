import * as React from "react";
import { useGetCollection } from "../hooks/Firebase";
import { LinkCard } from "../components/LinkCard";

type SolutionsProps = {};

export const Solutions: React.FC<SolutionsProps> = ({ children }) => {
  const [solutions, isLoading] = useGetCollection<Solution[]>("Soluciones");
  console.log(solutions);
  return (
    <>
      <h1>Soluciones</h1>
      <p className="mt-4">
        Desde aquí se pueden editar las diferentes soluciones.
      </p>
      <section className="mt-8 flex flex-wrap">
        {isLoading || !solutions ? (
          <p>Loading ...</p>
        ) : (
          solutions.map((solution) => (
            <div key={solution.slug} className="m-2 flex">
              <LinkCard
                desc={solution.caption}
                url={"/soluciones/" + solution.slug}
                title={solution.name}
              />
            </div>
          ))
        )}
      </section>
    </>
  );
};
