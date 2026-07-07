/** @type {import('next').NextConfig} */
// basePath is supplied at build time via NEXT_PUBLIC_BASE_PATH. The site lives
// under the /portfolio-website/ sub-path (CI sets NEXT_PUBLIC_BASE_PATH to
// "/portfolio-website"). It defaults to empty so `next dev` still serves at
// localhost root during local development.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
