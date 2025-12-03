/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Update this to match your GitHub repository name
  // If your repo is at github.com/username/repo-name, set basePath to '/repo-name'
  basePath: process.env.NODE_ENV === 'production' ? '/khaizerdn' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/khaizerdn' : '',
}

module.exports = nextConfig

