import Image from "next/image";
import Link from "next/link";

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
        <ol className="list-inside list-decimal text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-xl mb-2 ">Bienvenido a AndSoft!!</h1>
          <h2 className="text-sm">Innovación en el Desarrollo de Software</h2>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
      </footer>
    </>
  );
}
