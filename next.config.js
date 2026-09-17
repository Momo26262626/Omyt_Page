/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Story video line PR 9: `app/v/[token]` and `app/api/v/[token]/go` read
  // `data/story-landing/*` at request time via a runtime-computed path
  // (`fs.readFile`), which Next's static file tracer cannot follow on its
  // own — without this, the serverless bundle would omit those files and
  // every variant page would 404 in production despite working in `next dev`.
  outputFileTracingIncludes: {
    "/v/[token]": ["./data/story-landing/**"],
    "/api/v/[token]/go": ["./data/story-landing/**"],
  },
  async redirects() {
    // Pre-pivot URLs still live in search results and bookmarks.
    return [
      { source: "/pricing", destination: "/partners", permanent: true },
      { source: "/sign-up", destination: "/#waitlist", permanent: true },
    ];
  },
};

module.exports = nextConfig;
