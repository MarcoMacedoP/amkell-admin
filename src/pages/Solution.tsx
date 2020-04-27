import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetItemFromCollection } from "../hooks/Firebase";
import { useState, useEffect } from "react";
import Editor from "@ckeditor/ckeditor5-react";

import { Button } from "../components/Button";
// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph],
  toolbar: ["bold", "italic"],
};

type SolutionProps = {};

type Solution = {
  id: string;
  name: string;
  slug: string;
  content: string;
  caption: string;
};

export const Solution: React.FC<SolutionProps> = () => {
  const { slug } = useParams();

  const [solution, isLoading, , { updateItem }] = useGetItemFromCollection(
    "Soluciones",
    {
      key: "slug",
      operator: "==",
      value: slug,
    }
  );
  const [values, setValues] = useState<Solution>({
    name: "",
    slug: "",
    caption: "",
    content: "",
    id: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setValues(solution);
    }
  }, [solution, isLoading]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const setContent = (content: string) => {
    setValues({
      ...values,
      content,
    });
  };
  const handleSubmit = () => {
    updateItem(values.id, values);
  };

  const handleCancel = () => setValues(solution);

  return isLoading ? (
    <p>Loading...</p>
  ) : values?.id ? (
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
          <Editor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={values.content}
            onChange={(event: any, editor: any) => setContent(editor.getData())}
          />
        </div>
        <div className=" mt-8 bg-gray-100 p-2">
          <label htmlFor="slug" className="font-medium p-1 block">
            Url de la sección
          </label>
          <input
            className="block border-2 bg-transparent border-gray-300 rounded-md py-1 px-2 mb-4 transition-colors duration-300 focus:border-blue-500 active:border-blue-500"
            type="text"
            value={values.slug}
            id="slug"
            onChange={handleChange}
            name="slug"
          />
          <p className="block  bg-gray-300 text-gray-600 p-2 rounded-md">
            Este url es usado para mostrarse sobre acceder directamente al
            contenido. Debe de mantenerse corto para optimizar el
            posicionamiento en buscadores.
          </p>
        </div>
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
