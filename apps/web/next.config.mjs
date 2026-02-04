const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repo.endsWith(".github.io") || repo === "";
const explicitBasePath = process.env.NEXT_BASE_PATH ?? "";
const basePath = explicitBasePath || (isUserSite ? "" : `/${repo}`);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@agambondan/cv-data"],
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath || undefined
};

export default nextConfig;
