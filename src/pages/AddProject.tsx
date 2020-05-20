import * as React from "react";
import { project } from "../types/projects";
import { useForm } from "../hooks/Forms";
import {
  useAddItemToCollection,
  uploadPicture,
} from "../hooks/Firebase";
import { useHistory } from "react-router-dom";
import { Input } from "../components/Input";
import { ImageUpload } from "../components/ImageUpload";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";
import { SlugEditor } from "../components/SlugEditor";

type AddProjectProps = {};
const initialFormState: project = {
  desc: "",
  id: "",
  image: "",
  name: "",
  slug: "",
};

export const AddProject: React.FC<AddProjectProps> = () => {
  const [values, handleChange, setValues] = useForm(initialFormState);
  const [isLoadingImages, setIsLoadingImages] = React.useState(false);
  const [addItem, { isLoading }] = useAddItemToCollection<project>(
    "Proyectos",
    values
  );
  const { goBack } = useHistory();

  async function handleSubmit() {
    const { desc, image, name } = values;
    if (!desc || !image || !name) {
      alert("Por favor rellene todos los campos");
    } else {
      setIsLoadingImages(true);
      try {
        const imageUrl = await uploadPicture(
          image,
          `project-${encodeURI(name)}`
        );
        await addItem({ ...values, image: imageUrl });
        setIsLoadingImages(false);
        alert("Proyecto agregado");
        goBack();
      } catch (error) {
        setIsLoadingImages(false);
        alert(error);
      }
    }
  }
  function setDesc(desc: string) {
    setValues({ ...values, desc });
  }
  function setImage(images: string[]) {
    setValues({ ...values, image: images[0] });
  }

  return isLoadingImages || isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Agregar Proyecto</h1>
      <div className="lg:w-2/3 mt-2">
        <Input
          name="name"
          value={values.name}
          label="Nombre del proyecto"
          onChange={handleChange}
        />
        <div className="w-full">
          <label htmlFor="desc">Descripcion del proyecto</label>
          <textarea
            value={values.desc}
            className="input w-full"
            id="desc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <ImageUpload
          onDelete={setImage}
          onUpload={setImage}
          singleImage
          images={[values.image]}
          alt={values.name}
        />
        <SlugEditor
          onChange={handleChange}
          value={values.slug}
          label="Url del proyecto"
        />
        <div className="w-full flex mt-4">
          <Button
            onClick={handleSubmit}
            text="Agregar proyecto"
            type="primary"
            className="mr-2"
          />
          <Button onClick={goBack} text="Cancelar" />
        </div>
      </div>
    </div>
  );
};
