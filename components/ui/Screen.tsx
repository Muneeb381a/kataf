import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import sharp from "sharp";

/**
 * A product screenshot. Looks for /public/screens/<src>.webp.
 * Until the file exists, renders a flat placeholder box with a mono label.
 */
export async function Screen({
  src,
  label,
  alt,
  priority = false,
  sizes = "(min-width: 1100px) 700px, 100vw",
}: {
  src: string;
  label: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const file = path.join(process.cwd(), "public", "screens", `${src}.webp`);
  if (fs.existsSync(file)) {
    const { width = 1600, height = 1000 } = await sharp(file).metadata();
    return (
      <Image
        src={`/screens/${src}.webp`}
        alt={alt ?? label}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="mx-auto block h-auto w-full"
        style={width < 700 ? { maxWidth: width } : undefined}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt ?? label}
      className="flex aspect-[16/10] w-full items-center justify-center bg-paper-2 p-6 text-center"
    >
      <span className="label text-muted">Screenshot: {label}</span>
    </div>
  );
}
