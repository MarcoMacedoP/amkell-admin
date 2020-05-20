import * as React from "react";
import ImageUploader from "react-images-upload";
type ImageUploadProps = {
  images: Array<string>;
  alt: string;
  onUpload: (images: Array<string>) => void;
  onDelete?: (updatedImages: Array<string>) => void;
  singleImage?: boolean;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  alt,
  onUpload,
  singleImage,
}) => {
  const handleImageUpload = (files: File[], images: string[]) => {
    onUpload(images);
  };

  return (
    <div>
      <div className="flex flex-wrap mt-8">
        {images.length > 0 &&
          images.map(
            (img, index) =>
              img && (
                <div
                  key={index}
                  className="animation-init w-1/3 relative"
                >
                  <img
                    className="object-contain object-center"
                    src={img}
                    alt={alt}
                  />
                </div>
              )
          )}
      </div>
      <ImageUploader
        withPreview
        singleImage={singleImage}
        name="images"
        buttonText="Agregar imagenes"
        imgExtension={[".jpg", ".png"]}
        buttonClassName="bg-blue-500"
        maxFileSize={1048487}
        onChange={handleImageUpload}
      />
    </div>
  );
};
