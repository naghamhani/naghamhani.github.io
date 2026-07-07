/** @type {import('next').NextConfig} */
// basePath is supplied at build time via NEXT_PUBLIC_BASE_PATH. This repo is
// naghamhani.github.io (a GitHub Pages user site), served at the domain root,
// so it's empty in CI too — kept configurable in case that ever changes.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
