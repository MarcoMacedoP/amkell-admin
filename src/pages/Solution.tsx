import * as React from "react";
import { useParams } from "react-router-dom";
import {
  useGetItemFromCollection,
  uploadPicture,
} from "../hooks/Firebase";
import { useEffect } from "react";

import { Button } from "../components/Button";
import { Editor } from "../components/Editor";
import { SlugEditor } from "../components/SlugEditor";
import { useForm } from "../hooks/Forms";
import { ImageUpload } from "../components/ImageUpload";

type SolutionProps = {};

type Solution = {
  id: string;
  name: string;
  slug: string;
  content: string;
  caption: string;
  miniature: string;
};
const initalValues = {
  name: "",
  miniature: "",
  slug: "",
  caption: "",
  content: "",
  id: "",
};
export const Solution: React.FC<SolutionProps> = () => {
  const { slug } = useParams();
  const [values, handleChange, setValues] = useForm<Solution>(
    initalValues
  );
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
  const handleSubmit = async () => {
    // const images = values.content.match(/src=".*"/gi)?.map((img) => {
    //   const parsedImage = img.replace("src=", "").replace('"', "");
    //   return parsedImage;
    // });
    //const images = Array.from(values.content.matchAll(/src=".*"/g));
    //debugger;
    //console.log(values);
    try {
      const miniaturePromise = uploadPicture(
        values.miniature,
        values.name
      );
      const [miniature] = await Promise.all([miniaturePromise]);
      const updatedValues = { ...values, miniature };
      await updateItem(values.id, updatedValues);
      alert("Cambios guardados");
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = () => setValues(initialData);
  const setMiniature = (images: string[]) =>
    setValues({ ...values, miniature: images[0] });

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
        <div>
          <p>Miniatura</p>
          <ImageUpload
            alt={values.name}
            onUpload={setMiniature}
            singleImage
            images={[values.miniature]}
          />
        </div>
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
          <Button
            onClick={handleCancel}
            className="w-1/2"
            text="Cancelar"
          />
        </div>
      </div>
    </>
  ) : (
    <p>error</p>
  );
};
