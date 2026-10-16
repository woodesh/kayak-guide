const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
let siteUrl;

if (configuredSiteUrl) {
  let parsed;
  try {
    parsed = new URL(configuredSiteUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin.");
  }
  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    parsed.hostname === "localhost" ||
    parsed.hostname.endsWith(".localhost") ||
    parsed.hostname.endsWith(".local") ||
    parsed.hostname.startsWith("127.") ||
    parsed.hostname === "[::1]"
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a public HTTP(S) origin without a path, credentials, query or fragment."
    );
  }
  siteUrl = parsed.origin;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ["*/_meta"],
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
