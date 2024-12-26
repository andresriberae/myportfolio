import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  basePath: "/myportfolio", // Cambia esto al nombre exacto de tu repositorio
  assetPrefix: "/myportfolio/",
  images: {
    unoptimized: true, // Necesario para exportar imágenes al usar GitHub Pages
  },
};

export default nextConfig;
