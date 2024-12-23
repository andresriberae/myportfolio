"use client";

import { useState, useRef, useEffect } from "react";
import { useProjects } from "@/context/ProjectContext";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);

  const { createProject, selectedProject, setSelectedProject, updateProject } =
    useProjects();

  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title);
      setDescription(selectedProject.description);
      setImageUrl(selectedProject.imageUrl);
      setRepositoryUrl(selectedProject.repositoryUrl);
      setProjectUrl(selectedProject.projectUrl);
      // Verificamos si `tools` está definido antes de usarlo
      if (typeof selectedProject.tools === "string") {
        setTools(
          selectedProject.tools.split(",").map((tool: string) => tool.trim())
        );
      } else if (Array.isArray(selectedProject.tools)) {
        setTools(selectedProject.tools.map((tool: any) => String(tool)));
      } else {
        setTools([]);
      }
      setCategories(selectedProject.categories as string[]);
    }
  }, [selectedProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject) {
      console.log("updating project");
      await updateProject(selectedProject.id, {
        title,
        description,
        imageUrl,
        repositoryUrl,
        projectUrl,
        tools,
        categories,
      });
      setSelectedProject(null);
    } else {
      await createProject({
        title,
        description,
        imageUrl,
        repositoryUrl,
        projectUrl,
        tools,
        categories,
      });
    }
    setTitle("");
    setDescription("");
    setImageUrl("");
    setRepositoryUrl("");
    setProjectUrl("");
    setTools([]);
    setCategories([]);

    titleRef.current?.focus();
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-4">
      <div>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
          className="w-full p-2 border outline-none rounded text-black"
          autoFocus
          placeholder="Título del Proyecto"
          required
        />
      </div>

      <div>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border outline-none rounded text-black"
          placeholder="Descripción del Proyecto"
          required
        />
      </div>
      <div>
        <input
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border outline-none rounded text-black"
          placeholder="URL de la imagen"
          required
        />
      </div>
      <div>
        <input
          type="url"
          id="repositoryUrl"
          name="repositoryUrl"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          className="w-full p-2 border outline-none rounded text-black"
          placeholder="Repositorio (URL del codigo)"
          required
        />
      </div>

      <div>
        <input
          type="url"
          id="projectUrl"
          name="projectUrl"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full p-2 border outline-none rounded text-black"
          placeholder="URL del Proyecto (Desplegado)"
          required
        />
      </div>

      <div>
        <input
          type="text"
          id="tools"
          name="tools"
          value={tools.join(", ")}
          onChange={(e) =>
            setTools(e.target.value.split(",").map((tool) => tool.trim()))
          }
          className="w-full p-2 border outline-none rounded text-black"
          placeholder="Herramientas: Flutter, Firebase, Nestjs, etc"
          required
        />
      </div>
      <h2>Categorias:</h2>
      <div>
        <div className="flex flex-wrap gap-4">
          {["web", "móvil"].map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={categories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Agregar la categoría seleccionada
                    setCategories([...categories, e.target.value]);
                  } else {
                    // Remover la categoría deseleccionada
                    setCategories((prevCategories) =>
                      Array.isArray(prevCategories)
                        ? prevCategories.filter((cat) => cat !== e.target.value)
                        : []
                    );
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-500">{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {selectedProject ? "Actualizar" : "Crear"}
        </button>
        {selectedProject && (
          <button
            type="button"
            onClick={() => {
              setSelectedProject(null);
              setTitle("");
              setDescription("");
              setImageUrl("");
              setRepositoryUrl("");
              setProjectUrl("");
              setTools([]);
              setCategories([]);
            }}
            className="w-full p-2 bg-slate-500 text-black rounded hover:bg-slate-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
