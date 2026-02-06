/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  pageExtensions: ['jsx', 'js'],
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
