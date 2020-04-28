/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "../hooks/Forms";
import { Material as MaterialInterface } from "../types/materials";
import { useGetItemFromCollection } from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { Editor } from "../components/Editor";
import { SlugEditor } from "../components/SlugEditor";
import { Button } from "../components/Button";

type MaterialProps = {};
const initialValues: MaterialInterface & { id: string } = {
  caption: "",
  desc: "",
  images: [],
  name: "",
  slug: "",
  id: "",
};
export const Material: React.FC<MaterialProps> = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [values, handleChange, setValues] = useForm(initialValues);
  const [status, collection] = useGetItemFromCollection({
    collection: "Materiales",
    query: {
      key: "slug",
      operator: "==",
      value: slug,
    },
    setData: setValues,
  });

  React.useEffect(() => {
    collection.getCollectionData();
  }, []);

  const setDesc = (desc: string) => setValues({ ...values, desc });
  const handleSubmit = async () => {
    await collection.updateItem(values.id, values);
    history.goBack();
  };
  const handleCancel = () => {
    setValues(status.initialData);
    history.goBack();
  };
  return status.isLoading ? (
    <Loader />
  ) : !status.error ? (
    <>
      <div>
        <div className="flex flex-col mb-48">
          <input
            className="text-xl font-medium"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          <textarea
            className="mb-4"
            name="caption"
            id=""
            onChange={handleChange}
            value={values.caption}
          />

          <div className="">
            <Editor
              value={values.desc}
              onChange={setDesc}
              canAddImage={false}
            />
          </div>
          <SlugEditor
            label="Url del material"
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
      </div>
    </>
  ) : (
    <p>Error</p>
  );
};
