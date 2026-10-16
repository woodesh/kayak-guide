import { DocsThemeConfig } from "nextra-theme-docs";

import { Footer } from "@/components/Footer";
import { Head } from "@/components/Head";
import { NavbarActions } from "@/components/NavbarActions";
import { PageMain } from "@/components/PageMain";
import { PageTitle } from "@/components/PageTitle";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
import { Toc } from "@/components/Toc";
import { Typewriter } from "@/components/Typewriter";
import { KayakLogo } from "@/icons/KayakLogo";

const config: DocsThemeConfig = {
  logo: <KayakLogo />,
  darkMode: false,
  // ink #7132f5 (light) / ink-light #9e70ff (dark)
  color: {
    hue: 259,
    saturation: { light: 91, dark: 100 },
    lightness: { light: 58, dark: 72 },
  },
  // background token (see src/globals.css)
  backgroundColor: {
    light: "255,255,255",
    dark: "5,5,6",
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  gitTimestamp: ({ timestamp }: { timestamp: Date }) => (
    <>
      最后更新于{" "}
      <time dateTime={timestamp.toISOString()}>
        {`${timestamp.getFullYear()}年${timestamp.getMonth() + 1}月${timestamp.getDate()}日`}
      </time>
    </>
  ),
  head: Head,
  main: PageMain,
  components: {
    h1: PageTitle,
    ScrollArea,
    ScrollBar,
    // Link colours live in globals.css; this only opens external links in a
    // new tab.
    a(props: { href?: string }) {
      const isExternal = props.href?.startsWith("http");
      return (
        <a
          {...props}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        />
      );
    },
    blockquote({
      className = "",
      ...props
    }: React.ComponentProps<"blockquote">) {
      return (
        <blockquote
          {...props}
          className={`my-5 border-l-2 border-outline-subtle pl-4 !not-italic !text-secondary text-[14px] leading-relaxed [&_*]:!not-italic [&_*]:!text-inherit ${className}`}
        />
      );
    },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    toggleButton: false,
  },
  navbar: {
    extraContent: NavbarActions,
  },
  footer: {
    component: Footer,
  },
  toc: {
    backToTop: true,
    component: Toc,
  },
  banner: {
    key: "kayak-banner-v1",
    content: (
      <a className="!text-white hover:!text-white/80" href="/">
        <Typewriter
          text="Kayak 法律助手与执行事务实战指南"
          prompt
          className="ink-banner-typer"
        />
      </a>
    ),
  },
};

export default config;
