"use client";
// import { Metadata } from "next";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: {
//     absolute: "Acerca",
//   },
//   description: "Estás en la sección de Acerca",
// };

export default function Acerca() {

  const basePath = process.env.NODE_ENV === "production" ? "/myportfolio" : ".";


  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="dark:text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Hola, Yo soy{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Andrés Ribera",
                1000,
                "Web Developer",
                1000,
                "Mobile Developer",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Soy estudiante de ingenieria en sistemas apacionado por el
            desarrollo de software y la implementación de nuevas técnologias
            para la resolución de problemas. Busco una oportunidad para aplicar
            mis conocimientos y seguir aprendiendo.
          </p>
          <div>
            <Link
              href="https://drive.google.com/file/d/1zedJDWcE7bJzMRvWHtwVeS0CgLHH2Vl7/view?usp=drive_link"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full dark:bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden">
            <Image
              src={`${basePath}/images/perfil1.png`}
              alt="hero image"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
