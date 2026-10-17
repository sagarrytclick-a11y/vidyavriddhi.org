"use client";

import { useEffect, useRef } from "react";

function format(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The server renders the final value, so the number is correct without
 * JavaScript. While animating, the text node is updated directly so each frame
 * does not trigger a React re-render.
 */
export default function CountUp({
  value,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const render = (current: number) => {
      el.textContent = `${prefix}${format(current, decimals)}${suffix}`;
    };

    const animate = () => {
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        render(value * eased);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          render(value);
        }
      };

      render(0);
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
