import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "MyProfile",
//   description: "This is my frofile",
// };

export const metadata: Metadata = {
  title: {
    default: "AndSoft",
    absolute: "",
    template: "%s - AndSoft",
  },
  description: "Innovación Desarrollo de Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <nav className="flex gap-4 container">
              <Link href="/">
                <Image
                  className="dark:invert"
                  src="./andsoft.svg"
                  alt="Next.js logo"
                  width={100}
                  height={38}
                  priority
                />
              </Link>
              <Link
                href="/about"
                className="font-medium hover:text-pink-600 transition-all"
              >
                Acerca
              </Link>
              <Link
                href="/projects"
                className="font-medium hover:text-pink-600 transition-all"
              >
                Proyectos
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-pink-600 transition-all"
              >
                Contacto
              </Link>
            </nav>
            {children}
          </div>
      </body>
    </html>
  );
}
