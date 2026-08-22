import { ImageResponse } from "next/og";

export const alt = "Udeh Praise C. — Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#212121", color: "#EDEDE8", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "72px", width: "100%" }}>
      <div style={{ color: "#9B9B95", display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>Full-Stack Software Engineer · Lagos</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Udeh Praise C<span style={{ color: "#DA5921" }}>.</span></div>
        <div style={{ color: "#9B9B95", display: "flex", fontSize: 34, marginTop: 20 }}>Dependable products, from interface to infrastructure.</div>
      </div>
    </div>,
    size,
  );
}
