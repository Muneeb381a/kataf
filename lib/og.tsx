import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Flat paper/olive card. No gradients. */
export function ogImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EFE6",
          color: "#14130F",
          padding: 72,
          borderLeft: "24px solid #2F4A2B",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase", color: "#2F4A2B" }}>{eyebrow}</div>
        <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -3, fontFamily: "Georgia, serif", maxWidth: 940 }}>
          {title}
        </div>
        <div style={{ fontSize: 40, fontFamily: "Georgia, serif" }}>Kataf</div>
      </div>
    ),
    ogSize,
  );
}
