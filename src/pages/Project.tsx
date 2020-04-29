import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { SlugEditor } from "../components/SlugEditor";
import { project } from "../types/projects";
import { useForm } from "../hooks/Forms";
import { useGetItemFromCollection } from "../hooks/Firebase";
import { ImageUpload } from "../components/ImageUpload";
import { Button } from "../components/Button";

type ProjectProps = {};

export const Project: React.FC<ProjectProps> = () => {
  const { slug } = useParams();
  const [values, handleChange, setValues] = useForm<project>({
    desc: "",
    id: "",
    image: "",
    name: "",
    slug: "",
  });
  const [status, collection] = useGetItemFromCollection({
    collection: "Proyectos",
    query: {
      key: "slug",
      operator: "==",
      value: slug,
    },
    setData: setValues,
  });
  React.useEffect(() => {
    collection.getCollectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { goBack } = useHistory();
  const setImage = (images: string[]) =>
    setValues({ ...values, image: images[0] });

  const handleSubmit = () => {
    collection.updateItem(values.id, values);
    goBack();
  };

  const handleCancel = () => {
    setValues(status.initialData);
    goBack();
  };

  return status.isLoading ? (
    <p>Loading...</p>
  ) : !status.error ? (
    <>
      <div className="flex flex-col mb-48 ">
        <input
          className="text-xl font-medium"
          value={values.name}
          name="name"
          onChange={handleChange}
        />
        <textarea
          className="h-32 mb-8"
          name="desc"
          id=""
          onChange={handleChange}
          value={values.desc}
        />
        <ImageUpload
          images={[values.image]}
          onDelete={setImage}
          onUpload={setImage}
          alt={values.name}
        />

        <SlugEditor
          label="Url de la seccion"
          onChange={handleChange}
          value={values.slug}
        />
        <div className="flex w-full h-12">
          <Button
            onClick={handleSubmit}
            className="w-1/2 mr-4"
            text="Guardar cambios"
            type="primary"
          />
          <Button onClick={handleCancel} className="w-1/2" text="Cancelar" />
        </div>
      </div>
    </>
  ) : (
    <p>error</p>
  );
};
