import * as React from "react";
import { useParams } from "react-router-dom";

type ProjectProps = {};

export const Project: React.FC<ProjectProps> = () => {
  const { slug } = useParams();
  return <div>Project single page for {slug}</div>;
};
