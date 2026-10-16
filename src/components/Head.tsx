import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export const Head = () => {
  const { asPath } = useRouter();
  const { frontMatter, title: pageTitle } = useConfig();
  const documentTitle =
    asPath === "/"
      ? "Kayak 法律助手与执行事务实战指南"
      : `${pageTitle} | Kayak 法律助手实战指南`;
  const title = frontMatter.title || "Kayak 法律助手与执行事务实战指南";
  const description =
    frontMatter.description ||
    "介绍 Kayak 的材料整理、浏览器与电脑操作、执行事务、企业查询和文书交付，并说明配置条件与核对方法。";

  return (
    <>
      <title>{documentTitle}</title>

      {/* Basic Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Kayak 法律助手实战指南" />

      {/* Favicon */}
      <link rel="icon" href="/kayak-icon.png" type="image/png" />
    </>
  );
};
