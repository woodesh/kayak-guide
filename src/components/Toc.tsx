import {
  isValidElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Heading } from "nextra";

interface TocProps {
  toc: Heading[];
  filePath: string;
}

// Nextra types heading values as strings, but at runtime they can be React nodes
// (e.g. a heading written as a link). Flatten to text so the TOC link never
// wraps another <a>, which breaks hydration.
const toText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return toText(node.props.children);
  return "";
};

// A heading counts as "current" once it has scrolled above this line
// (navbar height + a little breathing room).
const ACTIVE_OFFSET = 120;

export const Toc: React.FC<TocProps> = ({ toc: headings, filePath }) => {
  const [activeId, setActiveId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    // Nextra renders the TOC in a separate column, hidden on small screens.
    // Mount in the title row so removing that column also works on phones.
    setSlot(document.getElementById("ink-toc-slot"));
    setOpen(false);
  }, [filePath]);

  useEffect(() => {
    if (!open) return;

    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };
    const closeOnFocusLeave = (event: FocusEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("focusin", closeOnFocusLeave);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("focusin", closeOnFocusLeave);
    };
  }, [open]);

  useEffect(() => {
    if (headings.length === 0) return;

    const update = () => {
      let current = headings[0].id;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings]);

  if (headings.length === 0 || !slot) return null;

  const minDepth = Math.min(...headings.map(({ depth }) => depth));

  return createPortal(
    <div ref={containerRef} className="ink-toc-control">
      <button
        ref={triggerRef}
        type="button"
        className="ink-toc-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
        </svg>
        <span>本页目录</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={open ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
        </svg>
      </button>
      <nav
        id={panelId}
        aria-label="本页目录"
        className="ink-toc-panel"
        hidden={!open}
      >
        <ul>
          {headings.map(({ id, value, depth }) => (
            <li
              key={id}
              style={{ paddingLeft: `${(depth - minDepth) * 12}px` }}
            >
              <Link
                href={`#${id}`}
                className="toc-link"
                aria-current={id === activeId ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {toText(value)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>,
    slot
  );
};
