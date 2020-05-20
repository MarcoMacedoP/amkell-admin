/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  useGetCollection,
  useGetItemFromCollection,
  uploadPicture,
} from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { ImageUpload } from "../components/ImageUpload";
import { Button } from "../components/Button";

type GalleryProps = {};
interface GalleryItem {
  img: string;
  name: string;
}
export const Gallery: React.FC<GalleryProps> = () => {
  const [gallery, setGallery] = React.useState<{
    id: string;
    images: string[];
  }>();
  const [status, collection] = useGetItemFromCollection({
    collection: "Galeria",
    query: {
      key: "type",
      operator: "==",
      value: "main",
    },
    setData: setGallery,
  });
  React.useEffect(() => {
    collection.getCollectionData();
  }, []);
  function handleUpload(images: string[]) {
    if (gallery) setGallery({ ...gallery, images });
  }
  async function handleSubmit() {
    try {
      if (gallery) {
        const images = await Promise.all(
          gallery.images.map((img, index) =>
            uploadPicture(img, `gallery-${index}`)
          )
        );
        await collection.updateItem(gallery.id, { images });
        alert("Images guardadas.");
      }
    } catch (error) {
      alert(error);
    }
  }

  return status.isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Gallería</h1>
      <ImageUpload
        images={gallery?.images || []}
        onUpload={handleUpload}
        alt="amkel"
      />
      <Button onClick={handleSubmit} text="Guardar cambios" />
    </div>
  );
};
