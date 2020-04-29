/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useGetCollection, useGetItemFromCollection } from "../hooks/Firebase";
import { LinkCard } from "../components/LinkCard";
import { useForm } from "../hooks/Forms";
import { Loader } from "../components/Loader";
import { Input } from "../components/Input";
import { ImageUpload } from "../components/ImageUpload";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";

type SolutionsProps = {};
interface SolutionsInfo {
  desc: string;
  image: string;
  title: string;
  id: string;
}
export const Solutions: React.FC<SolutionsProps> = ({ children }) => {
  const [solutions, isLoading] = useGetCollection<Solution[]>("Soluciones");
  const [solutionsInfo, handleChange, setSolutionsInfo] = useForm<
    SolutionsInfo
  >({
    id: "",
    desc: "",
    image: "",
    title: "",
  });
  const [
    solutionsInfoStatus,
    solutionsPageCollection,
  ] = useGetItemFromCollection({
    collection: "SolucionesPage",
    query: {
      key: "type",
      operator: "==",
      value: "main",
    },
    setData: setSolutionsInfo,
  });
  React.useEffect(() => {
    solutionsPageCollection.getCollectionData();
  }, []);

  async function handleSubmit() {
    await solutionsPageCollection.updateItem(solutionsInfo.id, solutionsInfo);
    alert("Informacion de soluciones actualizada");
  }
  function handleCancel() {
    setSolutionsInfo(solutionsInfoStatus.initialData);
  }

  return isLoading || solutionsInfoStatus.isLoading ? (
    <Loader />
  ) : (
    solutions && (
      <>
        <h1>Soluciones</h1>
        <p className="mb-4">Datos de la página soluciones</p>

        <Input
          label="Titulo"
          name="title"
          onChange={handleChange}
          value={solutionsInfo.title}
        />
        <textarea
          name="desc"
          className="input w-full h-32"
          value={solutionsInfo.desc}
          onChange={handleChange}
        />
        <ImageUpload
          images={[solutionsInfo.image]}
          singleImage
          alt="Amkell"
          onUpload={([image]) => setSolutionsInfo({ ...solutionsInfo, image })}
        />
        <div className="flex w-full">
          <Button
            onClick={handleSubmit}
            text="Guardar"
            type="primary"
            className="mr-2"
          />
          <Button onClick={handleCancel} text="Cancelar" />
        </div>
        <p className="mt-4">
          Desde aquí se pueden editar las diferentes soluciones.
        </p>
        <section className="mt-8 flex flex-wrap">
          {solutions.map((solution) => (
            <div key={solution.slug} className="m-2 flex">
              <LinkCard
                desc={solution.caption}
                url={"/soluciones/" + solution.slug}
                title={solution.name}
              />
            </div>
          ))}
        </section>
      </>
    )
  );
};
