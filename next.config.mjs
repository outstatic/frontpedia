import "./env.mjs"

async function getRewrites() {
  return {
    beforeFiles: [
      {
        source: '/api/send',
        destination: 'https://cloud.umami.is/api/send',
      },
      {
        source: '/stats/:path*',
        destination: 'https://cloud.umami.is/:path*',
      },
    ],
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  outputFileTracingIncludes: {
    "/**": ["outstatic/content/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  rewrites: getRewrites,
};

export default nextConfig;
