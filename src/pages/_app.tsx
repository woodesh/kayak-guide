import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { CopyToast } from "../components/CopyToast";
import { applyTune, readStoredTune } from "../components/InkHero/tune";
import { ScrollState } from "../components/ScrollState";
import { SearchBar } from "../components/SearchBar";
import { SidebarIndicator } from "../components/SidebarIndicator";
import { departureMono, satoshi } from "../fonts";

import "../globals.css";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
let siteUrl: string | undefined;
if (configuredSiteUrl) {
  try {
    const parsed = new URL(configuredSiteUrl);
    if (
      ["http:", "https:"].includes(parsed.protocol) &&
      !parsed.username &&
      !parsed.password &&
      parsed.pathname === "/" &&
      !parsed.search &&
      !parsed.hash &&
      parsed.hostname !== "localhost" &&
      !parsed.hostname.endsWith(".localhost") &&
      !parsed.hostname.endsWith(".local") &&
      !parsed.hostname.startsWith("127.") &&
      parsed.hostname !== "[::1]"
    ) {
      siteUrl = parsed.origin;
    }
  } catch {
    // Invalid deployment settings are reported by the sitemap postbuild step.
  }
}

export default function App({ Component, pageProps }: AppProps) {
  // Portaled UI (search results, dropdowns) renders outside the wrapper div
  // below, so expose the font variables on <html> as well.
  useEffect(() => {
    document.documentElement.classList.add(
      satoshi.variable,
      departureMono.variable
    );
    // Corner roundness picked with the home page's ink tuner
    applyTune(readStoredTune());
  }, []);

  return (
    <ThemeProvider attribute="class">
      <ScrollState />
      <SidebarIndicator />
      <script
        id="schema-markup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Kayak 法律助手与执行事务实战指南",
            description:
              "介绍 Kayak 的材料整理、浏览器与电脑操作、执行事务、企业查询和文书交付，并说明配置条件与核对方法。",
            url: siteUrl,
          }),
        }}
      />
      <div
        className={`${satoshi.variable} ${departureMono.variable} font-sans`}
      >
        <div className="bg-background">
          <Component {...pageProps} />
          <CopyToast />
          <SearchBar />
        </div>
      </div>
    </ThemeProvider>
  );
}
