import { useEffect } from "react";

/**
 * Sets `data-scrolled` on <html> once the page leaves the top, so the navbar
 * can switch from transparent to a blurred background with a bottom border.
 */
export const ScrollState = () => {
  useEffect(() => {
    const body = document.body;
    let isScrolled = false;

    const update = () => {
      const nextScrolled = window.scrollY > 0;
      if (isScrolled !== nextScrolled) {
        isScrolled = nextScrolled;
        body.toggleAttribute("data-scrolled", nextScrolled);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return null;
};
