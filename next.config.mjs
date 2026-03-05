/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // If deploying to a GitHub Pages subpath (e.g. username.github.io/repo-name),
  // uncomment and set the basePath and assetPrefix below:
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
}

export default nextConfig
