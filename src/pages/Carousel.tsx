import * as React from "react";
import { useGetCollection } from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

type CarouselProps = {};

export const Carousel: React.FC<CarouselProps> = () => {
  const [data, isLoading] = useGetCollection<Carousel[]>("Carosuel");

  return isLoading ? (
    <Loader />
  ) : (
    data && (
      <div>
        <h1 className="mb-2">Carrousel</h1>
        <p className="mb-4">Elementos del carrosel.</p>
        <div className="flex">
          {data.map((item) => (
            <LinkCard
              title={item.title}
              key={item.url}
              desc={item.buttonLabel}
              url={`/carousel/${item.id}`}
            />
          ))}
        </div>
      </div>
    )
  );
};
