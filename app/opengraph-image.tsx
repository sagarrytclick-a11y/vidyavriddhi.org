import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

/**
 * Social share card (1200×630), generated at build time so links to the site
 * unfurl with a proper preview instead of the wide logo mark.
 *
 * `alt`, `size` and `contentType` are the file convention's metadata exports;
 * Next wires up `og:image`, `og:image:width/height` and `og:image:alt` from
 * them, so the layout must not set `openGraph.images` itself.
 */

export const alt = `${siteConfig.name} — student lead generation for education brands`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#16375e";
const ORANGE = "#f4701f";
const MUTED = "#c7d4e3";

export default async function OpengraphImage() {
  // The wordmark ships with the site, so it is inlined straight from /public.
  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NAVY,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 104,
              borderRadius: 6,
              backgroundColor: ORANGE,
              marginRight: 32,
            }}
          />
          <div
            style={{
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: 18,
              padding: "20px 30px",
            }}
          >
            <img src={logoSrc} alt="" width={330} height={132} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              lineHeight: 1.15,
              color: "#ffffff",
              letterSpacing: -1.5,
            }}
          >
            Student lead generation for education brands
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: ORANGE,
            }}
          >
            SEO · Google Ads · Meta · Website enquiries · Partner sources
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(199, 212, 227, 0.25)",
            paddingTop: 26,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>vidyavriddhi.org</div>
          <div style={{ display: "flex" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
