import * as React from "react";
import { useGetCollection } from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";

type MaterialsProps = {};

export const Materials: React.FC<MaterialsProps> = () => {
  const [materials, isLoading] = useGetCollection("Materiales");
  const history = useHistory();
  const goToAddMaterials = () => history.push("/materiales/agregar");
  return isLoading || !materials ? (
    <Loader />
  ) : (
    <>
      <div className="mb-8">
        <h1>Materiales</h1>
        <p>Aqui se muestra un listado de todos los materiales existentes. </p>
        <div className="w-1/3 mt-4">
          <Button
            text="Agregar material"
            className="p-2"
            onClick={goToAddMaterials}
            type="primary"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {materials.map((material: any) => (
          <div className="m-2" key={material.slug}>
            <LinkCard
              title={material.name}
              desc={material.caption}
              url={`/materiales/${material.slug}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};
