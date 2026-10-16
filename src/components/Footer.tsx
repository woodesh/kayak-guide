import Link from "next/link";

import { KayakLogo } from "@/icons/KayakLogo";

const navColumns = [
  {
    title: "实务指引",
    links: [
      { label: "认识 Kayak 架构", href: "/start/01-what-is-kayak" },
      { label: "安装与环境配置", href: "/start/02-installation-setup" },
      {
        label: "案卷数字化与证据链",
        href: "/workflows/case-prep/01-case-file-organization",
      },
      {
        label: "迟延履行利息计算",
        href: "/workflows/execution-audit/08-interest-calculation",
      },
      { label: "实战案例库", href: "/recipes" },
    ],
  },
  {
    title: "参考手册",
    links: [
      {
        label: "人工智能使用规范",
        href: "/manual/03-supreme-court-ai-compliance",
      },
      {
        label: "执行事务插件 (legal-agent)",
        href: "/start/04-plugin-activation",
      },
      {
        label: "工具与技能使用说明",
        href: "/manual/02-mcp-tools-and-skills",
      },
      {
        label: "法律工程 Prompt 速查",
        href: "/manual/01-legal-prompt-cheatsheet",
      },
      { label: "常见问题与排错指南", href: "/manual/04-troubleshooting-faq" },
      {
        label: "知识产权与软件使用声明",
        href: "/manual/05-intellectual-property",
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-outline-subtle bg-background pt-16 pb-12 md:mt-32">
      <div className="mx-auto max-w-[var(--layout-width)] px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <KayakLogo />
            <p className="max-w-sm text-sm leading-relaxed text-secondary">
              面向法律工作者的 Kayak
              操作指南，涵盖材料整理、研究计算、企业资料查询和文书交付。
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-primary tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {col.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-secondary transition-colors hover:text-primary !no-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-outline-subtle pt-6 text-xs text-secondary sm:flex-row">
          <span>© {new Date().getFullYear()} Kayak 开发者及相关权利人</span>
          <span className="text-secondary/70">
            使用前确认权限 采用前核对结果
          </span>
        </div>
      </div>
    </footer>
  );
};
