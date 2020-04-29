import React from "react";
import { useGetCollection } from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { project } from "../types/projects";

type ProjectsProps = {};
export const Projects: React.FC<ProjectsProps> = () => {
  const [projects, isLoading] = useGetCollection<project[]>("Proyectos");
  const history = useHistory();
  const goToAddProject = () => history.push("/proyectos/agregar");
  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1 className="mb-2">Proyectos</h1>
      <p className="mb-4">Aqui se muestra un listado de proyectos </p>
      <Button
        type="primary"
        text="Agregar un proyecto"
        onClick={goToAddProject}
        className="p-2 mb-8"
      />
      <div className="flex">
        {projects?.map((p) => (
          <div className="m-2" key={p.slug}>
            <LinkCard
              url={"/proyectos/" + p.slug}
              title={p.name}
              desc={p.desc.split(".")[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
