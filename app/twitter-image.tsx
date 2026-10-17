/**
 * Twitter uses the same card as Open Graph — re-exported so the two can never
 * drift apart. Next reads these exports like any other `twitter-image` route.
 */
export { alt, contentType, default, size } from "./opengraph-image";
