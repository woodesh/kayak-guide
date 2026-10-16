import { useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";

import type {} from "@/components/NotFound/interactive-ascii";

import { Typewriter } from "../Typewriter";

import { IconName, icons } from "./icons";

// High-contrast black icon badge
const IconBadge = ({ name }: { name: IconName }) => (
  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-slate-900/15 text-slate-900 dark:border-white/20 dark:text-white">
    {icons[name] || icons.shield}
  </span>
);

const card =
  "rounded-3xl border border-outline-subtle bg-background transition-colors";

const plain = "ink-button !no-underline";

const isExternal = (href: string) => href.startsWith("http");

const SmartLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) =>
  isExternal(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(plain, className)}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={clsx(plain, className)}>
      {children}
    </Link>
  );

/* ------------------------------------------------------------------ */
/* 1. Get started cards (2 wide + 3 medium)                            */
/* ------------------------------------------------------------------ */

const starterGuides: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "认识 Kayak 架构",
    description: "认识桌面工具、执行事务插件与外部查询服务",
    href: "/start/01-what-is-kayak",
    icon: "layers",
  },
  {
    title: "安装与环境配置",
    description: "macOS / Windows 客户端初始化与本地工作区准备",
    href: "/start/02-installation-setup",
    icon: "server",
  },
  {
    title: "登录、思考强度与额度",
    description: "设备授权登录、任务思考强度调节与额度管理",
    href: "/start/03-model-account",
    icon: "zap",
  },
  {
    title: "核心插件与自动启用",
    description: "出厂内置执行能力自动启用，企查查外部数据接入",
    href: "/start/04-plugin-activation",
    icon: "scale",
  },
  {
    title: "完成首个法律任务",
    description: "从一个明确的诉求目标开始执行办案流程",
    href: "/start/basics/05-first-legal-task",
    icon: "rocket",
  },
];

export const GetStarted = () => (
  <div className="mt-6 grid gap-3 sm:grid-cols-6">
    {starterGuides.map(({ title, description, href, icon }, index) => (
      <SmartLink
        key={href}
        href={href}
        className={clsx(
          card,
          "block p-6 hover:bg-container/60",
          index < 2 ? "sm:col-span-3" : "sm:col-span-2"
        )}
      >
        <IconBadge name={icon} />
        <span className="mt-5 block text-base font-semibold leading-6 !text-primary">
          {title}
        </span>
        <span className="mt-1 block text-sm font-medium leading-5 !text-secondary">
          {description}
        </span>
      </SmartLink>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 2. Build on Kayak (3 columns with hairline dividers & pills)        */
/* ------------------------------------------------------------------ */

const useCases: {
  title: string;
  description: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "案卷数字化与分析",
    description: "材料梳理、OCR 与证据链智能映射",
    links: [
      {
        label: "案卷电子化归档",
        href: "/workflows/case-prep/01-case-file-organization",
      },
      {
        label: "主张与证据对应",
        href: "/workflows/case-prep/07-claim-evidence-mapping",
      },
      {
        label: "法规与案例原文查阅",
        href: "/workflows/case-prep/02-browser-law-search",
      },
    ],
  },
  {
    title: "企业资料与金额核对",
    description: "核对企业关系、计息口径和案款分配条件",
    links: [
      {
        label: "迟延利息计算",
        href: "/workflows/execution-audit/08-interest-calculation",
      },
      {
        label: "企查查企业资料",
        href: "/workflows/execution-audit/13-qcc-enterprise-data",
      },
      {
        label: "财产调查令清单",
        href: "/workflows/execution-audit/10-investigation-order",
      },
      {
        label: "财产线索综合分析",
        href: "/workflows/execution-audit/06-enforcement-analysis",
      },
    ],
  },
  {
    title: "成果起草与交付",
    description: "普通文书、双版本意见书与机构资料设置",
    links: [
      {
        label: "普通法律文书",
        href: "/workflows/document-delivery/09-legal-documents",
      },
      {
        label: "双版本法律意见书",
        href: "/workflows/document-delivery/11-legal-opinion-dual",
      },
      {
        label: "意见书机构品牌设置",
        href: "/workflows/document-delivery/12-firm-branding-customization",
      },
      {
        label: "合规与安全边界",
        href: "/workflows/execution-audit/14-enterprise-investigation-boundaries",
      },
    ],
  },
];

export const BuildOnInk = () => (
  <div className="mt-6 grid border-t border-outline-subtle lg:grid-cols-3">
    {useCases.map(({ title, description, links }) => (
      <div
        key={title}
        className="border-outline-subtle py-8 max-lg:border-b lg:px-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
      >
        <div className="text-xl font-semibold leading-7 tracking-[-0.02em] !text-primary">
          {title}
        </div>
        <div className="mt-1 text-sm font-medium leading-5 !text-secondary">
          {description}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {links.map(({ label, href }) => (
            <SmartLink
              key={href}
              href={href}
              className="inline-flex items-center rounded-full bg-container px-3.5 py-1.5 text-[13px] font-semibold !text-primary transition-colors hover:bg-container-2"
            >
              {label}
            </SmartLink>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 3. Tools & Infrastructure (6 horizontal cards)                     */
/* ------------------------------------------------------------------ */

const tools: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "利息计算与付款核对",
    description: "明确依据、期间、还款和抵扣口径后计算",
    href: "/workflows/execution-audit/08-interest-calculation",
    icon: "calculator",
  },
  {
    title: "企查查数据关联穿透",
    description: "使用已授权服务核对企业身份和关联记录",
    href: "/workflows/execution-audit/13-qcc-enterprise-data",
    icon: "database",
  },
  {
    title: "财产调查令清单生成",
    description: "区分申请书、套件及地区母版适用范围",
    href: "/workflows/execution-audit/10-investigation-order",
    icon: "fileText",
  },
  {
    title: "材料读取与归档",
    description: "整理可读取内容，复核识别结果和重复凭证",
    href: "/workflows/case-prep/01-case-file-organization",
    icon: "layers",
  },
  {
    title: "执行文书起草",
    description: "执行异议、恢复执行申请、追加被执行人",
    href: "/workflows/document-delivery/09-legal-documents",
    icon: "scale",
  },
  {
    title: "法规与案例检索",
    description: "查阅原文、核对适用时间及案件事实差异",
    href: "/workflows/case-prep/02-browser-law-search",
    icon: "search",
  },
];

export const Tools = () => (
  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {tools.map(({ title, description, href, icon }) => (
      <SmartLink
        key={href}
        href={href}
        className={clsx(
          card,
          "flex items-center gap-4 px-5 py-[18px] hover:bg-container/60"
        )}
      >
        <IconBadge name={icon} />
        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-5 !text-primary">
            {title}
          </span>
          <span className="mt-1 block text-[13px] font-medium leading-5 !text-secondary">
            {description}
          </span>
        </span>
      </SmartLink>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* 4. Banner Section                                                  */
/* ------------------------------------------------------------------ */

export const LegalAgentBanner = () => {
  useEffect(() => {
    import("@/components/NotFound/interactive-ascii");
  }, []);

  return (
    <div className={clsx(card, "relative mt-12 overflow-hidden px-8 py-9")}>
      {/* Interactive ASCII background, fading out to the left */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 sm:block"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 45%)",
        }}
      >
        <interactive-ascii
          style={{ position: "absolute", inset: 0 }}
          value="3"
          speed="0.9"
          interaction="0.9"
          phase="12"
        />
      </div>
      <div className="relative max-w-xl">
        <div className="text-2xl font-semibold !text-primary sm:text-3xl">
          <Typewriter text="Kayak 法律助手实战指南" />
        </div>
        <div className="mt-3 text-sm leading-relaxed font-medium !text-secondary">
          把材料整理、研究、计算和文书制作放进同一项任务。开始前确认权限与数据处理范围，采用结果前核对原文、金额和实际文件。
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href="/start/01-what-is-kayak"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold !text-background transition-opacity hover:opacity-85"
          >
            了解功能与使用条件
          </SmartLink>
          <SmartLink
            href="/manual/03-supreme-court-ai-compliance"
            className="inline-flex items-center rounded-full bg-container px-5 py-2.5 text-sm font-semibold !text-primary transition-colors hover:bg-container-2"
          >
            人工智能使用规范
          </SmartLink>
        </div>
      </div>
    </div>
  );
};

export const BuilderProgram = LegalAgentBanner;

/* ------------------------------------------------------------------ */
/* 5. Resources Pills                                                 */
/* ------------------------------------------------------------------ */

const resources: { label: string; href: string; icon: IconName }[] = [
  { label: "快速上手", href: "/start", icon: "rocket" },
  { label: "办案全流程", href: "/workflows", icon: "layers" },
  { label: "实战案例库", href: "/recipes", icon: "fileText" },
  {
    label: "人工智能使用规范",
    href: "/manual/03-supreme-court-ai-compliance",
    icon: "shield",
  },
  {
    label: "法律实务指令速查",
    href: "/manual/01-legal-prompt-cheatsheet",
    icon: "code",
  },
  {
    label: "核心办案工具箱",
    href: "/manual/02-mcp-tools-and-skills",
    icon: "shield",
  },
  {
    label: "常见问题 FAQ",
    href: "/manual/04-troubleshooting-faq",
    icon: "help",
  },
];

export const Resources = () => (
  <div className="mt-6 flex flex-wrap gap-2">
    {resources.map(({ label, href, icon }) => (
      <SmartLink
        key={label}
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-container py-2.5 pl-2.5 pr-4 text-sm font-semibold leading-5 !text-primary transition-colors hover:bg-container-2"
      >
        {icons[icon] || icons.shield}
        {label}
      </SmartLink>
    ))}
  </div>
);
