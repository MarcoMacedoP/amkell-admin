/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useGetCollection, useGetItemFromCollection } from "../hooks/Firebase";
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
    if (gallery) {
      await collection.updateItem(gallery.id, gallery);
      alert("Images guardadas.");
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
        alt="amkell"
      />
      <Button onClick={handleSubmit} text="Guardar cambios" />
    </div>
  );
};
