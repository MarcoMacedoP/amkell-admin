import * as React from "react";
import { useGetDocument, uploadPicture } from "../hooks/Firebase";
import { useParams, useHistory } from "react-router-dom";
import { Loader } from "../components/Loader";
import { SlugEditor } from "../components/SlugEditor";
import { ImageUpload } from "../components/ImageUpload";
import { Button } from "../components/Button";

export const CarouselItem: React.FC<{}> = () => {
  const { id } = useParams();
  const [status, document] = useGetDocument<Carousel>(id, "Carosuel");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (document.data) {
      document.setData({
        ...document.data,
        [event.target.name]: event.target.value,
      });
    }
  }

  const history = useHistory();

  async function handleSubmit() {
    try {
      if (document.data && status) {
        status.setIsLoading && status.setIsLoading(true);
        const image = await uploadPicture(
          document.data.image,
          `carousel-${document.data.url}`
        );
        await document.updateDocument({
          ...document.data,
          image,
        });
      }
      alert("Documento actualizado");
      history.goBack();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
  function handleCancel() {
    history.goBack();
  }
  return status.isLoading ? (
    <Loader />
  ) : document.data ? (
    <div className="flex flex-col">
      <input
        type="text"
        value={document.data.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        value={document.data.buttonLabel}
        name="buttonLabel"
        onChange={handleChange}
      />
      <SlugEditor
        value={document.data.url}
        onChange={(event) =>
          document.data &&
          document.setData({
            ...document.data,
            url: event.target.value,
          })
        }
        label="Pagina a redireccionar cuando se presione el boton"
      />
      <ImageUpload
        alt="amkel"
        images={[document.data.image]}
        onUpload={(images) =>
          document.data &&
          document.setData({ ...document.data, image: images[0] })
        }
        singleImage
      />
      <div className="flex w-full">
        <Button
          onClick={handleSubmit}
          text="Guardar cambios"
          className="w-1/2"
          type="primary"
        />
        <Button
          onClick={handleCancel}
          text="Cancelar"
          className="ml-2 w-1/2"
        />
      </div>
    </div>
  ) : null;
};
