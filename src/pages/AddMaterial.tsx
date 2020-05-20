import * as React from "react";
import { useForm } from "../hooks/Forms";
import { SlugEditor } from "../components/SlugEditor";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { Editor } from "../components/Editor";
import ImageUploader from "react-images-upload";
import {
  useAddItemToCollection,
  uploadPicture,
} from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { Material } from "../types/materials";
import { Input } from "../components/Input";

type AddMaterialProps = {};

const intialFormState: Material = {
  name: "",
  slug: "",
  desc: "",
  caption: "",
  images: [],
};
export const AddMaterial: React.FC<AddMaterialProps> = () => {
  const [values, handleChange, setValues] = useForm(intialFormState);
  const history = useHistory();
  const [addItem, { isLoading }] = useAddItemToCollection(
    "Materiales",
    values
  );
  const [isLoadingImages, setIsLoadingImages] = React.useState(false);
  async function handleSubmit() {
    const { name, desc, slug, images } = values;
    if (!name || !desc || !slug || images.length === 0) {
      alert("Por favor, rellena todos los campos.");
    } else {
      try {
        setIsLoadingImages(true);
        const images = await Promise.all(
          values.images.map((img, index) =>
            uploadPicture(img, `${slug}-${index}`)
          )
        );
        await addItem({ ...values, images });
        setIsLoadingImages(false);
        alert("Documento guardado");
        history.goBack();
      } catch (e) {
        setIsLoadingImages(false);
        console.error(e);
        alert(e);
      }
    }
  }

  function onCancel() {
    history.goBack();
  }
  function setDesc(desc: string) {
    setValues({ ...values, desc });
  }
  function handleImageUpload(files: File[], images: string[]) {
    setValues({ ...values, images });
  }
  return isLoading || isLoadingImages ? (
    <Loader />
  ) : (
    <div className="mb-16">
      <h1 className="mb-4"> Agregar un material. </h1>

      <div className="lg:w-2/3">
        <Input
          name="name"
          label="Nombre del material"
          value={values.name}
          onChange={handleChange}
        />
        <Input
          name="caption"
          label="Descripcion corta"
          value={values.caption}
          onChange={handleChange}
        />
        <div>
          <p className="mb-2">Descripcion del material.</p>
          <Editor
            canAddImage={false}
            value={values.desc}
            onChange={setDesc}
          />
        </div>
        <div className="my-2">
          <p>Galeria de imagenes</p>
          <p className="text-gray-400 text-sm mb-4">
            La primera imagen sera usada como imagen principal y las
            se demas se mostraran en la galería.{" "}
          </p>
          <div className="flex flex-wrap">
            {values.images.length > 0 &&
              values.images.map((img, index) => (
                <img
                  key={index}
                  className="animation-init w-1/3 object-contain object-center"
                  src={img}
                  alt={values.name}
                />
              ))}
          </div>
          <ImageUploader
            name="images"
            buttonText="Agregar imagenes"
            imgExtension={[".jpg", ".png"]}
            buttonClassName="bg-blue-500"
            maxFileSize={1048487}
            onChange={handleImageUpload}
          />
        </div>
        <SlugEditor
          label="Url del material"
          onChange={handleChange}
          value={values.slug}
        />
        <div className="flex">
          <Button
            onClick={handleSubmit}
            type="primary"
            text="Agregar material"
            className="p-2 mt-4 w-1/3 mr-4"
          />
          <Button
            onClick={onCancel}
            text="Cancelar"
            className="p-2 mt-4 w-1/3"
          />
        </div>
      </div>
    </div>
  );
};
