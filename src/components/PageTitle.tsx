import { ComponentProps } from "react";

// MDX `h1` (themeConfig.components): the title row.
export const PageTitle = (props: ComponentProps<"h1">) => {
  return (
    <div className="ink-page-title">
      <h1 {...props} />
      <div id="ink-toc-slot" className="ink-toc-slot" />
    </div>
  );
};
