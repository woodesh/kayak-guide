interface KayakLogoProps {
  className?: string;
}

export const KayakLogo: React.FC<KayakLogoProps> = ({
  className = "text-primary",
}) => {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Kayak Docs"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/kayak-icon.png"
        alt="Kayak"
        width={24}
        height={24}
        className="size-6 shrink-0 rounded-[6px] object-cover shadow-[0_2px_8px_rgba(0,0,0,0.22)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      />
      <span className="text-lg font-bold tracking-tight text-primary">
        KAYAK
      </span>
      <span className="ml-1.5 inline-flex items-center rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-semibold text-ink dark:bg-ink-light/15 dark:text-ink-light tracking-wide">
        法律版
      </span>
    </span>
  );
};
