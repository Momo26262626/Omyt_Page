/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Pre-pivot URLs still live in search results and bookmarks.
    return [
      { source: "/pricing", destination: "/partners", permanent: true },
      { source: "/sign-up", destination: "/#waitlist", permanent: true },
    ];
  },
};

module.exports = nextConfig;
