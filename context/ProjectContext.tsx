"use client";
import { createContext, useContext, useState } from "react";
import { CreateProject, UpdateProject } from "@/app/interfaces/Projects";
import { Project } from "@prisma/client";

export const ProjectContext = createContext<{
  projects: Project[];
  loadProjects: () => Promise<void>;
  createProject: (project: CreateProject) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProject: (id: number, project: UpdateProject) => Promise<void>;
}>({
  projects: [],
  loadProjects: async () => {},
  createProject: async (project: CreateProject) => {},
  deleteProject: async (id: number) => {},
  selectedProject: null,
  setSelectedProject: (project: Project | null) => {},
  updateProject: async (id: number, project: UpdateProject) => {},
});

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  async function loadProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    // Parseamos las propiedades tools y categories como arrays
    const parsedProjects = data.map((project: Project) => ({
      ...project,
      tools: parseJsonArray(project.tools),
      categories: parseJsonArray(project.categories),
    }));

    setProjects(parsedProjects);
  }

  async function createProject(project: CreateProject) {
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newProject = await res.json();

    const parsedProject = {
      ...newProject,
      tools: parseJsonArray(newProject.tools),
      categories: parseJsonArray(newProject.categories),
    };

    setProjects([...projects, parsedProject]);
  }

  async function deleteProject(id: number) {
    const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    setProjects(projects.filter((project) => project.id !== id));
  }

  function parseJsonArray(value: any): string[] {
    if (Array.isArray(value)) {
      return value.map((item) => String(item));
    }
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
    } catch {
      return [];
    }
  }

  async function updateProject(id: number,  project: UpdateProject) {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedProject = await res.json();
    const parsedProject = {
      ...updatedProject,
      tools: parseJsonArray(updatedProject.tools),
      categories: parseJsonArray(updatedProject.categories),
    };

    setProjects(projects.map((p) => (p.id === id ? parsedProject : p)));
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadProjects,
        createProject,
        deleteProject,
        selectedProject,
        setSelectedProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
