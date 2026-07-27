/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://omyt.ai",
  generateRobotsTxt: true,
  outDir: "public",
  // File-convention routes are not pages — keep them out of the sitemap.
  exclude: ["/icon.svg", "/opengraph-image"],
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
