import Image from "next/image";

export default function Logo({
  className,
  sizes = "(min-width: 1024px) 120px, 100px",
  priority = false,
}: {
  className?: string;
  /**
   * Rendered width of the mark. Without it Next assumes the image fills the
   * viewport and serves a 1080px-wide file for a ~100px logo — which also made
   * the header logo the LCP element on a much larger payload than needed.
   */
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Vidya Vriddhi — A unit of JP Technologies"
      width={500}
      height={200}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
