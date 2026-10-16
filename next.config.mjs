import nextra from "nextra";
import path from "path";
import remarkCodeImport from "remark-code-import";
import { fileURLToPath } from "url";

import {
  inkShikiLightTheme,
  inkShikiTheme,
} from "./src/utils/shiki-ink-theme.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [remarkCodeImport],
    rehypePrettyCodeOptions: {
      theme: { light: inkShikiLightTheme, dark: inkShikiTheme },
    },
  },
});

const config = withNextra({
  async redirects() {
    return [
      {
        source: "/build/verify",
        destination: "/",
        permanent: false,
      },
      // Workflows
      { source: "/workflows/01-case-file-organization", destination: "/workflows/case-prep/01-case-file-organization", permanent: false },
      { source: "/workflows/07-claim-evidence-mapping", destination: "/workflows/case-prep/07-claim-evidence-mapping", permanent: false },
      { source: "/workflows/02-browser-law-search", destination: "/workflows/case-prep/02-browser-law-search", permanent: false },
      { source: "/workflows/06-enforcement-analysis", destination: "/workflows/execution-audit/06-enforcement-analysis", permanent: false },
      { source: "/workflows/08-interest-calculation", destination: "/workflows/execution-audit/08-interest-calculation", permanent: false },
      { source: "/workflows/10-investigation-order", destination: "/workflows/execution-audit/10-investigation-order", permanent: false },
      { source: "/workflows/13-qcc-enterprise-data", destination: "/workflows/execution-audit/13-qcc-enterprise-data", permanent: false },
      { source: "/workflows/14-enterprise-investigation-boundaries", destination: "/workflows/execution-audit/14-enterprise-investigation-boundaries", permanent: false },
      { source: "/workflows/03-computer-control-office", destination: "/workflows/interactive-agents/03-computer-control-office", permanent: false },
      { source: "/workflows/04-multi-step-workflows", destination: "/workflows/interactive-agents/04-multi-step-workflows", permanent: false },
      { source: "/workflows/05-scheduled-monitoring", destination: "/workflows/interactive-agents/05-scheduled-monitoring", permanent: false },
      { source: "/workflows/09-legal-documents", destination: "/workflows/document-delivery/09-legal-documents", permanent: false },
      { source: "/workflows/11-legal-opinion-dual", destination: "/workflows/document-delivery/11-legal-opinion-dual", permanent: false },
      { source: "/workflows/12-firm-branding-customization", destination: "/workflows/document-delivery/12-firm-branding-customization", permanent: false },
      // Recipes
      { source: "/recipes/01-goods-payment-dispute", destination: "/recipes/finance/01-goods-payment-dispute", permanent: false },
      { source: "/recipes/03-delayed-interest-allocation", destination: "/recipes/finance/03-delayed-interest-allocation", permanent: false },
      { source: "/recipes/04-warehouse-factor-table", destination: "/recipes/finance/04-warehouse-factor-table", permanent: false },
      { source: "/recipes/02-enforcement-recovery-after-three-years", destination: "/recipes/enforcement/02-enforcement-recovery-after-three-years", permanent: false },
      { source: "/recipes/05-shell-debtor-evasion", destination: "/recipes/enforcement/05-shell-debtor-evasion", permanent: false },
      { source: "/recipes/06-firm-branded-legal-opinion", destination: "/recipes/enforcement/06-firm-branded-legal-opinion", permanent: false },
      { source: "/recipes/07-court-system-auto-fill", destination: "/recipes/enforcement/07-court-system-auto-fill", permanent: false },
      // Start
      { source: "/start/05-first-legal-task", destination: "/start/basics/05-first-legal-task", permanent: false },
      { source: "/start/06-prompt-formula", destination: "/start/basics/06-prompt-formula", permanent: false },
      { source: "/start/07-security-boundary", destination: "/start/basics/07-security-boundary", permanent: false },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep plain .ts out of pageExtensions so Next 15's route-export validation
  // doesn't treat Nextra's _meta.ts files as pages (Nextra discovers them itself).
  pageExtensions: ["tsx"],
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
      "@theguild/remark-mermaid/mermaid": path.join(__dirname, "src/components/Mermaid.tsx"),
    };
    return config;
  },
  experimental: {
    mdxRs: true,
  },
});

export default config;
