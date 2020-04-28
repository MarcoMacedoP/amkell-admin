import * as React from "react";
import { useGetCollection } from "../hooks/Firebase";

type MaterialsProps = {};

export const Materials: React.FC<MaterialsProps> = ({}) => {
  const [materials, isLoading] = useGetCollection("Materiales");

  return <div>Materials page</div>;
};
