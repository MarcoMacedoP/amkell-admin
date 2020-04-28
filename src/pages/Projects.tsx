import React from "react";
import { useGetCollection } from "../hooks/Firebase";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

type ProjectsProps = {

}
export const Projects: React.FC<ProjectsProps> = ()=> {
    const  [projects, isLoading] = useGetCollection('Proyectos')
    return isLoading ? <Loader /> : (
        <div>
            
            <h1 className="mb-2">Proyectos</h1>
            <p className="mb-8">Aqui se muestra un listado de proyectos </p>
            {
                projects?.map(
                    (p:any) => <LinkCard url={'/proyectos/'+p.slug} title={p.name} desc={p.desc}/>
                )
            }

        </div>    
    )
}