import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    absolute: "Acerca",
  },
  description: "Estás en la sección de Acerca",
};

export default function Acerca() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 container ">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="./images/perfil.png"
              alt="Imagen circular"
              width={240}
              height={248}
              className="object-cover"
            />
          </div>
          <h1 className="font-[family-name:var(--font-geist-mono)] mb-4">
            Carlos Andrés Ribera
          </h1>
        </div>
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="mb-4 text-2xl">Lo que puedo contarte acerca de mi</h1>
          <h2 className="mb-4">
            Soy estudiante de ingenieria en sistemas apacionado por el
            desarrollo de software y la implementación de nuevas técnologias
            para la resolución de problemas. Busco una oportunidad para aplicar
            mis conocimientos y seguir aprendiendo.
          </h2>
          <h2 className="mb-4 text-sm">
            Puedes descargar mi curriculum vitae en el siguiente enlace...
          </h2>
          <a
            href="https://drive.google.com/file/d/1zedJDWcE7bJzMRvWHtwVeS0CgLHH2Vl7/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </>
  );
}
