import { SiGmail } from "react-icons/si";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Contacto",
  description: "Estás en la sección de Contacto",
};
export default function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 font-[family-name:var(--font-geist-sans)] container justify-items-center items-center gap-8">
      {/* Gmail Card */}
      <a
        href="mailto:andresriberae@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
        <div className="relative flex gap-4 font-[family-name:var(--font-geist-mono)] items-center flex-col p-6 rounded-lg">
          <SiGmail className="text-red-500 dark:text-white text-6xl" />
          <h1 className="text-gray-800 dark:text-gray-200">Gmail</h1>
        </div>
      </a>

      {/* LinkedIn Card */}
      <a
        href="https://www.linkedin.com/in/ariberae"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
        <div className="relative flex gap-4 font-[family-name:var(--font-geist-mono)] items-center flex-col p-6 rounded-lg">
          <FaLinkedin className="text-blue-500 dark:text-white text-6xl" />
          <h1 className="text-gray-800 dark:text-gray-200">LinkedIn</h1>
        </div>
      </a>

      {/* WhatsApp Card */}
      <a
        href="https://wa.me/59171390665"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
        <div className="relative flex gap-4 font-[family-name:var(--font-geist-mono)] items-center flex-col p-6 rounded-lg">
          <FaWhatsapp className="text-green-500 dark:text-white text-6xl" />
          <h1 className="text-gray-800 dark:text-gray-200">WhatsApp</h1>
        </div>
      </a>
    </div>
  );
}