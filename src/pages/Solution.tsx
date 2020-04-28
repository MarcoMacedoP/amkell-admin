import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetItemFromCollection } from "../hooks/Firebase";
import { useEffect } from "react";

import { Button } from "../components/Button";
import { Editor } from "../components/Editor";
import { SlugEditor } from "../components/SlugEditor";
import { useForm } from "../hooks/Forms";

type SolutionProps = {};

type Solution = {
  id: string;
  name: string;
  slug: string;
  content: string;
  caption: string;
};
const initalValues = {
  name: "",
  slug: "",
  caption: "",
  content: "",
  id: "",
};
export const Solution: React.FC<SolutionProps> = () => {
  const { slug } = useParams();
  const [values, handleChange, setValues] = useForm<Solution>(initalValues);
  const [
    { isLoading, initialData, error },
    { updateItem, getCollectionData },
  ] = useGetItemFromCollection({
    collection: "Soluciones",
    query: {
      key: "slug",
      operator: "==",
      value: slug,
    },
    setData: setValues,
  });
  useEffect(() => {
    getCollectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setContent = (content: string) => {
    setValues({
      ...values,
      content,
    });
  };
  const handleSubmit = () => {
    console.log(values);
    updateItem(values.id, values);
  };

  const handleCancel = () => setValues(initialData);

  return isLoading ? (
    <p>Loading...</p>
  ) : !error ? (
    <>
      <div className="flex flex-col mb-48">
        <input
          className="text-xl font-medium"
          value={values.name}
          name="name"
          onChange={handleChange}
        />
        <textarea
          name="caption"
          id=""
          onChange={handleChange}
          value={values.caption}
        />

        <div className="">
          <Editor value={values.content} onChange={setContent} />
        </div>
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
