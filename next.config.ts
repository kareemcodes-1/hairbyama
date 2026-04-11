

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // WARNING: disables build-time type checking — use at your own risk
    ignoreBuildErrors: true,
  },
   images: {
    domains: ['framerusercontent.com', 'cdn.shopify.com', 'localhost', 'sklep099968.shoparena.pl', 'img.fantaskycdn.com', 'prettyyoungthang.com', 'i.pinimg.com', 'onskn.com', 'lh3.googleusercontent.com']
  },
  eslint: {
    // also ignores lint errors during build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
