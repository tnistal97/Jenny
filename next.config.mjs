/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: genera /out, ideal para Netlify (sin runtime de servidor).
  output: 'export',
  // next/image en modo export no usa el optimizador del servidor.
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
