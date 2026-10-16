import React, { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId();
  const cleanId = id.replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedSvg, setRenderedSvg] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      if (!containerRef.current) return;
      try {
        const { default: mermaid } = await import("mermaid");
        const htmlElement = document.documentElement;
        const isDarkTheme =
          htmlElement.classList.contains("dark") ||
          htmlElement.getAttribute("data-theme") === "dark";

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: "inherit",
          look: "classic",
          theme: isDarkTheme ? "dark" : "base",
          themeVariables: {
            clusterBkg: "transparent",
            clusterBorder: isDarkTheme ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0",
            primaryColor: isDarkTheme ? "#0c0f17" : "#ffffff",
            primaryTextColor: isDarkTheme ? "#f8fafc" : "#0f172a",
            primaryBorderColor: isDarkTheme ? "#334155" : "#cbd5e1",
            lineColor: isDarkTheme ? "#64748b" : "#94a3b8",
            fontSize: "13px",
          },
          flowchart: {
            look: "classic",
            useMaxWidth: true,
            wrappingWidth: 280,
            padding: 16,
            nodeSpacing: 36,
            rankSpacing: 28,
            subGraphTitleMargin: { top: 12, bottom: 12 },
          },
        });

        // Use an off-screen container that has layout metrics (NOT display: none)
        const tempContainer = document.createElement("div");
        tempContainer.className = "nextra-content";
        tempContainer.style.position = "fixed";
        tempContainer.style.top = "-99999px";
        tempContainer.style.left = "-99999px";
        tempContainer.style.width = "1200px";
        tempContainer.style.visibility = "hidden";
        document.body.appendChild(tempContainer);

        const renderId = `m-${cleanId}-${Date.now()}`;
        const { svg } = await mermaid.render(
          renderId,
          chart.replaceAll("\\n", "\n"),
          tempContainer
        );

        if (document.body.contains(tempContainer)) {
          document.body.removeChild(tempContainer);
        }

        if (isMounted) {
          setRenderedSvg(svg);
        }
      } catch (error) {
        console.error("Error while rendering mermaid", error);
      }
    }

    renderChart();

    // Listen ONLY to theme changes (class / data-theme); NEVER re-render on scroll!
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class" || m.attributeName === "data-theme") {
          renderChart();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart, cleanId]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={
        renderedSvg ? { __html: renderedSvg } : undefined
      }
    />
  );
}

export default Mermaid;
