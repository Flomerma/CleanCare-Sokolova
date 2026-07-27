import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: Sobald echte Fotos vorliegen, können diese Remote-Hosts entfernt werden.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
