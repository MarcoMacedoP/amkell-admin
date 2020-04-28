import * as React from "react";
import ImageUploader from "react-images-upload";
type ImageUploadProps = {
  images: Array<string>;
  alt: string;
  onUpload: (images: Array<string>) => void;
  onDelete: (updatedImages: Array<string>) => void;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  alt,
  onUpload,
  onDelete,
}) => {
  const handleImageUpload = (files: File[], images: string[]) => {
    onUpload(images);
  };
  const handleDelete = (index: number) => {
    const newImages = images.splice(index, 2);

    console.log(index, newImages);
    onDelete(newImages);
  };
  return (
    <div>
      <div className="flex flex-wrap mt-8">
        {images.length > 0 &&
          images.map((img, index) => (
            <div key={index} className="animation-init w-1/3 relative">
              <span
                onClick={() => handleDelete(index)}
                className="absolute top-0 text-sm text-white font-bold bg-red-500 rounded-md px-2 py-1 cursor-pointer transition-colors duration-300 hover:bg-red-700"
              >
                Eliminar
              </span>
              <img
                className="object-contain object-center"
                src={img}
                alt={alt}
              />
            </div>
          ))}
      </div>
      <ImageUploader
        name="images"
        buttonText="Agregar imagenes"
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        buttonClassName="bg-blue-500"
        maxFileSize={5242880}
        onChange={handleImageUpload}
      />
    </div>
  );
};
