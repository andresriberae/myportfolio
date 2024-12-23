"use client";

import { useEffect, useState} from "react";
import { FaCode, FaEye } from "react-icons/fa";
import { useProjects } from "@/context/ProjectContext";
import Image from "next/image";
import { Project } from "@prisma/client";

const truncateDescription = (description: string, maxLength = 45) => {
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};

export default function Projects() {
  const {projects, loadProjects} = useProjects();
  
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = ["todos", "web", "móvil"];
  

  // Cargar proyectos al montar el componente
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadProjects();
  }, []);



  // Filtrar proyectos según la categoría seleccionada
  useEffect(() => {
    if (selectedCategory === "todos") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => {
          const category = JSON.stringify(project.categories)
            .toLocaleLowerCase()
            .replace(/"/g, "")
            .replace(/[\[\]\\]/g, "")
            .split(",")
            .map((category) => {
              return category.trim();
            });

          // return null;
          return category.includes(selectedCategory);
        })
      );
    }
  }, [selectedCategory, projects]);

  return (
    <div className="container mx-auto px-4 py-4">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
        Mis Proyectos
      </span>

      {/* Selector de categorías */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium mt-4 ${
              selectedCategory === category
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-pink-400 hover:text-white transition`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="group bg-white dark:bg-transparent shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow relative"
          >
            <div className="relative w-full h-48 overflow-hidden">
              {/* Imagen */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className="group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50 transition-all duration-300 ease-in-out"
              />
              {/* Iconos */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-md mx-2 opacity-80 hover:opacity-100"
                >
                  <FaEye size={24} className="text-gray-800" />
                </a>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-md mx-2 opacity-80 hover:opacity-100"
                >
                  <FaCode size={24} className="text-gray-800" />
                </a>
              </div>
            </div>
            <div className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                {truncateDescription(project.description)}
              </p>
              <h2 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">
                Tecnologías:
              </h2>
              <div className="flex justify-center items-center space-x-4">
                {JSON.stringify(project.tools)
                  .toLocaleLowerCase()
                  .replace(/"/g, "")
                  .replace(/[\[\]\\]/g, "")
                  .split(",")
                  .map((tool, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
                    >
                      <Image
                        aria-hidden
                        src={`./svg/${tool.trim().toLowerCase()}.svg`}
                        alt={tool}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
