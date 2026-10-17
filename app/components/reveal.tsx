"use client";

import { useEffect, useRef } from "react";

const GROUP_VISIBLE = "is-visible";

/**
 * Wraps a block of content and adds `is-visible` once it scrolls into view,
 * which fades in every `.reveal` child inside it (see globals.css).
 *
 * Stagger the children with an inline `style={{ animationDelay: "120ms" }}`.
 *
 * The class is toggled directly on the DOM node rather than through state, so
 * scrolling never triggers a React re-render.
 */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add(GROUP_VISIBLE);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(GROUP_VISIBLE);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal-group ${className}` : "reveal-group"}
    >
      {children}
    </div>
  );
}
