import React, { useState } from "react";

import Image from "next/image";
import { FaCode, FaEye } from "react-icons/fa";

import { useProjects } from "@/context/ProjectContext";
import { Project } from "@prisma/client";

function ProjectCard({ project }: { project: Project }) {
  const { deleteProject, setSelectedProject } = useProjects();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      key={project.id}
      className="group bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow relative"
    >
      <div className="relative w-full h-24 overflow-hidden">
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
      <div className="p-6 flex flex-col items-center showFullDescription " >
        <h2 className="text-xs font-semibold text-gray-800 dark:text-gray-200">
          {project.title}
        </h2>
        <div className="flex mb-4">
          <p className="justify-center text-gray-600 dark:text-gray-400 text-center text-xs">
            {showFullDescription
              ? project.description
              : `${project.description.slice(0, 15)}${
                  project.description.length > 15 ? "... " : ""
                }`}
          </p>
          {project.description.length > 15 && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:underline text-xs self-center"
            >
              {showFullDescription ? "menos" : "más"}
            </button>
          )}
        </div>

        <div className="flex justify-center items-center space-x-4 mb-4">
          {JSON.stringify(project.tools)
            .toLocaleLowerCase()
            .replace(/"/g, "")
            .replace(/[\[\]\\]/g, "")
            .split(",")
            .map((tool, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
              >
                <Image
                  aria-hidden
                  src={`./svg/${tool.trim().toLowerCase()}.svg`}
                  alt={tool}
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
            ))}
        </div>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => {
              if (confirm("¿Estás seguro de eliminar el proyecto?")) {
                deleteProject(project.id);
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              setSelectedProject(project);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
