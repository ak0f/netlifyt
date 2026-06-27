import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next does not pick up a stray
  // package-lock.json higher up the tree (e.g. in the user's home folder).
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
