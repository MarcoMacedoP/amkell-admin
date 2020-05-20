/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  useGetItemFromCollection,
  uploadPicture,
} from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { useForm } from "../hooks/Forms";
import { Input } from "../components/Input";
import { ImageUpload } from "../components/ImageUpload";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";

type AboutProps = {};
const intialFormState: About = {
  alliances: "",
  clients: "",
  continents: "",
  desc: "",
  logos: [],
  materials: "",
  team_photo: "",
  years_photo: "",
  id: "",
};

export const About: React.FC<AboutProps> = () => {
  const [data, handleChange, setData] = useForm<About>(
    intialFormState
  );
  const { goBack } = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, collection] = useGetItemFromCollection({
    collection: "Nosotros",
    query: {
      key: "type",
      operator: "==",
      value: "main",
    },
    setData,
  });
  React.useEffect(() => {
    collection.getCollectionData();
  }, []);
  const setLogos = (logos: string[]) => setData({ ...data, logos });
  async function handleSubmit() {
    const { alliances, clients, continents, desc, materials } = data;
    if (
      !alliances ||
      !clients ||
      !continents ||
      !desc ||
      !materials
    ) {
      alert("Favor de llenar todos los campos.");
    } else {
      setIsLoading(true);
      try {
        const logosPromise = Promise.all(
          data.logos.map((img, index) =>
            uploadPicture(img, `about-logo-${index}`)
          )
        );
        const [logos, team_photo, years_photo] = await Promise.all([
          logosPromise,
          uploadPicture(data.team_photo, `about-team`),
          uploadPicture(data.years_photo, "about-years"),
        ]);
        await collection.updateItem(data.id, {
          ...data,
          logos,
          team_photo,
          years_photo,
        });
        setIsLoading(false);
        alert("Cambios guardados");
      } catch (error) {
        setIsLoading(false);
        alert("Error" + error);
      }
    }
  }
  function handleCancel() {
    setData(status.initialData);
    goBack();
  }
  const setTeamPhoto = (images: string[]) => {
    console.log(images);
    setData({ ...data, team_photo: images[images.length - 1] });
  };
  const setYearsPhoto = (images: string[]) =>
    setData({ ...data, years_photo: images[images.length - 1] });

  return status.isLoading || isLoading ? (
    <Loader />
  ) : (
    data && (
      <div>
        <h1>Nosotros </h1>
        <textarea
          name="desc"
          className="input w-full h-48 mb-12"
          onChange={handleChange}
          value={data.desc}
        />
        <div className="flex flex-wrap w-full justify-around">
          <Input
            label="Numero de materiales"
            name="materials"
            onChange={handleChange}
            value={data.materials}
          />
          <Input
            label="Número de clientes"
            name="clients"
            value={data.clients}
            onChange={handleChange}
          />
          <Input
            label="Alianzas comerciales"
            name="alliances"
            value={data.alliances}
            onChange={handleChange}
          />
          <Input
            label="Continentes"
            value={data.continents}
            name="continents"
            onChange={handleChange}
          />
        </div>

        <div>
          <p>
            <strong>Fotografía del equipo</strong>
          </p>
          <ImageUpload
            alt=""
            images={[data.team_photo]}
            onDelete={setTeamPhoto}
            onUpload={setTeamPhoto}
            singleImage
          />
        </div>
        <div>
          <p>
            <strong>Fotografía número de años</strong>
          </p>
          <ImageUpload
            alt=""
            images={[data.years_photo]}
            onDelete={setYearsPhoto}
            singleImage
            onUpload={setYearsPhoto}
          />
        </div>
        <div>
          <p>
            <strong>Logos de empresas</strong>
          </p>
          <ImageUpload
            alt=""
            images={data.logos}
            onDelete={setLogos}
            onUpload={setLogos}
          />
        </div>
        <div className="flex mb-16">
          <Button
            onClick={handleSubmit}
            text="Guardar cambios"
            type="primary"
            className="mr-4"
          />
          <Button onClick={handleCancel} text="Cancelar" />
        </div>
      </div>
    )
  );
};
