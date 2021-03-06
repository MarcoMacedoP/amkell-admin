import * as React from "react";

type SlugEditorProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
};

export const SlugEditor: React.FC<SlugEditorProps> = ({
  onChange,
  value,
  label,
}) => {
  return (
    <div className=" mt-8 bg-gray-100 p-2">
      <label htmlFor="slug" className="font-medium p-1 block">
        {label}
      </label>
      <input
        className="input"
        type="text"
        value={value}
        id="slug"
        onChange={onChange}
        name="slug"
      />
      <p className="block  bg-gray-300 text-gray-600 p-2 rounded-md">
        Este url es usado para mostrarse sobre acceder directamente al
        contenido. Debe de mantenerse corto para optimizar el posicionamiento en
        buscadores.
      </p>
    </div>
  );
};
