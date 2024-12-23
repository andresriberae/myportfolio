"use client";

import ProjectForm from "../components/ProjectForm";
import { useEffect,useCallback } from "react";
import { useProjects } from "@/context/ProjectContext";
import ProjectCard from "@/app/components/ProjectCard";

export default function NewPage() {
  const { projects, loadProjects } = useProjects();

  // Hacer que loadProjects sea estable
  const stableLoadProjects = useCallback(loadProjects, []);

  // Cargar proyectos al montar el componente
  useEffect(() => {
    stableLoadProjects();
  }, [stableLoadProjects]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 font-[family-name:var(--font-geist-sans)] justify-items-center items-center">
      <div>
        <h1 className="dark:text-white mb-4 text-4xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">
          Crear Proyecto
        </h1>
        {/* Formulario para crear un nuevo proyecto */}
        <ProjectForm />
      </div>
      <div>
        <h1 className="dark:text-white mb-4 text-4xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">
          Proyectos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
