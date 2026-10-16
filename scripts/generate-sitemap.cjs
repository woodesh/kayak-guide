const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { spawnSync } = require("node:child_process");

const projectRoot = path.resolve(__dirname, "..");
const publicDirectory = path.join(projectRoot, "public");

function clearGeneratedFiles() {
  if (!fs.existsSync(publicDirectory)) return;
  for (const entry of fs.readdirSync(publicDirectory, {
    withFileTypes: true,
  })) {
    if (
      entry.isFile() &&
      (entry.name === "robots.txt" ||
        /^sitemap(?:-\d+)?\.xml(?:\.gz)?$/.test(entry.name))
    ) {
      fs.rmSync(path.join(publicDirectory, entry.name));
    }
  }
}

try {
  // Use Next's existing loader so .env.local matches the build configuration.
  const nextRequire = createRequire(require.resolve("next"));
  nextRequire("@next/env").loadEnvConfig(
    projectRoot,
    process.env.NODE_ENV === "development"
  );
  clearGeneratedFiles();

  if (!process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    console.log(
      "NEXT_PUBLIC_SITE_URL is not configured; sitemap generation skipped."
    );
  } else {
    const { siteUrl } = require("../next-sitemap.config.js");
    const packageDirectory = fs.realpathSync(
      path.join(projectRoot, "node_modules", "next-sitemap")
    );
    const metadata = JSON.parse(
      fs.readFileSync(path.join(packageDirectory, "package.json"), "utf8")
    );
    const bin = path.resolve(packageDirectory, metadata.bin["next-sitemap"]);
    const result = spawnSync(process.execPath, [bin], {
      cwd: projectRoot,
      env: { ...process.env, NEXT_PUBLIC_SITE_URL: siteUrl },
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error("next-sitemap did not complete successfully.");
    }
    // next-sitemap logs some failures without returning a nonzero exit code.
    for (const name of ["sitemap.xml", "robots.txt"]) {
      if (!fs.existsSync(path.join(publicDirectory, name))) {
        throw new Error(
          "next-sitemap did not produce the expected output files."
        );
      }
    }
  }
} catch (error) {
  clearGeneratedFiles();
  console.error(
    error instanceof Error ? error.message : "Sitemap generation failed."
  );
  process.exitCode = 1;
}
