import Image from "next/image";

export const metadata = {
  title: "Proyectos",
  description: "Estas en la seccion de Proyectos",
};

export default function Projects() {
  const projects = [
    {
      title: "Project One",
      description: "This is the first project description.",
      images: "./images/project1.jpg", // Imagen en la carpeta public
      tools: ["React", "TailwindCSS", "Node.js"],
    },
    {
      title: "Project Two",
      description: "This is the second project description.",
      images: "./images/project1.jpg",
      tools: ["Next.js", "TypeScript", "Firebase"],
    },
    {
      title: "Project Three",
      description: "This is the third project description.",
      images: "./images/project1.jpg",
      tools: ["Flutter", "Dart", "Firebase"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
          >
            <div className="relative w-full h-40 overflow-hidden rounded-lg transform group-hover:rotate-3 group-hover:-translate-y-2 transition duration-500">
              <Image
                src={project.images}
                alt={project.title}
                width={240}
                height={248}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
              {project.description}
            </p>
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Tools Used:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                {project.tools.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
