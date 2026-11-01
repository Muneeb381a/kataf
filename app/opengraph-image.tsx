import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kataf: software that works the way your business does";

export default function Image() {
  return ogImage("Software house · Pakistan", "Software that works the way your business does.");
}
