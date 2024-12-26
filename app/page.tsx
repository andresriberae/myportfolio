"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Image
          className="dark:invert"
          src="./andsoft_s.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="dark:text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
            <TypeAnimation
              sequence={[
                "Bienvenido a AndSoft!",
                1000,
                "Desarrollo Web",
                1000,
                "Desarrollo Móvil",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <h2 className="text-sm">Innovación en el Desarrollo de Software</h2>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/andresriberae"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            className="dark:invert"
            src="./github.svg"
            alt="github icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://gitlab.com/AndresRibera"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="./gitlab.svg"
            alt="GitLab icon"
            width={16}
            height={16}
          />
          GitLab
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/ariberae/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="./linkedin.svg"
            alt="LinkedIn icon"
            width={24}
            height={24}
          />
          GitLab
        </a>
      </footer>
    </>
  );
}
